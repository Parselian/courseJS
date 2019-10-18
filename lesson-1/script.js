/* УРОК №1 */
let money = 15152,
    income = 'фриланс',
    addExpenses = 'курсы, МузЫка, игры',
    deposit = true,
    mission = 300000,
    period = 10;

/*
alert('Привет, бренный мир :с');
console.log('мама, я прогроммист!'); 
*/



/* УРОК №2 */
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('цель заработать ' + mission + ' шекелей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log('Ваш бюджет на день: ' + Math.trunc(budgetDay) + ' шекелей, остаток: ' + (money % 30)); 


