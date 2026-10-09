/**
 * ABC College of Engineering & Technology - Academic Scheduling System Data
 * Smart India Hackathon 2026 - Problem Statement: SIH25028
 * Team: Quantum Quirks (KITSIH26-S066)
 */

export const INSTITUTION_INFO = {
  name: "ABC College of Engineering & Technology",
  code: "ABC-ENG-2026",
  academicYear: "2026–27",
  defaultDepartment: "AI & DS",
  defaultSemester: "III",
  defaultSection: "A",
  teamName: "Quantum Quirks",
  teamId: "KITSIH26-S066",
  problemId: "SIH25028",
  theme: "Smart Education",
};

export const PERIOD_SLOTS = [
  { id: "P1", name: "Period 1", time: "08:40 – 09:30", startTime: "08:40", endTime: "09:30", isBreak: false },
  { id: "P2", name: "Period 2", time: "09:30 – 10:20", startTime: "09:30", endTime: "10:20", isBreak: false },
  { id: "BREAK_1", name: "Morning Break", time: "10:20 – 10:35", startTime: "10:20", endTime: "10:35", isBreak: true, duration: "15 min" },
  { id: "P3", name: "Period 3", time: "10:35 – 11:25", startTime: "10:35", endTime: "11:25", isBreak: false },
  { id: "P4", name: "Period 4", time: "11:25 – 12:15", startTime: "11:25", endTime: "12:15", isBreak: false },
  { id: "LUNCH", name: "Lunch Break", time: "12:15 – 12:55", startTime: "12:15", endTime: "12:55", isBreak: true, duration: "40 min" },
  { id: "P5", name: "Period 5", time: "12:55 – 01:45", startTime: "12:55", endTime: "13:45", isBreak: false },
  { id: "P6", name: "Period 6", time: "01:45 – 02:35", startTime: "13:45", endTime: "14:35", isBreak: false },
  { id: "BREAK_2", name: "Afternoon Break", time: "02:35 – 02:50", startTime: "14:35", endTime: "14:50", isBreak: true, duration: "15 min" },
  { id: "P7", name: "Period 7", time: "02:50 – 03:40", startTime: "14:50", endTime: "15:40", isBreak: false },
  { id: "P8", name: "Period 8", time: "03:40 – 04:25", startTime: "15:40", endTime: "16:25", isBreak: false },
];

export const TEACHING_PERIODS = PERIOD_SLOTS.filter(p => !p.isBreak);

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const PERIOD_ORDER = {
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
  P5: 5,
  P6: 6,
  P7: 7,
  P8: 8
};

export const DAY_ORDER = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5
};

export const DEPARTMENTS = [
  { id: "AIDS", code: "AI & DS", name: "Artificial Intelligence & Data Science" },
  { id: "AIML", code: "AI & ML", name: "Artificial Intelligence & Machine Learning" },
  { id: "CSE", code: "CSE", name: "Computer Science & Engineering" },
  { id: "CSBS", code: "CSBS", name: "Computer Science & Business Systems" },
  { id: "VLSI", code: "VLSI", name: "VLSI Design & Technology" },
  { id: "BME", code: "BME", name: "Biomedical Engineering" },
];

export const BATCHES = [
  // 2nd Year (Semester III)
  { id: "B_2_AIDS_A", name: "II AI & DS A", year: 2, semester: "III", section: "A", department: "AI & DS", strength: 58, preferredRoom: "R201", roomName: "Room 201" },
  { id: "B_2_AIDS_B", name: "II AI & DS B", year: 2, semester: "III", section: "B", department: "AI & DS", strength: 54, preferredRoom: "R202", roomName: "Room 202" },
  { id: "B_2_AIML_A", name: "II AI & ML A", year: 2, semester: "III", section: "A", department: "AI & ML", strength: 60, preferredRoom: "R101", roomName: "Room 101" },
  { id: "B_2_AIML_B", name: "II AI & ML B", year: 2, semester: "III", section: "B", department: "AI & ML", strength: 56, preferredRoom: "R102", roomName: "Room 102" },
  { id: "B_2_CSE_A", name: "II CSE A", year: 2, semester: "III", section: "A", department: "CSE", strength: 64, preferredRoom: "R203", roomName: "Room 203" },
  { id: "B_2_CSE_B", name: "II CSE B", year: 2, semester: "III", section: "B", department: "CSE", strength: 62, preferredRoom: "R204", roomName: "Room 204" },
  { id: "B_2_CSBS_A", name: "II CSBS", year: 2, semester: "III", section: "A", department: "CSBS", strength: 52, preferredRoom: "R303", roomName: "Room 303" },
  { id: "B_2_VLSI_A", name: "II VLSI", year: 2, semester: "III", section: "A", department: "VLSI", strength: 45, preferredRoom: "R301", roomName: "Room 301" },
  { id: "B_2_BME_A", name: "II BME", year: 2, semester: "III", section: "A", department: "BME", strength: 48, preferredRoom: "R302", roomName: "Room 302" },

  // 3rd Year (Semester V)
  { id: "B_3_AIDS_A", name: "III AI & DS A", year: 3, semester: "V", section: "A", department: "AI & DS", strength: 58, preferredRoom: "R201", roomName: "Room 201" },
  { id: "B_3_AIDS_B", name: "III AI & DS B", year: 3, semester: "V", section: "B", department: "AI & DS", strength: 54, preferredRoom: "R202", roomName: "Room 202" },
  { id: "B_3_AIML_A", name: "III AI & ML A", year: 3, semester: "V", section: "A", department: "AI & ML", strength: 58, preferredRoom: "R103", roomName: "Room 103" },
  { id: "B_3_AIML_B", name: "III AI & ML B", year: 3, semester: "V", section: "B", department: "AI & ML", strength: 55, preferredRoom: "R104", roomName: "Room 104" },
  { id: "B_3_CSE_A", name: "III CSE A", year: 3, semester: "V", section: "A", department: "CSE", strength: 65, preferredRoom: "R401", roomName: "Room 401" },
  { id: "B_3_CSE_B", name: "III CSE B", year: 3, semester: "V", section: "B", department: "CSE", strength: 62, preferredRoom: "R402", roomName: "Room 402" },
  { id: "B_3_CSBS_A", name: "III CSBS", year: 3, semester: "V", section: "A", department: "CSBS", strength: 50, preferredRoom: "R403", roomName: "Room 403" },
  { id: "B_3_VLSI_A", name: "III VLSI", year: 3, semester: "V", section: "A", department: "VLSI", strength: 42, preferredRoom: "R301", roomName: "Room 301" },
  { id: "B_3_BME_A", name: "III BME", year: 3, semester: "V", section: "A", department: "BME", strength: 46, preferredRoom: "R302", roomName: "Room 302" },
];

export const FACULTY = [
  {
    id: "FAC_01",
    name: "Dr. Arun Kumar",
    designation: "Professor & Head",
    department: "AI & DS",
    email: "arun.kumar@abc.edu",
    phone: "+91 98401 23456",
    competencies: ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Analytics"],
    maxWeeklyHours: 18,
    assignedHours: 16,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_02",
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    department: "AI & DS",
    email: "priya.sharma@abc.edu",
    phone: "+91 98402 34567",
    competencies: ["Database Management Systems", "Python Programming", "SQL", "Big Data"],
    maxWeeklyHours: 18,
    assignedHours: 16,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_03",
    name: "Prof. Karthik Raj",
    designation: "Assistant Professor",
    department: "AI & DS",
    email: "karthik.raj@abc.edu",
    phone: "+91 98403 45678",
    competencies: ["Data Structures", "Algorithms", "C++ Programming", "Competitive Coding"],
    maxWeeklyHours: 20,
    assignedHours: 18,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_04",
    name: "Dr. Meena Krishnan",
    designation: "Associate Professor",
    department: "Mathematics",
    email: "meena.krishnan@abc.edu",
    phone: "+91 98404 56789",
    competencies: ["Probability & Statistics", "Linear Algebra", "Discrete Mathematics"],
    maxWeeklyHours: 16,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_05",
    name: "Prof. Suresh Babu",
    designation: "Assistant Professor",
    department: "CSE",
    email: "suresh.babu@abc.edu",
    phone: "+91 98405 67890",
    competencies: ["Computer Networks", "Operating Systems", "Cyber Security"],
    maxWeeklyHours: 18,
    assignedHours: 15,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_06",
    name: "Dr. Divya Raman",
    designation: "Associate Professor",
    department: "AI & ML",
    email: "divya.raman@abc.edu",
    phone: "+91 98406 78901",
    competencies: ["Deep Learning", "Artificial Intelligence", "Machine Learning", "Computer Vision"],
    maxWeeklyHours: 16,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_07",
    name: "Prof. Naveen Kumar",
    designation: "Assistant Professor",
    department: "AI & DS",
    email: "naveen.kumar@abc.edu",
    phone: "+91 98407 89012",
    competencies: ["Python Programming", "Data Science", "Web Development"],
    maxWeeklyHours: 18,
    assignedHours: 15,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_08",
    name: "Dr. Anitha Raj",
    designation: "Assistant Professor",
    department: "AI & DS",
    email: "anitha.raj@abc.edu",
    phone: "+91 98408 90123",
    competencies: ["Data Science", "Statistics", "Machine Learning Lab", "R Programming"],
    maxWeeklyHours: 16,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_09",
    name: "Dr. Rajesh Khanna",
    designation: "Professor",
    department: "CSE",
    email: "rajesh.khanna@abc.edu",
    phone: "+91 98409 01234",
    competencies: ["Cloud Computing", "Distributed Systems", "Software Engineering"],
    maxWeeklyHours: 18,
    assignedHours: 15,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_10",
    name: "Prof. Kavitha Sundaram",
    designation: "Assistant Professor",
    department: "CSE",
    email: "kavitha.sundaram@abc.edu",
    phone: "+91 98410 12345",
    competencies: ["Compiler Design", "Theory of Computation", "Object Oriented Programming Java"],
    maxWeeklyHours: 18,
    assignedHours: 15,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_11",
    name: "Dr. Balaji Venkatesh",
    designation: "Associate Professor",
    department: "CSBS",
    email: "balaji.v@abc.edu",
    phone: "+91 98411 23456",
    competencies: ["Business Analytics", "Financial Systems", "Enterprise Architecture"],
    maxWeeklyHours: 16,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_12",
    name: "Dr. Swaminathan S",
    designation: "Professor",
    department: "VLSI",
    email: "swaminathan.s@abc.edu",
    phone: "+91 98412 34567",
    competencies: ["Digital System Design", "CMOS VLSI", "FPGA Architecture"],
    maxWeeklyHours: 18,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_13",
    name: "Prof. Deepa N",
    designation: "Assistant Professor",
    department: "VLSI",
    email: "deepa.n@abc.edu",
    phone: "+91 98413 45678",
    competencies: ["Verilog HDL", "Embedded Systems", "Analog IC Design"],
    maxWeeklyHours: 16,
    assignedHours: 13,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_14",
    name: "Dr. Gayathri R",
    designation: "Associate Professor",
    department: "BME",
    email: "gayathri.r@abc.edu",
    phone: "+91 98414 56789",
    competencies: ["Biomedical Instrumentation", "Bio-Signals", "Biomechanics"],
    maxWeeklyHours: 18,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_15",
    name: "Prof. Vignesh M",
    designation: "Assistant Professor",
    department: "BME",
    email: "vignesh.m@abc.edu",
    phone: "+91 98415 67890",
    competencies: ["Medical Imaging", "Biomaterials", "Biosensors"],
    maxWeeklyHours: 16,
    assignedHours: 13,
    availability: "Monday-Friday",
    status: "Active",
  },
  {
    id: "FAC_16",
    name: "Prof. Harish Chandran",
    designation: "Assistant Professor",
    department: "Mathematics",
    email: "harish.c@abc.edu",
    phone: "+91 98416 78901",
    competencies: ["Linear Algebra", "Calculus & Differential Equations", "Optimization"],
    maxWeeklyHours: 18,
    assignedHours: 14,
    availability: "Monday-Friday",
    status: "Active",
  }
];

export const ROOMS = [
  // Classrooms
  { id: "R101", name: "Room 101", type: "Classroom", capacity: 60, building: "Academic Block A", floor: "1st Floor", isLab: false, utilization: 78 },
  { id: "R102", name: "Room 102", type: "Classroom", capacity: 60, building: "Academic Block A", floor: "1st Floor", isLab: false, utilization: 61 },
  { id: "R103", name: "Room 103", type: "Classroom", capacity: 65, building: "Academic Block A", floor: "1st Floor", isLab: false, utilization: 72 },
  { id: "R104", name: "Room 104", type: "Classroom", capacity: 65, building: "Academic Block A", floor: "1st Floor", isLab: false, utilization: 68 },
  { id: "R201", name: "Room 201", type: "Classroom", capacity: 80, building: "Academic Block A", floor: "2nd Floor", isLab: false, utilization: 84 },
  { id: "R202", name: "Room 202", type: "Classroom", capacity: 60, building: "Academic Block A", floor: "2nd Floor", isLab: false, utilization: 55 },
  { id: "R203", name: "Room 203", type: "Classroom", capacity: 70, building: "Academic Block A", floor: "2nd Floor", isLab: false, utilization: 75 },
  { id: "R204", name: "Room 204", type: "Classroom", capacity: 70, building: "Academic Block A", floor: "2nd Floor", isLab: false, utilization: 70 },
  { id: "R301", name: "Room 301", type: "Classroom", capacity: 55, building: "Academic Block B", floor: "3rd Floor", isLab: false, utilization: 58 },
  { id: "R302", name: "Room 302", type: "Classroom", capacity: 55, building: "Academic Block B", floor: "3rd Floor", isLab: false, utilization: 62 },
  { id: "R303", name: "Room 303", type: "Classroom", capacity: 60, building: "Academic Block B", floor: "3rd Floor", isLab: false, utilization: 70 },
  { id: "R401", name: "Room 401", type: "Classroom", capacity: 70, building: "Academic Block B", floor: "4th Floor", isLab: false, utilization: 80 },
  { id: "R402", name: "Room 402", type: "Classroom", capacity: 70, building: "Academic Block B", floor: "4th Floor", isLab: false, utilization: 76 },
  { id: "R403", name: "Room 403", type: "Classroom", capacity: 60, building: "Academic Block B", floor: "4th Floor", isLab: false, utilization: 64 },

  // Specialized Labs
  { id: "LAB_01", name: "Lab 1 (Computer Lab)", type: "Computer Lab", capacity: 40, building: "Innovation Center", floor: "Ground Floor", isLab: true, utilization: 92 },
  { id: "LAB_02", name: "Lab 2 (Computer Lab)", type: "Computer Lab", capacity: 40, building: "Innovation Center", floor: "Ground Floor", isLab: true, utilization: 68 },
  { id: "LAB_03", name: "Lab 3 (AI/ML Lab)", type: "AI/ML Lab", capacity: 35, building: "Innovation Center", floor: "1st Floor", isLab: true, utilization: 88 },
  { id: "LAB_04", name: "Lab 4 (Data Science Lab)", type: "Computer Lab", capacity: 40, building: "Innovation Center", floor: "1st Floor", isLab: true, utilization: 82 },
  { id: "LAB_05", name: "Lab 5 (VLSI Design Lab)", type: "VLSI Lab", capacity: 35, building: "Core Engineering Wing", floor: "2nd Floor", isLab: true, utilization: 74 },
  { id: "LAB_06", name: "Lab 6 (Biomedical Systems Lab)", type: "Biomedical Lab", capacity: 35, building: "Biomedical Wing", floor: "1st Floor", isLab: true, utilization: 71 },
];

export const SUBJECTS = [
  // AI & DS / AI & ML
  { id: "SUB_01", code: "23AI301", name: "Data Structures", department: "AI & DS", type: "Theory", weeklyHours: 4, facultyId: "FAC_03", facultyName: "Prof. Karthik Raj", requiresLab: false, color: "blue", semester: "III" },
  { id: "SUB_02", code: "23AI302", name: "Database Management Systems", department: "AI & DS", type: "Theory", weeklyHours: 4, facultyId: "FAC_02", facultyName: "Dr. Priya Sharma", requiresLab: false, color: "indigo", semester: "III" },
  { id: "SUB_03", code: "23AI303", name: "Machine Learning", department: "AI & DS", type: "Theory", weeklyHours: 4, facultyId: "FAC_01", facultyName: "Dr. Arun Kumar", requiresLab: false, color: "purple", semester: "V" },
  { id: "SUB_04", code: "23AI304", name: "Artificial Intelligence", department: "AI & ML", type: "Theory", weeklyHours: 3, facultyId: "FAC_06", facultyName: "Dr. Divya Raman", requiresLab: false, color: "sky", semester: "V" },
  { id: "SUB_05", code: "23AI305", name: "Python Programming", department: "AI & DS", type: "Theory", weeklyHours: 4, facultyId: "FAC_07", facultyName: "Prof. Naveen Kumar", requiresLab: false, color: "teal", semester: "III" },
  { id: "SUB_06", code: "23MA301", name: "Probability & Statistics", department: "Mathematics", type: "Theory", weeklyHours: 3, facultyId: "FAC_04", facultyName: "Dr. Meena Krishnan", requiresLab: false, color: "amber", semester: "III" },
  { id: "SUB_07", code: "23CS301", name: "Computer Networks", department: "CSE", type: "Theory", weeklyHours: 3, facultyId: "FAC_05", facultyName: "Prof. Suresh Babu", requiresLab: false, color: "emerald", semester: "V" },
  { id: "SUB_08", code: "23AI306", name: "Data Science Lab", department: "AI & DS", type: "Practical", weeklyHours: 3, facultyId: "FAC_08", facultyName: "Dr. Anitha Raj", requiresLab: true, labType: "Computer Lab", color: "rose", semester: "III" },
  { id: "SUB_09", code: "23AI307", name: "Python Programming Lab", department: "AI & DS", type: "Practical", weeklyHours: 3, facultyId: "FAC_07", facultyName: "Prof. Naveen Kumar", requiresLab: true, labType: "Computer Lab", color: "cyan", semester: "III" },
  { id: "SUB_10", code: "23AI308", name: "Machine Learning Lab", department: "AI & DS", type: "Practical", weeklyHours: 3, facultyId: "FAC_01", facultyName: "Dr. Arun Kumar", requiresLab: true, labType: "AI/ML Lab", color: "violet", semester: "V" },

  // AI & ML Specific
  { id: "SUB_11", code: "23AM301", name: "Deep Learning", department: "AI & ML", type: "Theory", weeklyHours: 4, facultyId: "FAC_06", facultyName: "Dr. Divya Raman", requiresLab: false, color: "purple", semester: "V" },
  { id: "SUB_12", code: "23AM302", name: "Natural Language Processing", department: "AI & ML", type: "Theory", weeklyHours: 4, facultyId: "FAC_02", facultyName: "Dr. Priya Sharma", requiresLab: false, color: "blue", semester: "V" },
  { id: "SUB_13", code: "23AM303", name: "Deep Learning Lab", department: "AI & ML", type: "Practical", weeklyHours: 3, facultyId: "FAC_06", facultyName: "Dr. Divya Raman", requiresLab: true, labType: "AI/ML Lab", color: "violet", semester: "V" },

  // CSE Specific
  { id: "SUB_14", code: "23CS302", name: "Operating Systems", department: "CSE", type: "Theory", weeklyHours: 4, facultyId: "FAC_05", facultyName: "Prof. Suresh Babu", requiresLab: false, color: "emerald", semester: "III" },
  { id: "SUB_15", code: "23CS303", name: "Object Oriented Java", department: "CSE", type: "Theory", weeklyHours: 4, facultyId: "FAC_10", facultyName: "Prof. Kavitha Sundaram", requiresLab: false, color: "sky", semester: "III" },
  { id: "SUB_16", code: "23CS304", name: "Software Engineering", department: "CSE", type: "Theory", weeklyHours: 3, facultyId: "FAC_09", facultyName: "Dr. Rajesh Khanna", requiresLab: false, color: "indigo", semester: "V" },
  { id: "SUB_17", code: "23CS305", name: "Java Programming Lab", department: "CSE", type: "Practical", weeklyHours: 3, facultyId: "FAC_10", facultyName: "Prof. Kavitha Sundaram", requiresLab: true, labType: "Computer Lab", color: "cyan", semester: "III" },
  { id: "SUB_18", code: "23CS306", name: "Networks & OS Lab", department: "CSE", type: "Practical", weeklyHours: 3, facultyId: "FAC_05", facultyName: "Prof. Suresh Babu", requiresLab: true, labType: "Computer Lab", color: "rose", semester: "V" },

  // CSBS Specific
  { id: "SUB_19", code: "23CB301", name: "Business Analytics", department: "CSBS", type: "Theory", weeklyHours: 4, facultyId: "FAC_11", facultyName: "Dr. Balaji Venkatesh", requiresLab: false, color: "amber", semester: "III" },
  { id: "SUB_20", code: "23CB302", name: "Financial Systems", department: "CSBS", type: "Theory", weeklyHours: 4, facultyId: "FAC_11", facultyName: "Dr. Balaji Venkatesh", requiresLab: false, color: "teal", semester: "V" },
  { id: "SUB_21", code: "23CB303", name: "Business Analytics Lab", department: "CSBS", type: "Practical", weeklyHours: 3, facultyId: "FAC_11", facultyName: "Dr. Balaji Venkatesh", requiresLab: true, labType: "Computer Lab", color: "rose", semester: "III" },

  // VLSI Specific
  { id: "SUB_22", code: "23VL301", name: "Digital System Design", department: "VLSI", type: "Theory", weeklyHours: 4, facultyId: "FAC_12", facultyName: "Dr. Swaminathan S", requiresLab: false, color: "purple", semester: "III" },
  { id: "SUB_23", code: "23VL302", name: "Verilog HDL & CMOS", department: "VLSI", type: "Theory", weeklyHours: 4, facultyId: "FAC_13", facultyName: "Prof. Deepa N", requiresLab: false, color: "indigo", semester: "V" },
  { id: "SUB_24", code: "23VL303", name: "VLSI Design Lab", department: "VLSI", type: "Practical", weeklyHours: 3, facultyId: "FAC_12", facultyName: "Dr. Swaminathan S", requiresLab: true, labType: "VLSI Lab", color: "violet", semester: "III" },

  // BME Specific
  { id: "SUB_25", code: "23BM301", name: "Biomedical Instrumentation", department: "BME", type: "Theory", weeklyHours: 4, facultyId: "FAC_14", facultyName: "Dr. Gayathri R", requiresLab: false, color: "rose", semester: "III" },
  { id: "SUB_26", code: "23BM302", name: "Medical Imaging Systems", department: "BME", type: "Theory", weeklyHours: 4, facultyId: "FAC_15", facultyName: "Prof. Vignesh M", requiresLab: false, color: "emerald", semester: "V" },
  { id: "SUB_27", code: "23BM303", name: "Biomedical Systems Lab", department: "BME", type: "Practical", weeklyHours: 3, facultyId: "FAC_14", facultyName: "Dr. Gayathri R", requiresLab: true, labType: "Biomedical Lab", color: "rose", semester: "III" },
];

/**
 * Deterministic Zero-Clash Multi-Batch CSP Generator
 * Ensures that EVERY professor has at most 1 class per time slot across the entire college.
 */
export function generateComprehensiveInitialTimetable() {
  const entries = [];
  const facultyBusy = new Set();
  const roomBusy = new Set();
  const batchBusy = new Set();

  const canAssign = (day, pId, facId, roomId, batchId) => {
    return !facultyBusy.has(`${day}_${pId}_${facId}`) &&
           !roomBusy.has(`${day}_${pId}_${roomId}`) &&
           !batchBusy.has(`${day}_${pId}_${batchId}`);
  };

  const recordAssign = (day, pId, facId, roomId, batchId) => {
    facultyBusy.add(`${day}_${pId}_${facId}`);
    roomBusy.add(`${day}_${pId}_${roomId}`);
    batchBusy.add(`${day}_${pId}_${batchId}`);
  };

  // Curriculums for all 18 cohorts
  const batchCurriculums = {
    "B_2_AIDS_A": [
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Database Management Systems", subId: "SUB_02", fac: "Dr. Priya Sharma", facId: "FAC_02", type: "Theory" },
      { sub: "Python Programming", subId: "SUB_05", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Theory" },
      { sub: "Probability & Statistics", subId: "SUB_06", fac: "Dr. Meena Krishnan", facId: "FAC_04", type: "Theory" },
      { sub: "Data Science Lab", subId: "SUB_08", fac: "Dr. Anitha Raj", facId: "FAC_08", type: "Practical", lab: "LAB_04", labName: "Lab 4 (Data Science Lab)" },
    ],
    "B_2_AIDS_B": [
      { sub: "Database Management Systems", subId: "SUB_02", fac: "Dr. Priya Sharma", facId: "FAC_02", type: "Theory" },
      { sub: "Python Programming", subId: "SUB_05", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Probability & Statistics", subId: "SUB_06", fac: "Dr. Meena Krishnan", facId: "FAC_04", type: "Theory" },
      { sub: "Python Programming Lab", subId: "SUB_09", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Practical", lab: "LAB_02", labName: "Lab 2 (Computer Lab)" },
    ],
    "B_2_AIML_A": [
      { sub: "Python Programming", subId: "SUB_05", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Theory" },
      { sub: "Artificial Intelligence", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Linear Algebra & Calculus", subId: "SUB_06", fac: "Prof. Harish Chandran", facId: "FAC_16", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Python Programming Lab", subId: "SUB_09", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Practical", lab: "LAB_02", labName: "Lab 2 (Computer Lab)" },
    ],
    "B_2_AIML_B": [
      { sub: "Artificial Intelligence", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Linear Algebra & Calculus", subId: "SUB_06", fac: "Prof. Harish Chandran", facId: "FAC_16", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Python Programming", subId: "SUB_05", fac: "Prof. Naveen Kumar", facId: "FAC_07", type: "Theory" },
      { sub: "Data Science Lab", subId: "SUB_08", fac: "Dr. Anitha Raj", facId: "FAC_08", type: "Practical", lab: "LAB_04", labName: "Lab 4 (Data Science Lab)" },
    ],
    "B_2_CSE_A": [
      { sub: "Operating Systems", subId: "SUB_14", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Object Oriented Java", subId: "SUB_15", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Probability & Statistics", subId: "SUB_06", fac: "Dr. Meena Krishnan", facId: "FAC_04", type: "Theory" },
      { sub: "Java Programming Lab", subId: "SUB_17", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Practical", lab: "LAB_01", labName: "Lab 1 (Computer Lab)" },
    ],
    "B_2_CSE_B": [
      { sub: "Object Oriented Java", subId: "SUB_15", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Theory" },
      { sub: "Operating Systems", subId: "SUB_14", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Probability & Statistics", subId: "SUB_06", fac: "Dr. Meena Krishnan", facId: "FAC_04", type: "Theory" },
      { sub: "Java Programming Lab", subId: "SUB_17", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Practical", lab: "LAB_01", labName: "Lab 1 (Computer Lab)" },
    ],
    "B_2_CSBS_A": [
      { sub: "Business Analytics", subId: "SUB_19", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Theory" },
      { sub: "Database Management Systems", subId: "SUB_02", fac: "Dr. Priya Sharma", facId: "FAC_02", type: "Theory" },
      { sub: "Data Structures", subId: "SUB_01", fac: "Prof. Karthik Raj", facId: "FAC_03", type: "Theory" },
      { sub: "Linear Algebra & Optimization", subId: "SUB_06", fac: "Prof. Harish Chandran", facId: "FAC_16", type: "Theory" },
      { sub: "Business Analytics Lab", subId: "SUB_21", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Practical", lab: "LAB_04", labName: "Lab 4 (Data Science Lab)" },
    ],
    "B_2_VLSI_A": [
      { sub: "Digital System Design", subId: "SUB_22", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Theory" },
      { sub: "Verilog HDL & CMOS", subId: "SUB_23", fac: "Prof. Deepa N", facId: "FAC_13", type: "Theory" },
      { sub: "Linear Algebra", subId: "SUB_06", fac: "Prof. Harish Chandran", facId: "FAC_16", type: "Theory" },
      { sub: "Digital Circuits", subId: "SUB_22", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Theory" },
      { sub: "VLSI Design Lab", subId: "SUB_24", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Practical", lab: "LAB_05", labName: "Lab 5 (VLSI Design Lab)" },
    ],
    "B_2_BME_A": [
      { sub: "Biomedical Instrumentation", subId: "SUB_25", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Theory" },
      { sub: "Medical Imaging Systems", subId: "SUB_26", fac: "Prof. Vignesh M", facId: "FAC_15", type: "Theory" },
      { sub: "Probability & Biostatistics", subId: "SUB_06", fac: "Dr. Meena Krishnan", facId: "FAC_04", type: "Theory" },
      { sub: "Biosensors & Transducers", subId: "SUB_25", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Theory" },
      { sub: "Biomedical Systems Lab", subId: "SUB_27", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Practical", lab: "LAB_06", labName: "Lab 6 (Biomedical Systems Lab)" },
    ],

    // 3rd Year (Sem V)
    "B_3_AIDS_A": [
      { sub: "Machine Learning", subId: "SUB_03", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Theory" },
      { sub: "Artificial Intelligence", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Computer Networks", subId: "SUB_07", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Deep Learning", subId: "SUB_11", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Machine Learning Lab", subId: "SUB_10", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Practical", lab: "LAB_03", labName: "Lab 3 (AI/ML Lab)" },
    ],
    "B_3_AIDS_B": [
      { sub: "Artificial Intelligence", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Machine Learning", subId: "SUB_03", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Theory" },
      { sub: "Deep Learning", subId: "SUB_11", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Computer Networks", subId: "SUB_07", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Data Science Lab", subId: "SUB_08", fac: "Dr. Anitha Raj", facId: "FAC_08", type: "Practical", lab: "LAB_04", labName: "Lab 4 (Data Science Lab)" },
    ],
    "B_3_AIML_A": [
      { sub: "Deep Learning", subId: "SUB_11", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Natural Language Processing", subId: "SUB_12", fac: "Dr. Priya Sharma", facId: "FAC_02", type: "Theory" },
      { sub: "Machine Learning", subId: "SUB_03", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Theory" },
      { sub: "Computer Vision", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Deep Learning Lab", subId: "SUB_13", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Practical", lab: "LAB_03", labName: "Lab 3 (AI/ML Lab)" },
    ],
    "B_3_AIML_B": [
      { sub: "Natural Language Processing", subId: "SUB_12", fac: "Dr. Priya Sharma", facId: "FAC_02", type: "Theory" },
      { sub: "Deep Learning", subId: "SUB_11", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Computer Vision", subId: "SUB_04", fac: "Dr. Divya Raman", facId: "FAC_06", type: "Theory" },
      { sub: "Machine Learning", subId: "SUB_03", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Theory" },
      { sub: "Machine Learning Lab", subId: "SUB_10", fac: "Dr. Arun Kumar", facId: "FAC_01", type: "Practical", lab: "LAB_03", labName: "Lab 3 (AI/ML Lab)" },
    ],
    "B_3_CSE_A": [
      { sub: "Software Engineering", subId: "SUB_16", fac: "Dr. Rajesh Khanna", facId: "FAC_09", type: "Theory" },
      { sub: "Computer Networks", subId: "SUB_07", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Cloud Computing", subId: "SUB_16", fac: "Dr. Rajesh Khanna", facId: "FAC_09", type: "Theory" },
      { sub: "Compiler Design", subId: "SUB_15", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Theory" },
      { sub: "Networks & OS Lab", subId: "SUB_18", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Practical", lab: "LAB_02", labName: "Lab 2 (Computer Lab)" },
    ],
    "B_3_CSE_B": [
      { sub: "Computer Networks", subId: "SUB_07", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Theory" },
      { sub: "Software Engineering", subId: "SUB_16", fac: "Dr. Rajesh Khanna", facId: "FAC_09", type: "Theory" },
      { sub: "Compiler Design", subId: "SUB_15", fac: "Prof. Kavitha Sundaram", facId: "FAC_10", type: "Theory" },
      { sub: "Cloud Computing", subId: "SUB_16", fac: "Dr. Rajesh Khanna", facId: "FAC_09", type: "Theory" },
      { sub: "Networks & OS Lab", subId: "SUB_18", fac: "Prof. Suresh Babu", facId: "FAC_05", type: "Practical", lab: "LAB_02", labName: "Lab 2 (Computer Lab)" },
    ],
    "B_3_CSBS_A": [
      { sub: "Financial Systems", subId: "SUB_20", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Theory" },
      { sub: "Enterprise Architecture", subId: "SUB_19", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Theory" },
      { sub: "Software Engineering", subId: "SUB_16", fac: "Dr. Rajesh Khanna", facId: "FAC_09", type: "Theory" },
      { sub: "Business Analytics", subId: "SUB_19", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Theory" },
      { sub: "Business Analytics Lab", subId: "SUB_21", fac: "Dr. Balaji Venkatesh", facId: "FAC_11", type: "Practical", lab: "LAB_04", labName: "Lab 4 (Data Science Lab)" },
    ],
    "B_3_VLSI_A": [
      { sub: "Verilog HDL & CMOS", subId: "SUB_23", fac: "Prof. Deepa N", facId: "FAC_13", type: "Theory" },
      { sub: "FPGA Architecture", subId: "SUB_22", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Theory" },
      { sub: "Embedded Systems", subId: "SUB_23", fac: "Prof. Deepa N", facId: "FAC_13", type: "Theory" },
      { sub: "Digital System Design", subId: "SUB_22", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Theory" },
      { sub: "VLSI Design Lab", subId: "SUB_24", fac: "Dr. Swaminathan S", facId: "FAC_12", type: "Practical", lab: "LAB_05", labName: "Lab 5 (VLSI Design Lab)" },
    ],
    "B_3_BME_A": [
      { sub: "Medical Imaging Systems", subId: "SUB_26", fac: "Prof. Vignesh M", facId: "FAC_15", type: "Theory" },
      { sub: "Biomedical Instrumentation", subId: "SUB_25", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Theory" },
      { sub: "Biomaterials & Implants", subId: "SUB_26", fac: "Prof. Vignesh M", facId: "FAC_15", type: "Theory" },
      { sub: "Diagnostic Devices", subId: "SUB_25", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Theory" },
      { sub: "Biomedical Systems Lab", subId: "SUB_27", fac: "Dr. Gayathri R", facId: "FAC_14", type: "Practical", lab: "LAB_06", labName: "Lab 6 (Biomedical Systems Lab)" },
    ],
  };

  // 1. Staggered Lab Allocation (2 continuous slots per batch)
  const labDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const labPairs = [
    ["P5", "P6"],
    ["P7", "P8"],
    ["P3", "P4"]
  ];

  BATCHES.forEach((batch, bIdx) => {
    const curriculum = batchCurriculums[batch.id];
    const labCourse = curriculum.find(c => c.type === "Practical");
    const targetDay = labDays[bIdx % labDays.length];

    for (const [p1, p2] of labPairs) {
      if (canAssign(targetDay, p1, labCourse.facId, labCourse.lab, batch.id) &&
          canAssign(targetDay, p2, labCourse.facId, labCourse.lab, batch.id)) {
        recordAssign(targetDay, p1, labCourse.facId, labCourse.lab, batch.id);
        recordAssign(targetDay, p2, labCourse.facId, labCourse.lab, batch.id);
        entries.push({
          id: `T_${batch.id}_${targetDay}_${p1}`,
          day: targetDay,
          periodId: p1,
          subjectId: labCourse.subId,
          subjectName: labCourse.sub,
          facultyId: labCourse.facId,
          facultyName: labCourse.fac,
          roomId: labCourse.lab,
          roomName: labCourse.labName,
          batchId: batch.id,
          batchName: batch.name,
          type: "Practical"
        });
        entries.push({
          id: `T_${batch.id}_${targetDay}_${p2}`,
          day: targetDay,
          periodId: p2,
          subjectId: labCourse.subId,
          subjectName: labCourse.sub,
          facultyId: labCourse.facId,
          facultyName: labCourse.fac,
          roomId: labCourse.lab,
          roomName: labCourse.labName,
          batchId: batch.id,
          batchName: batch.name,
          type: "Practical"
        });
        break;
      }
    }
  });

  // 2. Theory Allocation: Round-Robin distribution
  const teachingPeriods = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];

  DAYS.forEach((day, dIdx) => {
    teachingPeriods.forEach((pId, pIdx) => {
      BATCHES.forEach((batch, bIdx) => {
        if (batchBusy.has(`${day}_${pId}_${batch.id}`)) return; // Already lab

        const curriculum = batchCurriculums[batch.id];
        const theories = curriculum.filter(c => c.type === "Theory");

        let assigned = false;
        const offset = (dIdx * 2 + pIdx + bIdx) % theories.length;

        for (let i = 0; i < theories.length; i++) {
          const candidate = theories[(offset + i) % theories.length];
          if (canAssign(day, pId, candidate.facId, batch.preferredRoom, batch.id)) {
            recordAssign(day, pId, candidate.facId, batch.preferredRoom, batch.id);
            entries.push({
              id: `T_${batch.id}_${day}_${pId}`,
              day,
              periodId: pId,
              subjectId: candidate.subId,
              subjectName: candidate.sub,
              facultyId: candidate.facId,
              facultyName: candidate.fac,
              roomId: batch.preferredRoom,
              roomName: batch.roomName,
              batchId: batch.id,
              batchName: batch.name,
              type: "Theory"
            });
            assigned = true;
            break;
          }
        }

        if (!assigned) {
          // Self-Study / Research Seminar slot with Batch Advisor
          entries.push({
            id: `T_${batch.id}_${day}_${pId}`,
            day,
            periodId: pId,
            subjectId: "SEM_01",
            subjectName: "Technical Seminar & Self Study",
            facultyId: `ADVISOR_${batch.department}`,
            facultyName: `${batch.department} Academic Advisor`,
            roomId: batch.preferredRoom,
            roomName: batch.roomName,
            batchId: batch.id,
            batchName: batch.name,
            type: "Theory"
          });
        }
      });
    });
  });

  return entries;
}

export const INITIAL_TIMETABLE_ENTRIES = generateComprehensiveInitialTimetable();

export const DEMO_STUDENTS = [
  // 2nd Year (Semester III)
  { id: "STU_2_AIDS_A", name: "Rahul Kumar", registerNo: "24AD101", email: "student.aids2a@abc.edu", password: "student123", department: "AI & DS", year: 2, semester: "III", section: "A", batchId: "B_2_AIDS_A", batchName: "II AI & DS A" },
  { id: "STU_2_AIDS_B", name: "Sneha Reddy", registerNo: "24AD155", email: "student.aids2b@abc.edu", password: "student123", department: "AI & DS", year: 2, semester: "III", section: "B", batchId: "B_2_AIDS_B", batchName: "II AI & DS B" },
  { id: "STU_2_AIML_A", name: "Aditya Verma", registerNo: "24AM102", email: "student.aiml2a@abc.edu", password: "student123", department: "AI & ML", year: 2, semester: "III", section: "A", batchId: "B_2_AIML_A", batchName: "II AI & ML A" },
  { id: "STU_2_AIML_B", name: "Pooja Nair", registerNo: "24AM158", email: "student.aiml2b@abc.edu", password: "student123", department: "AI & ML", year: 2, semester: "III", section: "B", batchId: "B_2_AIML_B", batchName: "II AI & ML B" },
  { id: "STU_2_CSE_A", name: "Varun Sharma", registerNo: "24CS101", email: "student.cse2a@abc.edu", password: "student123", department: "CSE", year: 2, semester: "III", section: "A", batchId: "B_2_CSE_A", batchName: "II CSE A" },
  { id: "STU_2_CSE_B", name: "Ananya Das", registerNo: "24CS160", email: "student.cse2b@abc.edu", password: "student123", department: "CSE", year: 2, semester: "III", section: "B", batchId: "B_2_CSE_B", batchName: "II CSE B" },
  { id: "STU_2_CSBS_A", name: "Rohan Gupta", registerNo: "24CB101", email: "student.csbs2@abc.edu", password: "student123", department: "CSBS", year: 2, semester: "III", section: "A", batchId: "B_2_CSBS_A", batchName: "II CSBS" },
  { id: "STU_2_VLSI_A", name: "Siddharth Menon", registerNo: "24VL101", email: "student.vlsi2@abc.edu", password: "student123", department: "VLSI", year: 2, semester: "III", section: "A", batchId: "B_2_VLSI_A", batchName: "II VLSI" },
  { id: "STU_2_BME_A", name: "Kavya S", registerNo: "24BM101", email: "student.bme2@abc.edu", password: "student123", department: "BME", year: 2, semester: "III", section: "A", batchId: "B_2_BME_A", batchName: "II BME" },

  // 3rd Year (Semester V)
  { id: "STU_3_AIDS_A", name: "Gautam Iyer", registerNo: "23AD104", email: "student.aids3a@abc.edu", password: "student123", department: "AI & DS", year: 3, semester: "V", section: "A", batchId: "B_3_AIDS_A", batchName: "III AI & DS A" },
  { id: "STU_3_AIDS_B", name: "Deepika Rao", registerNo: "23AD156", email: "student.aids3b@abc.edu", password: "student123", department: "AI & DS", year: 3, semester: "V", section: "B", batchId: "B_3_AIDS_B", batchName: "III AI & DS B" },
  { id: "STU_3_AIML_A", name: "Kiran Patel", registerNo: "23AM105", email: "student.aiml3a@abc.edu", password: "student123", department: "AI & ML", year: 3, semester: "V", section: "A", batchId: "B_3_AIML_A", batchName: "III AI & ML A" },
  { id: "STU_3_AIML_B", name: "Ishaan Malhotra", registerNo: "23AM159", email: "student.aiml3b@abc.edu", password: "student123", department: "AI & ML", year: 3, semester: "V", section: "B", batchId: "B_3_AIML_B", batchName: "III AI & ML B" },
  { id: "STU_3_CSE_A", name: "Abhishek Roy", registerNo: "23CS103", email: "student.cse3a@abc.edu", password: "student123", department: "CSE", year: 3, semester: "V", section: "A", batchId: "B_3_CSE_A", batchName: "III CSE A" },
  { id: "STU_3_CSE_B", name: "Meera Nambiar", registerNo: "23CS162", email: "student.cse3b@abc.edu", password: "student123", department: "CSE", year: 3, semester: "V", section: "B", batchId: "B_3_CSE_B", batchName: "III CSE B" },
  { id: "STU_3_CSBS_A", name: "Nikhil Varma", registerNo: "23CB102", email: "student.csbs3@abc.edu", password: "student123", department: "CSBS", year: 3, semester: "V", section: "A", batchId: "B_3_CSBS_A", batchName: "III CSBS" },
  { id: "STU_3_VLSI_A", name: "Sanjay Sundaram", registerNo: "23VL102", email: "student.vlsi3@abc.edu", password: "student123", department: "VLSI", year: 3, semester: "V", section: "A", batchId: "B_3_VLSI_A", batchName: "III VLSI" },
  { id: "STU_3_BME_A", name: "Divya Swaminathan", registerNo: "23BM103", email: "student.bme3@abc.edu", password: "student123", department: "BME", year: 3, semester: "V", section: "A", batchId: "B_3_BME_A", batchName: "III BME" },
];

export const DEMO_STUDENT = DEMO_STUDENTS[0];

export const DEMO_ADMIN = {
  id: "ADMIN_01",
  name: "Dr. K. S. Ramanathan",
  email: "admin@abc.edu",
  secondaryEmail: "admin@kit.edu",
  password: "admin123",
  role: "admin",
  designation: "Dean of Academic Affairs",
};

export const DEMO_FACULTY_USER = {
  id: "FAC_01",
  name: "Dr. Arun Kumar",
  email: "arun.kumar@abc.edu",
  secondaryEmail: "faculty@kit.edu",
  password: "faculty123",
  role: "faculty",
  designation: "Professor & Head",
  department: "AI & DS",
  assignedHours: 16,
  maxWeeklyHours: 18,
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "N1",
    title: "Timetable Published for Academic Year 2026–27",
    message: "The final clash-free timetable for Semester III & V has been officially approved and published.",
    timestamp: "10 mins ago",
    type: "publish",
    unread: true
  },
  {
    id: "N2",
    title: "Automated Constraint Check Complete",
    message: "Zero hard constraint clashes detected across all 18 student batches and 22 classrooms.",
    timestamp: "35 mins ago",
    type: "success",
    unread: true
  },
  {
    id: "N3",
    title: "AI/ML Lab Utilization Notice",
    message: "Lab 3 is operating at optimal 88% capacity utilization with balanced practical sessions.",
    timestamp: "1 hour ago",
    type: "info",
    unread: false
  }
];
