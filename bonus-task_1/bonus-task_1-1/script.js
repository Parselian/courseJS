'use strict';

/* ЗАДАНИЕ 1 */
let compareNumbers = function() {

  let question1,
      question2,
      num1,
      num2;

  while(isNaN(question1) || question1 === '' || question1 === null) {
    question1 = prompt('Введите первое число');
  }

  num1 = parseFloat(question1);

  while(isNaN(question2) || question2 === '' || question2 === null) {
    question2 = prompt('Введите второе число');
  }

  num2 = parseFloat(question2);

  if( num1 > num2) {
    return 'первое число больше второго';
  } else if( num2 > num1 ) {
    return 'Второе число больше первого';
  } else if( num1 === num2 ) {
    return 'Числа равны';
  }
};

console.log(compareNumbers());