/**
 *
 * @param {*} time
 * @description return start time
 * @returns
 */
function startTime(time) {
  const dataArr = time.split("-");
  return dataArr[0];
}
/**
 *
 * @param {*} time
 * @description return end time
 * @returns
 */
function endTime(time) {
  const dataArr = time.split("-");
  return dataArr[1];
}

/**
 *
 * @param {*} inputDate
 * @param {*} inputTime
 * @description convert date to iso 8601
 * @returns
 */
function convertDate(inputDate, inputTime) {
  // Podziel datę na części
  //jeśli input date nie zawiera kropki to dodaj kropkę

  var dateParts = inputDate.split(".");
  if (inputTime === undefined) {
    return 0;
  } else {
    var timeParts = inputTime.split(".");
  }

  // Utwórz obiekt Date
  if (timeParts.length === 1) {
    timeParts[1] = "00";
  }

  var dateObject = new Date(
    dateParts[2],
    dateParts[1] - 1,
    dateParts[0],
    timeParts[0],
    timeParts[1]
  ); // Miesiące są od 0 do 11, dlatego odejmujemy 1

  //odd 2 hours do to time
  dateObject.setHours(dateObject.getHours() + 2);
  // Utwórz string w formacie ISO 8601
  var isoString = dateObject.toISOString();

  // Usuń znaki niechciane
  isoString = isoString.replace(/[-:.]/g, "");

  // Usuń ostatnie 3 cyfry (związane z milisekundami)
  isoString = isoString.slice(0, -4);
  //isoString = isoString + "Z";
  return isoString;
}

/**
 *
 * @param {*} liczbaDni
 * @description add day to date
 * @returns
 */
function addDayToDate(liczbaDni) {
  if (liczbaDni === undefined) {
    liczbaDni = dni;
  }
  dni = liczbaDni;
  // Utwórz obiekt Date dla daty odniesienia (1 stycznia 1900)
  const dataReferencyjna = new Date("1900-01-01T05:00:00Z");

  // Dodaj liczbę dni do daty referencyjnej
  dataReferencyjna.setDate(dataReferencyjna.getDate() + liczbaDni - 2);

  // Zwróć wynik w formie obiektu Date
  return dataReferencyjna;
}

module.exports = {
  addDayToDate,
  convertDate,
  startTime,
  endTime,
};
