const XLSX = require("xlsx");
const fs = require("fs");
const {
  addDayToDate,
  convertDate,
  startTime,
  endTime,
} = require("./functions/time");
const consoleInterface = require("./functions/interface");

// Ścieżka do pliku XLSX
const filePath = "piel.xlsx";
// Wczytaj plik XLSX
const workbook = XLSX.readFile(filePath);
// Pobierz pierwszy arkusz
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Konwertuj arkusz na obiekt JSON

/**
 * @param {*} field
 * @description select field from consoleInterface
 * @returns
 */
async function selectField(field) {
  let dni;
  let iscFile = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-TIMEZONE:Europe/Warsaw
BEGIN:VTIMEZONE
TZID:Europe/Warsaw
X-LIC-LOCATION:Europe/Warsaw
BEGIN:DAYLIGHT
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE`;
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // console.log(jsonData);
  // conwert jsonData to jsonDat
  for (let i = 0; i < jsonData.length; i++) {
    if (!jsonData[i]["data "]) {
      jsonData[i]["data "] = dni;
    }
    const numericDate = jsonData[i]["data "];
    // Uzyskaj wynikową datę
    const wynikowaData = addDayToDate(numericDate);

    // Formatuj wynikową datę1
    const formattedDate = wynikowaData.toLocaleDateString();
    jsonData[i]["data "] = formattedDate;
    // console.log(jsonData[i]["data "]);

    if (jsonData[i]["godzina "]) {
      const time = jsonData[i]["godzina "];
      jsonData[i]["od"] = startTime(time);
      jsonData[i]["do"] = endTime(time);
    }
    let groupIndex = undefined;
    if (field.index === 0) {
      groupIndex = "Grupa";
    } else if (field.index >= 1) {
      groupIndex = "Grupa_" + field.index;
    }

    if (jsonData[i][field.name]) {
      if (!jsonData[i][groupIndex]) {
        jsonData[i][groupIndex] = "wszyscy";
      }
      // console.table(jsonData[i]);

      //creare isc file
      iscFile += `
BEGIN:VEVENT
DTSTART:${convertDate(jsonData[i]["data "], jsonData[i]["od"])}
DTEND:${convertDate(jsonData[i]["data "], jsonData[i]["do"])}
SUMMARY:${jsonData[i][field.name] + " (" + jsonData[i][groupIndex] + ")"}
DESCRIPTION:${jsonData[i][groupIndex]}
END:VEVENT`;
    } // console.log(iscFile);
  }
  iscFile += `
END:VCALENDAR`;
  fs.writeFile(`plan.ics`, iscFile, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

// Wywołaj funkcję asynchroniczną
(async () => {
  await selectField(await consoleInterface(worksheet));
})();
