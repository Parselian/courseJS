/* УРОК №1 */
let money = +prompt('Введите ваш месячный доход:', ''),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 10;

    
    
/* УРОК №3 */
let arrExpenses = addExpenses.split(', ');

console.log(arrExpenses);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let question1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', ''),
    question2 = +prompt('Во сколько это обойдется?', ''),
    question3 = prompt('Какие обязательные ежемесячные расходы у вас есть?', ''),
    question4 = +prompt('Во сколько это обойдется?', ''),
    budgetMonth,
    roadToMission;

budgetMonth = money - (question2 + question4);
console.log(budgetMonth);

roadToMission = Math.ceil(mission / budgetMonth);
console.log(roadToMission);

let budgetDay = budgetMonth / 30;
console.log('Ваш бюджет на день: ' + Math.floor(budgetDay)); 

if( budgetDay > 800 ) {
  alert('Высокий уровень дохода');
} else if(300 < budgetDay < 800 || budgetDay === 300 || budgetDay === 800 ) {
  alert('Средний уровень дохода');
} else if( 0 < budgetDay < 300 || budgetDay === 0 || budgetDay === 300 ) {
  alert('Низкий уровень дохода');
} else {
  alert('Что-то пошло не так');
}



