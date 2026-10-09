# AI-Powered Smart Classroom & Timetable Scheduler (SIH25028)

**Team**: Quantum Quirks (`KITSIH26-S066`)  
**Institution**: ABC College of Engineering & Technology  
**Theme**: Smart Education  

---

## 🌟 Overview
An intelligent, constraint-driven academic scheduling system built with React, Vite, Tailwind CSS, and Lucide Icons. The platform generates 100% clash-free, deterministic timetables adhering to institutional requirements, faculty workloads, classroom capacities, specialized laboratory facilities, and break slots.

---

## 🚀 Key Features

1. **Full 40-Slot Academic Schedules (0 Free Slots)**:
   - Full 8-period daily schedules across Monday to Friday for student cohorts.
   - Dynamic Latin-Square period rotation ensuring distinct daily 1st periods.
   - Core theory subjects in morning periods and 2-hour practical laboratory sessions in afternoon slots.

2. **Persona-Isolated Role-Based Access Control (RBAC)**:
   - **Student Portal**: View personal batch timetable exclusively, with today/tomorrow's schedule and 1-click `.ics` calendar sync.
   - **Faculty Portal**: Dedicated teaching schedule across batches, workload monitoring, emergency absence marking, and personal `.ics` calendar export.
   - **Administrator Portal**: Master ERP dashboard with CP-SAT solver, master drag-and-drop timetable editor, real-time conflict detector, and system settings.

3. **Zero-Clash Constraint Satisfaction (CP-SAT Heuristic)**:
   - **Faculty Double-Booking Shield**: Strict guarantee that a faculty member can never be scheduled in more than one classroom at any given time.
   - **Room Collision Prevention**: Zero room double-booking.
   - **Room Capacity Integrity**: Ensures room seating capacity $\ge$ batch student strength.
   - **Specialized Lab Allocation**: Automatically pairs practical courses with appropriate computer/VLSI/biomedical laboratories.
   - **Break Slot Immunity**: Preserves Morning Break, Lunch Break, and Afternoon Break.

4. **Emergency Faculty Substitution Engine**:
   - Automated candidate ranking based on subject competency, time availability, and workload quota.
   - Comprehensive **Infeasibility Diagnostic Report** when all qualified faculty are occupied.

5. **Modern Glassmorphic / Claymorphic UI**:
   - Clean, professional design optimized for academic administrators and daily student use.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Custom Glassmorphism & Claymorphism CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Exporting**: iCalendar (`.ics`), Print / PDF

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/kit29-25bad068/Time_Table_Scheduler.git

# Navigate to project directory
cd Time_Table_Scheduler

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 👥 Demo Credentials
- **Administrator**: `admin@abc.edu` / `admin123`
- **Faculty (Dr. Arun Kumar)**: `arun.kumar@abc.edu` / `faculty123`
- **Student (II AI & DS A - Rahul Kumar)**: `student.aids2a@abc.edu` / `student123`
- *All 18 student batches and 16 faculty profiles feature 1-click sign-in on the login page.*
