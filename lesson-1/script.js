/* УРОК №1 */
let money = +prompt('Введите ваш месячный доход:', ''),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 10;

    

function showTypeof(data) {
  return typeof(data);
}

console.log(showTypeof(money));
console.log(showTypeof(income));
console.log(showTypeof(deposit));



let question1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', ''),
    question2 = +prompt('Во сколько это обойдется?', ''),
    question3 = prompt('Какие обязательные ежемесячные расходы у вас есть?', ''),
    question4 = +prompt('Во сколько это обойдется?', ''),
    budgetMonth,
    roadToMission;



function getExpensesMonth(val1, val2) {
  return val1 + val2;
}

console.log('сумма всех расходов: ', getExpensesMonth(question2, question4));



let accumulatedMonth;

function getAccumulatedMonth() {
  accumulatedMonth = money - (question2 + question4);
  return accumulatedMonth;
}

console.log('Накопления за месяц: ', getAccumulatedMonth());



function getTargetMonth() {
  let roadToMission = Math.ceil(mission / accumulatedMonth);
  return roadToMission;
}

console.log(getTargetMonth());



let budgetDay;

function getStatusIncome() {
  budgetDay = budgetMonth / 30;

  if( budgetDay > 800 ) {
     return 'Высокий уровень дохода';
  } else if(300 < budgetDay < 800 || budgetDay === 300 || budgetDay === 800 ) {
    return 'Средний уровень дохода';
  } else if( 0 < budgetDay < 300 || budgetDay === 0 || budgetDay === 300 ) {
    return 'Низкий уровень дохода';
  } else {
    return'Что-то пошло не так';
  }
}

console.log(getStatusIncome());


