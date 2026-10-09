import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INSTITUTION_INFO,
  BATCHES,
  FACULTY,
  ROOMS,
  SUBJECTS,
  INITIAL_TIMETABLE_ENTRIES,
  INITIAL_NOTIFICATIONS,
  DEMO_STUDENTS,
  DEMO_ADMIN,
  DEMO_FACULTY_USER,
} from '../data/sampleData';
import { validateSlotPlacement, auditCompleteTimetable } from '../services/conflictDetector';
import { generateBatchTimetable } from '../services/schedulerEngine';
import { createSubstitutionAssignment } from '../services/substitutionEngine';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Authentication & Active User state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState('admin'); // 'admin' | 'faculty' | 'student'
  const [currentUser, setCurrentUser] = useState(DEMO_ADMIN);

  const [activeStudent, setActiveStudent] = useState(DEMO_STUDENTS[9]); // III AI & DS A (Rahul Kumar)
  const [activeFaculty, setActiveFaculty] = useState(FACULTY[0]); // Dr. Arun Kumar

  const [faculty, setFaculty] = useState(FACULTY);
  const [rooms, setRooms] = useState(ROOMS);
  const [batches, setBatches] = useState(BATCHES);
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE_ENTRIES);
  const [substitutions, setSubstitutions] = useState([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isPublished, setIsPublished] = useState(true);
  const [publishedVersion, setPublishedVersion] = useState('v1.2');

  // Active filters for global timetable
  const [selectedDepartment, setSelectedDepartment] = useState('AI & DS');
  const [selectedSemester, setSelectedSemester] = useState('III');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedBatchId, setSelectedBatchId] = useState('B_3_AIDS_A');

  // Toast / System feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 4000) => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  // Login handler supporting all students, faculty, and administrators
  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Check Admin
    if (
      (cleanEmail === 'admin@abc.edu' || cleanEmail === 'admin@kit.edu' || cleanEmail === 'admin') &&
      cleanPass === 'admin123'
    ) {
      setIsAuthenticated(true);
      setRole('admin');
      setCurrentUser(DEMO_ADMIN);
      showToast(`Welcome back, ${DEMO_ADMIN.name} (Administrator)`, 'success');
      return { success: true, role: 'admin' };
    }

    // 2. Check Faculty members
    const matchedFaculty = faculty.find(
      (f) =>
        (f.email && f.email.toLowerCase() === cleanEmail) ||
        (cleanEmail === 'faculty@kit.edu' && f.id === 'FAC_01') ||
        (cleanEmail === 'faculty' && f.id === 'FAC_01')
    );

    if (matchedFaculty && (cleanPass === 'faculty123' || cleanPass === 'faculty')) {
      setIsAuthenticated(true);
      setRole('faculty');
      setActiveFaculty(matchedFaculty);
      setCurrentUser({
        ...matchedFaculty,
        role: 'faculty',
      });
      showToast(`Welcome, ${matchedFaculty.name} (${matchedFaculty.department})`, 'success');
      return { success: true, role: 'faculty', user: matchedFaculty };
    }

    // 3. Check Students across all 18 batches
    const matchedStudent = DEMO_STUDENTS.find(
      (s) =>
        s.email.toLowerCase() === cleanEmail ||
        (s.secondaryEmail && s.secondaryEmail.toLowerCase() === cleanEmail) ||
        s.registerNo.toLowerCase() === cleanEmail ||
        (cleanEmail === 'student' && s.id === 'STU_3_AIDS_A') ||
        (cleanEmail === 'student@kit.edu' && s.id === 'STU_3_AIDS_A')
    );

    if (matchedStudent && (cleanPass === 'student123' || cleanPass === 'student')) {
      setIsAuthenticated(true);
      setRole('student');
      setActiveStudent(matchedStudent);
      setSelectedBatchId(matchedStudent.batchId);
      setCurrentUser({
        ...matchedStudent,
        role: 'student',
      });
      showToast(`Welcome, ${matchedStudent.name} (${matchedStudent.batchName})`, 'success');
      return { success: true, role: 'student', user: matchedStudent };
    }

    return {
      success: false,
      message: 'Invalid credentials. Please use demo credentials or 1-click login.',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out.', 'info');
  };

  // Direct switch for quick role switcher
  const switchRoleDirectly = (newRole, specificUser = null) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setCurrentUser(DEMO_ADMIN);
    } else if (newRole === 'faculty') {
      const targetFac = specificUser || activeFaculty || faculty[0];
      setActiveFaculty(targetFac);
      setCurrentUser({ ...targetFac, role: 'faculty' });
    } else if (newRole === 'student') {
      const targetStu = specificUser || activeStudent || DEMO_STUDENTS[0];
      setActiveStudent(targetStu);
      setSelectedBatchId(targetStu.batchId);
      setCurrentUser({ ...targetStu, role: 'student' });
    }
  };

  // Add Notification helper
  const addNotification = (notif) => {
    const newNotif = {
      id: `N_${Date.now()}`,
      timestamp: 'Just now',
      unread: true,
      ...notif,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Move Timetable Slot with Real-Time Conflict Validation
  const moveTimetableSlot = ({
    entryId,
    targetDay,
    targetPeriodId,
    targetRoomId,
    targetFacultyId,
  }) => {
    const targetEntry = timetable.find((e) => e.id === entryId);
    if (!targetEntry) {
      return { isValid: false, reason: 'Entry not found' };
    }

    const validation = validateSlotPlacement({
      entry: targetEntry,
      targetDay,
      targetPeriodId,
      targetRoomId: targetRoomId || targetEntry.roomId,
      targetFacultyId: targetFacultyId || targetEntry.facultyId,
      allEntries: timetable,
      rooms,
      batches,
      faculty,
    });

    if (!validation.isValid) {
      return validation;
    }

    // Apply valid move
    setTimetable((prev) =>
      prev.map((e) => {
        if (e.id === entryId) {
          const roomObj = targetRoomId ? rooms.find((r) => r.id === targetRoomId) : null;
          const facObj = targetFacultyId ? faculty.find((f) => f.id === targetFacultyId) : null;
          return {
            ...e,
            day: targetDay,
            periodId: targetPeriodId,
            ...(targetRoomId && roomObj ? { roomId: roomObj.id, roomName: roomObj.name } : {}),
            ...(targetFacultyId && facObj ? { facultyId: facObj.id, facultyName: facObj.name } : {}),
          };
        }
        return e;
      })
    );

    showToast(
      `Schedule updated: ${targetEntry.subjectName} moved to ${targetDay} ${validation.targetPeriod?.time || targetPeriodId}.`,
      'success'
    );
    return { isValid: true };
  };

  // Generate Timetable for a specific batch
  const generateTimetable = async ({ batchId, onProgress }) => {
    const targetBatch = batches.find((b) => b.id === batchId);
    if (!targetBatch) {
      throw new Error(`Batch ID ${batchId} not found.`);
    }

    const result = await generateBatchTimetable({
      batch: targetBatch,
      subjects,
      faculty,
      rooms,
      existingEntries: timetable,
      onProgress,
    });

    if (result.success) {
      // Replace existing entries for this batch with generated ones
      setTimetable((prev) => {
        const withoutBatch = prev.filter((e) => e.batchId !== batchId);
        return [...withoutBatch, ...result.entries];
      });

      addNotification({
        title: `Timetable Generated: ${targetBatch.name}`,
        message: `Generated ${result.entries.length} clash-free periods with 0 hard conflicts in ${result.metrics.executionTimeMs}ms.`,
        type: 'success',
      });

      showToast(`Timetable generated successfully for ${targetBatch.name}!`, 'success');
    }

    return result;
  };

  // Emergency Faculty Substitution Assignment
  const assignFacultySubstitute = ({ entryId, substituteFaculty, reason }) => {
    const entry = timetable.find((e) => e.id === entryId);
    if (!entry) return false;

    const subAssignment = createSubstitutionAssignment({
      entry,
      substituteFaculty,
      reason: reason || 'Emergency Faculty Absence',
      assignedBy: role === 'admin' ? 'Academic Administrator' : 'Department Chair',
    });

    setSubstitutions((prev) => [subAssignment, ...prev]);

    // Update timetable entry with substitute marker
    setTimetable((prev) =>
      prev.map((e) => {
        if (e.id === entryId) {
          return {
            ...e,
            facultyId: substituteFaculty.id,
            facultyName: substituteFaculty.name,
            isSubstituted: true,
            originalFacultyName: entry.facultyName,
            substitutionReason: reason,
          };
        }
        return e;
      })
    );

    // Update faculty assigned hours
    setFaculty((prev) =>
      prev.map((f) => {
        if (f.id === substituteFaculty.id) {
          return { ...f, assignedHours: (f.assignedHours || 0) + 1 };
        }
        if (f.id === entry.facultyId) {
          return { ...f, assignedHours: Math.max(0, (f.assignedHours || 1) - 1) };
        }
        return f;
      })
    );

    addNotification({
      title: `Emergency Substitute Assigned`,
      message: `${substituteFaculty.name} assigned as substitute for ${entry.facultyName} (${entry.subjectName}, ${entry.day} ${entry.periodId}).`,
      type: 'substitution',
    });

    showToast(`Substitute ${substituteFaculty.name} assigned successfully.`, 'success');
    return true;
  };

  // Publish Timetable Action
  const publishSchedule = () => {
    setIsPublished(true);
    setPublishedVersion(`v${(parseFloat(publishedVersion.replace('v', '')) + 0.1).toFixed(1)}`);

    addNotification({
      title: `Timetable Published (${publishedVersion})`,
      message: `The updated academic timetable has been published to all faculty & students.`,
      type: 'publish',
    });

    showToast(`Timetable published successfully to all students and faculty!`, 'success');
  };

  // Data Import handlers
  const importFacultyData = (newFacultyList) => {
    setFaculty((prev) => [...prev, ...newFacultyList]);
    addNotification({
      title: `Faculty Imported`,
      message: `${newFacultyList.length} faculty records imported successfully.`,
      type: 'info',
    });
    showToast(`${newFacultyList.length} faculty records imported successfully.`, 'success');
  };

  const importRoomsData = (newRoomsList) => {
    setRooms((prev) => [...prev, ...newRoomsList]);
    addNotification({
      title: `Rooms Imported`,
      message: `${newRoomsList.length} room records imported successfully.`,
      type: 'info',
    });
    showToast(`${newRoomsList.length} room records imported successfully.`, 'success');
  };

  const importSubjectsData = (newSubjectsList) => {
    setSubjects((prev) => [...prev, ...newSubjectsList]);
    addNotification({
      title: `Subjects Imported`,
      message: `${newSubjectsList.length} subject records imported successfully.`,
      type: 'info',
    });
    showToast(`${newSubjectsList.length} subject records imported successfully.`, 'success');
  };

  const importBatchesData = (newBatchesList) => {
    setBatches((prev) => [...prev, ...newBatchesList]);
    addNotification({
      title: `Batches Imported`,
      message: `${newBatchesList.length} batch records imported successfully.`,
      type: 'info',
    });
    showToast(`${newBatchesList.length} batch records imported successfully.`, 'success');
  };

  // Reset to original demo data
  const resetToDemoData = () => {
    setFaculty(FACULTY);
    setRooms(ROOMS);
    setBatches(BATCHES);
    setSubjects(SUBJECTS);
    setTimetable(INITIAL_TIMETABLE_ENTRIES);
    setSubstitutions([]);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIsPublished(true);
    showToast('Reset to default ABC College SIH dataset.', 'info');
  };

  // Global audit stats
  const auditReport = auditCompleteTimetable(timetable, rooms, batches, faculty);

  return (
    <AppContext.Provider
      value={{
        institution: INSTITUTION_INFO,
        isAuthenticated,
        currentUser,
        login,
        logout,
        role,
        setRole: switchRoleDirectly,
        activeStudent,
        setActiveStudent,
        activeFaculty,
        setActiveFaculty,
        demoStudents: DEMO_STUDENTS,
        demoAdmin: DEMO_ADMIN,
        faculty,
        setFaculty,
        rooms,
        setRooms,
        batches,
        setBatches,
        subjects,
        setSubjects,
        timetable,
        setTimetable,
        substitutions,
        notifications,
        isPublished,
        publishedVersion,
        selectedDepartment,
        setSelectedDepartment,
        selectedSemester,
        setSelectedSemester,
        selectedSection,
        setSelectedSection,
        selectedBatchId,
        setSelectedBatchId,
        toast,
        showToast,
        moveTimetableSlot,
        generateTimetable,
        assignFacultySubstitute,
        publishSchedule,
        importFacultyData,
        importRoomsData,
        importSubjectsData,
        importBatchesData,
        resetToDemoData,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        auditReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
