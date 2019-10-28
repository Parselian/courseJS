/* УРОК №6 */

function start() {
  let money2;
  do {
    money2 = prompt('Введите ваш месячный доход:', '2500');
  } while( isNaN(money2) || money2 === '' || money2 === null );

  money2 = Number(money2);

  return money2;
}

let appData = {
  budget: start(),
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 10,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {

    if(confirm('У вас есть доп. заработок?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'мою полы в BlackStar burger'),
          cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 4000);

      while(!isNaN(itemIncome) || itemIncome === '' || itemIncome === null || isNaN(cashIncome) || cashIncome === '' || cashIncome === null) {
        itemIncome = null;
        cashIncome = null;
        alert('Введите корректные данные: доп.заработок - строка, прибыль в месяц - число!')
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'мою полы в BlackStar burger');
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', '4000');
      }

      while(!isNaN(itemIncome) || itemIncome === '' || itemIncome === null) {
        itemIncome = null;
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'мою полы в BlackStar burger');
      }

      cashIncome = Number(cashIncome);
      appData.income[itemIncome] = parseInt(cashIncome);

      // console.log('ITEMINCOME: ' + typeof(itemIncome));
      // console.log('CASHINCOME: ' + typeof(cashIncome));

    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', 'музыка, игры, качалка');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let expenses;

    for( let i = 0; i < 2; i++ ) {
      if( i === 0 ) {
        do {
          expenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'еда');
        } while(!isNaN(expenses) || expenses === '' || expenses === null);
      } else {
        do {
          expenses = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'еда');
        } while(!isNaN(expenses) || expenses === '' || expenses === null);
      } 

      let arg = 0;

      arg = prompt('во сколько это обойдется?', '3000');     
      while (isNaN(arg) || arg === '' || arg === null) {
        arg = 0;
        alert('пожалуйста, введите число!');
        arg = prompt('во сколько это обойдется?', '3000');     
      }

      arg = Number(arg);

      appData.expenses[expenses] = arg;

      // console.log('EXPENSES: ' + typeof(expenses));
      // console.log('ARGEXPENSES: ' + typeof(arg));

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
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);

  },
  getTargetMonth: function() {
    let roadToMission = Math.ceil(appData.mission / appData.budgetMonth);

    if( roadToMission <= 0 ) {
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
  },
  getInfoDeposit: function() {
    if(appData.deposit) {
      appData.percentDeposit = prompt('Введите годовой процент:', '9.4');
      appData.moneyDeposit = prompt('Какая сумма вложений?', '15000');

      while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null) {

        appData.percentDeposit = null;
        appData.moneyDeposit = null;
        alert('Введите числовые значения в обоих полях!!!!');
      }

      appData.percentDeposit = Number(appData.percentDeposit);
      appData.moneyDeposit = Number(appData.moneyDeposit);
    }
    // console.log('DEPOSITPERCENT' + typeof(appData.percentDeposit));
    // console.log('DEPOSITMONEY' + typeof(appData.moneyDeposit));      
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
console.log('расходы за месяц: ', appData.getExpensesMonth());
appData.getBudget();

console.log('Достижение цели за: ', appData.getTargetMonth());
console.log(appData.getStatusIncome());
appData.getInfoDeposit();
console.log('кальк: ', appData.calcSavedMoney());

function showObjInfo(obj) {
  for( let key in obj ) {
    if(typeof(obj[key]) == 'object') {
        console.log(key + ':');
      for (let key2 in obj[key]) {
        console.log( '   ' + key2 + ':' + obj[key][key2]);
      }
    } else {
      console.log(key + ':' + obj[key]);
    }
  }
}

function showExpensesString() {
  let arr = [];
  for(let i = 0; i < appData.addExpenses.length; i++) {
    arr[i] = appData.addExpenses[i].toUpperCase().slice(-0, 1) + appData.addExpenses[i].slice(1);
  }
  console.log(arr.join(', '));
}

showObjInfo(appData);
showExpensesString();


