'use strict';
/* ЗАДАНИЕ 4 */
let gameBot = function(min, max) {

  let randNum,
      question,
      parsed,
      restart;

  res:
  for ( ; ; ) {
    randNum =  Math.floor(Math.random() * (max - min + 1)) + min;

    for( ; ; ) {
      question = prompt('Угадай число!', '');

      while(isNaN(parseFloat(question)) && !isFinite(question) || question === '') {
        question = 0;
        alert('Введи ЧИСЛО, не строку!!!');
        question = prompt('Угадай число!', '');
      }

      if(question === null) {
        return;
      }
    
      parsed = parseInt(question);
    
      if ( parsed < randNum ) {
        alert('Больше!');
        continue;
      } else if( parsed > randNum ) {
        alert('Меньше!');
        continue;
      } else if( parsed === randNum) {
        restart = confirm('Поздравляю! Хотите ещё?');
        if(restart === true) {
          continue res;
        } else {
          return ;
        }
      }
    }
  }
};

console.log(gameBot(1, 100));