/**
 * Conflict Detector & Infeasibility Analysis Engine
 * ABC College Academic Scheduler - SIH25028 (Quantum Quirks)
 * 
 * Enforces all Hard & Soft Constraints:
 * 1. Faculty Collision (No faculty double-booking)
 * 2. Room Collision (No room double-booking)
 * 3. Batch Collision (No student batch double-booking)
 * 4. Capacity Match (Room capacity >= Batch strength)
 * 5. Lab / Practical Facility Match
 * 6. Break Slot Immunity (No scheduling inside designated tea/lunch breaks)
 */

import { PERIOD_SLOTS } from '../data/sampleData';

/**
 * Validate moving or assigning an entry to a specific day & period slot
 * 
 * @param {Object} params
 * @param {Object} params.entry - The timetable entry to be placed/moved
 * @param {string} params.targetDay - Target day ('Monday', etc.)
 * @param {string} params.targetPeriodId - Target period ID ('P1', 'P2', etc.)
 * @param {string} [params.targetRoomId] - Target room ID (if changing room)
 * @param {string} [params.targetFacultyId] - Target faculty ID (if changing faculty)
 * @param {Array} params.allEntries - All active timetable entries across all batches
 * @param {Array} params.rooms - All available rooms
 * @param {Array} params.batches - All student batches
 * @param {Array} params.faculty - All faculty members
 * @returns {Object} { isValid: boolean, conflicts: Array<string>, details: Object }
 */
export function validateSlotPlacement({
  entry,
  targetDay,
  targetPeriodId,
  targetRoomId,
  targetFacultyId,
  allEntries,
  rooms = [],
  batches = [],
  faculty = [],
}) {
  const conflicts = [];
  const facultyId = targetFacultyId || entry.facultyId;
  const roomId = targetRoomId || entry.roomId;
  const batchId = entry.batchId;

  // 1. Check if target period is a Break Period
  const periodInfo = PERIOD_SLOTS.find(p => p.id === targetPeriodId);
  if (!periodInfo) {
    return {
      isValid: false,
      conflicts: [`Invalid period identifier: ${targetPeriodId}`],
      conflictType: "INVALID_PERIOD"
    };
  }

  if (periodInfo.isBreak) {
    return {
      isValid: false,
      conflicts: [`Infeasible slot: ${periodInfo.name} (${periodInfo.time}) is a designated break and cannot host instructional classes.`],
      conflictType: "BREAK_SLOT_VIOLATION"
    };
  }

  // Find relevant entity objects
  const roomObj = rooms.find(r => r.id === roomId);
  const batchObj = batches.find(b => b.id === batchId);
  const facultyObj = faculty.find(f => f.id === facultyId);

  // 2. Check Room Capacity Constraint
  if (roomObj && batchObj) {
    if (roomObj.capacity < batchObj.strength) {
      conflicts.push(
        `Room capacity conflict: ${roomObj.name} has ${roomObj.capacity} seats, but batch "${batchObj.name}" strength is ${batchObj.strength} students.`
      );
    }
  }

  // 3. Check Lab Facility Constraint
  if (entry.type === "Practical" || entry.requiresLab) {
    if (roomObj && !roomObj.isLab) {
      conflicts.push(
        `Lab requirement conflict: Practical subject "${entry.subjectName}" requires a specialized laboratory, but "${roomObj.name}" is a regular classroom.`
      );
    }
    if (entry.labType && roomObj && roomObj.type !== entry.labType && roomObj.isLab) {
      // Warning if lab type doesn't match specific type e.g. VLSI Lab vs Computer Lab
      if (entry.labType.toLowerCase().includes("ai/ml") && !roomObj.type.toLowerCase().includes("ai/ml")) {
        conflicts.push(
          `Lab suitability conflict: "${entry.subjectName}" requires an ${entry.labType}, but "${roomObj.name}" is a ${roomObj.type}.`
        );
      }
    }
  }

  // 4. Check Collisions with other entries in that target slot
  // Filter out the entry itself (when moving)
  const concurrentEntries = allEntries.filter(
    e => e.id !== entry.id && e.day === targetDay && e.periodId === targetPeriodId
  );

  for (const existing of concurrentEntries) {
    // 4a. Faculty Clash
    if (existing.facultyId === facultyId) {
      const facName = facultyObj ? facultyObj.name : "Faculty";
      conflicts.push(
        `Faculty clash: ${facName} is already scheduled to teach "${existing.subjectName}" for batch "${existing.batchName || existing.batchId}" on ${targetDay} at ${periodInfo.time}.`
      );
    }

    // 4b. Room Clash
    if (existing.roomId === roomId) {
      const rName = roomObj ? roomObj.name : "Room";
      conflicts.push(
        `Room clash: ${rName} is already occupied by "${existing.subjectName}" (Batch: ${existing.batchName || existing.batchId}) on ${targetDay} at ${periodInfo.time}.`
      );
    }

    // 4c. Batch Clash
    if (existing.batchId === batchId) {
      const bName = batchObj ? batchObj.name : "Batch";
      conflicts.push(
        `Batch collision: Batch "${bName}" already has "${existing.subjectName}" scheduled on ${targetDay} at ${periodInfo.time}.`
      );
    }
  }

  return {
    isValid: conflicts.length === 0,
    conflicts,
    primaryReason: conflicts[0] || null,
    conflictType: conflicts.length > 0 ? getConflictType(conflicts[0]) : "NONE",
    targetPeriod: periodInfo,
  };
}

/**
 * Scan entire timetable for any existing clashes across all batches
 */
export function auditCompleteTimetable(allEntries = [], rooms = [], batches = [], faculty = []) {
  const issues = [];
  const slotMap = new Map();

  for (const entry of allEntries) {
    const key = `${entry.day}_${entry.periodId}`;
    if (!slotMap.has(key)) {
      slotMap.set(key, []);
    }
    slotMap.get(key).push(entry);

    // Check capacity
    const room = rooms.find(r => r.id === entry.roomId);
    const batch = batches.find(b => b.id === entry.batchId);
    if (room && batch && room.capacity < batch.strength) {
      issues.push({
        id: `CAP_${entry.id}`,
        type: "CAPACITY_MISMATCH",
        severity: "warning",
        title: "Room Capacity Mismatch",
        message: `${room.name} (${room.capacity} seats) is insufficient for ${batch.name} (${batch.strength} students) during ${entry.subjectName}.`,
        entryId: entry.id,
        day: entry.day,
        periodId: entry.periodId
      });
    }
  }

  // Detect concurrent clashes
  slotMap.forEach((entriesInSlot, slotKey) => {
    const [day, periodId] = slotKey.split("_");
    const period = PERIOD_SLOTS.find(p => p.id === periodId);

    // Faculty duplicates
    const facultySeen = new Map();
    for (const ent of entriesInSlot) {
      if (facultySeen.has(ent.facultyId)) {
        const other = facultySeen.get(ent.facultyId);
        issues.push({
          id: `FAC_${ent.id}_${other.id}`,
          type: "FACULTY_CLASH",
          severity: "error",
          title: "Faculty Double Booking",
          message: `${ent.facultyName} is assigned to both "${ent.subjectName}" and "${other.subjectName}" on ${day} (${period?.time}).`,
          entryId: ent.id,
          day,
          periodId
        });
      } else {
        facultySeen.set(ent.facultyId, ent);
      }
    }

    // Room duplicates
    const roomSeen = new Map();
    for (const ent of entriesInSlot) {
      if (roomSeen.has(ent.roomId)) {
        const other = roomSeen.get(ent.roomId);
        issues.push({
          id: `ROOM_${ent.id}_${other.id}`,
          type: "ROOM_CLASH",
          severity: "error",
          title: "Room Collision",
          message: `${ent.roomName} is double-booked by "${ent.subjectName}" and "${other.subjectName}" on ${day} (${period?.time}).`,
          entryId: ent.id,
          day,
          periodId
        });
      } else {
        roomSeen.set(ent.roomId, ent);
      }
    }
  });

  return {
    totalIssues: issues.length,
    clashCount: issues.filter(i => i.severity === "error").length,
    warningCount: issues.filter(i => i.severity === "warning").length,
    issues
  };
}

function getConflictType(reason = "") {
  if (reason.includes("Faculty clash") || reason.includes("faculty")) return "FACULTY_CLASH";
  if (reason.includes("Room clash") || reason.includes("room")) return "ROOM_CLASH";
  if (reason.includes("Room capacity") || reason.includes("seats")) return "CAPACITY_CONFLICT";
  if (reason.includes("Lab requirement") || reason.includes("laboratory")) return "LAB_VIOLATION";
  if (reason.includes("Batch collision")) return "BATCH_CLASH";
  if (reason.includes("break")) return "BREAK_SLOT_VIOLATION";
  return "GENERAL_CONFLICT";
}
