/* УРОК №6 */

function start() {
  let money2;
  do {
    money2 = prompt('Введите ваш месячный доход:', '2500');
  } while( isNaN(money2) || money2 === '' || money2 === null );

  return +money2;
}

let appData = {
  money: start(),
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 10,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', '');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let expenses;

    for( let i = 0; i < 2; i++ ) {
      if( i === 0 ) {
        expenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', '');
      } else {
        expenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', '');
      } 

      let arg = 0;

      arg = prompt('во сколько это обойдется? ');     
      while (isNaN(arg) || arg === '' || arg === null) {
        arg = 0;
        alert('пожалуйста, введите число!');
        arg = prompt('во сколько это обойдется? ');     
      }

      appData.expenses[expenses] = +arg;
      expenses = 0;
      arg = 0;
    }
  },
  getExpensesMonth: function() {
  
    for( let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    
    return appData.expensesMonth;
  },
  getBudget: function() {
    appData.budgetMonth = appData.money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() {
    let roadToMission = Math.ceil(appData.mission / appData.budgetMonth);

    if(roadToMission <= 0 ) {
      return 'Цель не будет достигнута!';
    } else {
      return 'Цель будет достигнута за ' + roadToMission + ' месяцев';
    }
  },
  getStatusIncome: function() {
    if( appData.budgetDay > 800 ) {
      return 'Высокий уровень дохода';
    } else if( appData.budgetDay >= 300 && appData.budgetDay <= 800 ) {
      return 'Средний уровень дохода';
    } else if( appData.budgetDay >= 0 && appData.budgetDay <= 300 ) {
      return 'Низкий уровень дохода';
    } else if( appData.budgetDay < 0 ) {
      return 'Что-то пошло не так';
    }
  }
};

appData.asking();
appData.getBudget();

console.log('расходы за месяц: ', appData.getExpensesMonth());
console.log('Достижение цели за: ', appData.getTargetMonth());
console.log(appData.getStatusIncome());


function showObjInfo() {
  for( let key in appData ) {
    console.log('Наша программа включает в себя данные: ' + key);
  }
}

showObjInfo();



