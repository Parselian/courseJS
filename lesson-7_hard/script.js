function showCurrDate() {

  let currDate = new Date(),
      currYear = currDate.getFullYear(),
      currMonth = currDate.getMonth(),
      currDay = currDate.getDate(),
      currHour = currDate.getHours(),
      currMinutes = currDate.getMinutes(),
      currSeconds = currDate.getSeconds();

  if( currMonth < 10 ) {
    currMonth = '0' + currMonth;
  } else if( currDay < 10 ) {
    currDay = '0' + currDay;
  } else if( currHour < 10 ) {
    currHour = '0' + currHour;
  } else if( currMinutes < 10 ) {
    currMinutes = '0' + currMinutes;
  } else if( currSeconds < 10 ) {
    currSeconds = '0' + currSeconds;
  }

  let elem = document.createElement('div'),
      printDate = currHour + ':' + currMinutes + ':' + currSeconds + ' ' + currDay + ':' + currMonth + ':' + currYear,
      body = document.querySelector('body');

  elem.textContent = printDate;

  body.appendChild(elem);

}

console.log(showCurrDate());