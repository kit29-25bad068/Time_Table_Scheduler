/**
 * Emergency Faculty Substitution & Infeasibility Diagnosis Engine
 * ABC College Academic Scheduler - SIH25028 (Quantum Quirks)
 */

import { PERIOD_SLOTS } from '../data/sampleData';

/**
 * Find recommended substitute faculty for a given absence slot
 * 
 * @param {Object} params
 * @param {string} params.absentFacultyId
 * @param {string} params.day
 * @param {string} params.periodId
 * @param {string} params.subjectId
 * @param {string} params.subjectName
 * @param {Array} params.facultyList
 * @param {Array} params.timetableEntries
 * @param {Array} params.subjects
 * @returns {Object} Result containing feasible candidates or complete infeasibility diagnostic
 */
export function findSubstitutes({
  absentFacultyId,
  day,
  periodId,
  subjectId,
  subjectName,
  facultyList = [],
  timetableEntries = [],
  subjects = []
}) {
  const periodInfo = PERIOD_SLOTS.find(p => p.id === periodId);
  const absentFaculty = facultyList.find(f => f.id === absentFacultyId);
  const subjectObj = subjects.find(s => s.id === subjectId || s.name === subjectName);

  // Normalize subject keywords for competency matching
  const targetSubjectKeywords = (subjectName || subjectObj?.name || "")
    .toLowerCase()
    .split(/[\s,&]+/)
    .filter(w => w.length > 2 && !["and", "the", "for", "lab"].includes(w));

  const targetDept = subjectObj?.department || absentFaculty?.department || "";

  const evaluatedCandidates = [];
  const disqualifiedCandidates = [];

  for (const faculty of facultyList) {
    // Skip the absent faculty
    if (faculty.id === absentFacultyId) continue;

    const reasonsDisqualified = [];
    let isClashFree = true;
    let clashDetails = null;

    // 1. Check Timetable Availability for this specific day and period slot
    const existingClass = timetableEntries.find(
      e => e.day === day && e.periodId === periodId && e.facultyId === faculty.id
    );

    if (existingClass) {
      isClashFree = false;
      clashDetails = `Scheduled with "${existingClass.subjectName}" (${existingClass.batchName || existingClass.batchId}) in ${existingClass.roomName}`;
      reasonsDisqualified.push(clashDetails);
    }

    // 2. Check Workload Capacity
    const assignedHours = faculty.assignedHours || 14;
    const maxHours = faculty.maxWeeklyHours || 18;
    const isOverloaded = assignedHours >= maxHours;
    if (isOverloaded) {
      reasonsDisqualified.push(`Workload limit reached (${assignedHours}/${maxHours} hrs)`);
    }

    // 3. Evaluate Competency Score (0 - 100)
    let competencyScore = 40; // Base pedagogical foundation
    const competencyList = faculty.competencies || [];
    let matchedCompetency = null;

    // Direct department match
    if (faculty.department === targetDept) {
      competencyScore += 25;
      matchedCompetency = `${faculty.department} Core Faculty`;
    }

    // Competency string keyword match
    for (const comp of competencyList) {
      const compLower = comp.toLowerCase();
      const directMatch = targetSubjectKeywords.some(kw => compLower.includes(kw));
      if (directMatch) {
        competencyScore += 30;
        matchedCompetency = comp;
        break;
      }
    }

    // Related subject match
    const teachesRelated = subjects.some(
      s => s.facultyId === faculty.id && 
      (s.department === targetDept || s.name.toLowerCase().includes(targetSubjectKeywords[0] || ""))
    );
    if (teachesRelated) {
      competencyScore += 15;
    }

    const remainingHours = Math.max(0, maxHours - assignedHours);
    const workloadScore = Math.min(20, (remainingHours / maxHours) * 20);
    const totalMatchScore = Math.min(98, Math.round(competencyScore + workloadScore));

    const candidateResult = {
      faculty,
      isAvailable: isClashFree,
      clashDetails,
      competencyScore,
      matchedCompetency: matchedCompetency || `${faculty.department} Faculty`,
      workloadScore,
      totalScore: isClashFree ? totalMatchScore : 0,
      assignedHours,
      maxHours,
      remainingHours,
      workloadStatus: remainingHours >= 4 ? "Balanced" : remainingHours > 0 ? "Moderate" : "High",
      reasonsDisqualified,
      checks: [
        { label: "Available in Slot", passed: isClashFree, detail: isClashFree ? "Free in slot" : clashDetails },
        { label: "Subject Competency", passed: competencyScore >= 30, detail: matchedCompetency || `${faculty.department} faculty` },
        { label: "Timetable Clash-Free", passed: isClashFree, detail: isClashFree ? "0 clashes detected" : "Double-booking" },
        { label: "Workload Balanced", passed: !isOverloaded, detail: `${assignedHours}/${maxHours} hrs assigned` },
      ]
    };

    if (isClashFree && !isOverloaded) {
      evaluatedCandidates.push(candidateResult);
    } else {
      disqualifiedCandidates.push(candidateResult);
    }
  }

  // Sort feasible candidates by total score descending
  evaluatedCandidates.sort((a, b) => b.totalScore - a.totalScore);

  const isFeasible = evaluatedCandidates.length > 0;

  return {
    isFeasible,
    targetSlot: {
      day,
      periodId,
      time: periodInfo?.time || periodId,
      periodName: periodInfo?.name || periodId,
      subjectName: subjectName || "Course Lecture",
      absentFacultyName: absentFaculty?.name || "Faculty"
    },
    recommendedSubstitute: evaluatedCandidates[0] || null,
    feasibleCandidates: evaluatedCandidates,
    disqualifiedCandidates,
    infeasibilityReport: !isFeasible ? {
      title: "Infeasibility Diagnosis: No Clash-Free Substitute Available",
      summary: `All ${facultyList.length - 1} other faculty members have active lecture assignments during ${day} ${periodInfo?.time || periodId} or have reached their maximum weekly teaching quotas.`,
      suggestedAction: "Assign a guided self-study / asynchronous lab tutorial or reschedule this period using drag-and-drop.",
      disqualifiedList: disqualifiedCandidates.map(c => ({
        name: c.faculty.name,
        department: c.faculty.department,
        reason: c.reasonsDisqualified.join(" • ") || "Active Class Double-Booking"
      }))
    } : null
  };
}

/**
 * Apply substitute assignment to a timetable entry
 */
export function createSubstitutionAssignment({
  entry,
  substituteFaculty,
  reason = "Emergency Faculty Absence",
  assignedBy = "Academic Administrator"
}) {
  return {
    id: `SUB_REC_${Date.now()}`,
    originalEntryId: entry.id,
    day: entry.day,
    periodId: entry.periodId,
    subjectId: entry.subjectId,
    subjectName: entry.subjectName,
    roomId: entry.roomId,
    roomName: entry.roomName,
    batchId: entry.batchId,
    batchName: entry.batchName,
    originalFacultyId: entry.facultyId,
    originalFacultyName: entry.facultyName,
    substituteFacultyId: substituteFaculty.id,
    substituteFacultyName: substituteFaculty.name,
    substituteDepartment: substituteFaculty.department,
    reason,
    assignedBy,
    assignedAt: new Date().toISOString(),
    status: "Active"
  };
}
