'use strict';
/* ЗАДАНИЕ 3 */
let infSum = function() {

  let sum = 0, 
      query,
      parsed;

  restart:
  for( ; ; ) {
    
    query = prompt('Введите число:', '');

    if(query === null) {
      return sum;
    } else if( isNaN(parseFloat(query)) && !isFinite(query) || query === '' ) {
      continue restart;
    } else {
      parsed = parseFloat(query);
      sum += parsed;
      parsed = 0;
    }
  }
};

console.log('infSum(): ', infSum());