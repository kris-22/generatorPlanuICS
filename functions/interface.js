/**
 *
 * @param {*} worksheet
 * @returns selectedField
 * @description interface for console
 */
function consoleInterface(worksheet) {
  const XLSX = require("xlsx");

  console.log("witaj podaj jaki kierynek potrzebujesz");
  console.log("dospenpe kierunki to: ");

  return new Promise((resolve, reject) => {
    // Pobierz wszystkie wiersze z arkusza
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let kierunki = [];
    // jeśli rows[0] zawoera I wyświtl
    for (let i = 0; i < rows[0].length; i++) {
      if (rows[0][i] && rows[0][i].includes("I")) {
        kierunki.push(rows[0][i]);
      }
    }

    // Sprawdź, czy są dostępne kierunki
    if (kierunki.length === 0) {
      reject("Brak dostępnych kierunków zaczynających się od 'I'.");
      return;
    }

    // Wyświetl numer i kierunek
    kierunki.forEach((kierunek, index) => {
      console.log(`${index + 1}. ${kierunek}`);
    });

    // Get field from user
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Podaj numer kierunku: `, (fieldNumber) => {
      // Convert fieldNumber to array index
      const index = parseInt(fieldNumber) - 1;

      // Check if the entered index is valid
      if (index >= 0 && index < kierunki.length) {
        const selectedField = {
          name: kierunki[index],
          index: index,
        };
        console.log(`Wybrano kierunek: ${selectedField.name}`);
        readline.close();
        resolve(selectedField);
      } else {
        console.log("Nieprawidłowy numer kierunku.");
        readline.close();
        reject("Nieprawidłowy numer kierunku.");
      }
    });
  });
}
// Export consoleInterface
module.exports = consoleInterface;
