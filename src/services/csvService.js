/**
 * CSV Import / Export Service
 * ABC College Academic Scheduler - SIH25028 (Quantum Quirks)
 */

/**
 * Parses CSV text into array of objects based on header row
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const record = {};
      headers.forEach((h, idx) => {
        let val = values[idx];
        if (val === "true") val = true;
        else if (val === "false") val = false;
        else if (!isNaN(val) && val !== "") val = Number(val);
        record[h.trim()] = val;
      });
      records.push(record);
    }
  }

  return records;
}

/**
 * Handle CSV line splitting taking quoted comma strings into account
 */
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Convert array of objects to CSV string
 */
export function exportToCSV(data = [], filename = "export.csv") {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = [headers.join(",")];

  for (const item of data) {
    const values = headers.map(h => {
      let val = item[h];
      if (Array.isArray(val)) {
        val = `"${val.join(", ")}"`;
      } else if (typeof val === "string" && val.includes(",")) {
        val = `"${val}"`;
      }
      return val !== undefined && val !== null ? val : "";
    });
    rows.push(values.join(","));
  }

  const csvString = rows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return csvString;
}

/**
 * Download sample CSV template directly
 */
export function downloadSampleTemplate(templateString, filename) {
  const blob = new Blob([templateString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
