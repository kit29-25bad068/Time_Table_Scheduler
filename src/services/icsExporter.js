/**
 * RFC 5545 iCalendar (.ics) Exporter
 * Generates calendar files for Apple Calendar, Google Calendar, Outlook
 * ABC College Academic Scheduler - SIH25028 (Quantum Quirks)
 */

import { PERIOD_SLOTS } from '../data/sampleData';

const DAY_MAP = {
  Monday: { byDay: "MO", dayOffset: 0 },
  Tuesday: { byDay: "TU", dayOffset: 1 },
  Wednesday: { byDay: "WE", dayOffset: 2 },
  Thursday: { byDay: "TH", dayOffset: 3 },
  Friday: { byDay: "FR", dayOffset: 4 },
};

/**
 * Generate RFC 5545 compliant .ics string and trigger browser download
 * 
 * @param {Array} entries - Timetable entries
 * @param {string} filename - Output filename
 * @param {string} title - Calendar title
 */
export function exportTimetableToICS(entries = [], filename = "abc_college_timetable.ics", title = "ABC College Academic Timetable") {
  // Use a base reference Monday date in 2026 (e.g. Aug 17, 2026)
  const baseYear = 2026;
  const baseMonth = "08";
  const baseMondayDay = 17;

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ABC College of Engineering & Technology//Smart Scheduler SIH25028//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${title}`,
    "X-WR-TIMEZONE:Asia/Kolkata",
  ];

  for (const entry of entries) {
    const period = PERIOD_SLOTS.find(p => p.id === entry.periodId);
    if (!period || period.isBreak) continue;

    const dayMeta = DAY_MAP[entry.day];
    if (!dayMeta) continue;

    const eventDayNum = String(baseMondayDay + dayMeta.dayOffset).padStart(2, "0");
    const [startH, startM] = period.startTime.split(":");
    const [endH, endM] = period.endTime.split(":");

    const dtStart = `${baseYear}${baseMonth}${eventDayNum}T${startH}${startM}00`;
    const dtEnd = `${baseYear}${baseMonth}${eventDayNum}T${endH}${endM}00`;
    const uid = `sih25028_${entry.id}_${Date.now()}@kit.edu`;

    const summary = `${entry.subjectName} (${entry.type || "Theory"})`;
    const location = `${entry.roomName} - ABC College`;
    const description = `Subject: ${entry.subjectName}\\nFaculty: ${entry.facultyName}\\nBatch: ${entry.batchName || entry.batchId}\\nRoom: ${entry.roomName}\\nSlot: ${entry.day} ${period.time}`;

    icsContent.push("BEGIN:VEVENT");
    icsContent.push(`UID:${uid}`);
    icsContent.push(`DTSTAMP:${baseYear}${baseMonth}${baseMondayDay}T000000Z`);
    icsContent.push(`DTSTART;TZID=Asia/Kolkata:${dtStart}`);
    icsContent.push(`DTEND;TZID=Asia/Kolkata:${dtEnd}`);
    icsContent.push(`RRULE:FREQ=WEEKLY;BYDAY=${dayMeta.byDay};UNTIL=20261231T235959Z`);
    icsContent.push(`SUMMARY:${summary}`);
    icsContent.push(`LOCATION:${location}`);
    icsContent.push(`DESCRIPTION:${description}`);
    icsContent.push(`STATUS:CONFIRMED`);
    icsContent.push("END:VEVENT");
  }

  icsContent.push("END:VCALENDAR");

  const icsString = icsContent.join("\r\n");

  // Trigger browser download
  const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename.endsWith(".ics") ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}
