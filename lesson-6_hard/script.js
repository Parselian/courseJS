let weeks = [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    date = new Date().getDay(),
    sortDays = function() {
      for( let i = 0; i < weeks.length; i++) {
        if(weeks[i] === 'суббота' || weeks[i] === 'воскресенье') {
          document.write('<span style="font-style: italic; color: red">' + weeks[i] + '</span> <br/>');
        } else if(i === date) {
          document.write('<span style="font-weight: 700">' + weeks[i] + '</span> <br/>');
        } else {
          document.write(weeks[i] + '<br/>');
        }
      }
    };

sortDays();
console.log(date);
