/**
 *
 * @param {*} worksheet
 * @returns selectedField
 * @description interface for console
 */
function consoleInterface(worksheet) {
  const XLSX = require("xlsx");

  console.log("Witaj, podaj jaki kierunek potrzebujesz.");
  console.log("Dostępne kierunki to:");

  return new Promise((resolve, reject) => {
    // Pobierz wszystkie wiersze z arkusza
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let kierunki = [];
    // Jeśli rows[0] zawiera "I", wyświetl
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

    // Get field and group from the user
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Podaj numer kierunku: `, (fieldNumber) => {
      const index = parseInt(fieldNumber) - 1;

      // Check if the entered index is valid
      if (index >= 0 && index < kierunki.length) {
        const selectedField = {
          name: kierunki[index],
          index: index,
        };
        console.log(`Wybrano kierunek: ${selectedField.name}`);

        readline.question(
          `Podaj numer grupy dla kierunku ${selectedField.name}: `,
          (groupNumber) => {
            selectedField.group = groupNumber;
            console.log(`Wybrano grupę: ${selectedField.group}`);
            readline.close();
            resolve(selectedField);
          }
        );
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
