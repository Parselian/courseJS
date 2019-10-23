/* УРОК №1 */
let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 10;

let start = function() {
  do {
    money = prompt('Введите ваш месячный доход:', '2500');
  } while( isNaN(money) || money === '' || money === null );

  console.log('money: ', +money);
};
 
start();



function showTypeof(data) {
  return typeof(data);
}

console.log(showTypeof(money));
console.log(showTypeof(income));
console.log(showTypeof(deposit));



let expenses1,
    expenses2,
    roadToMission;



function getExpensesMonth() {
  let arg = 0,
      sum = 0;

  for( let i = 0; i < 2; i++ ) {
    if( i === 0 ) {
    expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', '');
    } 

    if( i === 1 ) {
    expenses2 = prompt('Какие ещё обязательные ежемесячные расходы у вас есть?', '');
    } 

    arg = prompt('во сколько это обойдется? ');     
    while (isNaN(arg) || arg === '' || arg === null) {
      arg = 0;
      alert('пожалуйста, введите число!');
      arg = prompt('во сколько это обойдется? ');     
    }
    sum += +arg;
  }
  
  return sum;
    
}

let expensesAmount = getExpensesMonth();

console.log('сумма всех расходов: ' + expensesAmount);



let accumulatedMonth;

function getAccumulatedMonth() {
  accumulatedMonth = money - expensesAmount;
  return accumulatedMonth;
}

console.log('Накопления за месяц: ', getAccumulatedMonth());



function getTargetMonth() {
  let roadToMission = Math.ceil(mission / accumulatedMonth);

  if(roadToMission <= 0 ) {
    return 'Цель не будет достигнута!';
  } else {
    return 'Цель будет достигнута за ' + roadToMission + ' месяцев';
  }
}

console.log(getTargetMonth());



let budgetDay = 0;

function getStatusIncome() {
  console.log('accumulatedMonth: ', accumulatedMonth);
  console.log('budgetDay: ', budgetDay);
  budgetDay = Math.floor(accumulatedMonth / 30);

  

  if( budgetDay > 800 ) {
    return 'Высокий уровень дохода';
  } else if( budgetDay >= 300 && budgetDay <= 800 ) {
    return 'Средний уровень дохода';
  } else if( budgetDay > 0 && budgetDay <= 300 ) {
    return 'Низкий уровень дохода';
  } else if( budgetDay <= 0 ) {
    return 'Что-то пошло не так';
  }
}

console.log(getStatusIncome());


