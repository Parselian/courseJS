'use strict';
/* ЗАДАНИЕ 2 */
let leapYears = function() {

  let start = +prompt('Введите первый год: ', 1200),
      end = +prompt('Введите второй год: ', 2019);

  if(start > end) {
    end = [start, start = end][0];
  }

  for( start; start < end; start++ ) {
    if( start % 4 === 0 || start % 400 === 0) {
      console.log('Високосный год:' + start);
    } else {
      continue;
    }
  } 
};

leapYears();