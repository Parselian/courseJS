let salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    incomeAddBtn = document.querySelectorAll('button')[0],
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesAddBtn = document.querySelectorAll('button')[1],
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    inputValues = document.querySelectorAll('.result-total'),
    start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    periodAmount = document.querySelector('.period-amount'),
    data = document.querySelector('.data'),
    placeholderInputs = document.querySelectorAll('input[placeholder="Наименование"]');

    
    let appData = {
      budget: 0,
      income: {},
      incomeMonth: 0,
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      start: function() {

        appData.budget = +salaryAmount.value;
      
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();    

        appData.showResult();

        start.style.display = 'none';
        cancel.style.display = 'block';
        let allInputs = document.querySelectorAll('input[type="text"]');
        allInputs.forEach(function(item) {
          if(item.classList.contains('result-total')) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
        });
      },
      showResult: function() {
        inputValues[0].value = appData.budgetMonth;
        inputValues[1].value = appData.budgetDay;
        inputValues[2].value = appData.expensesMonth;
        inputValues[3].value = appData.addIncome.join(', ');
        inputValues[4].value = appData.addExpenses.join(', ');
        inputValues[5].value = appData.calcSavedMoney();
        inputValues[6].value = appData.getTargetMonth();
        
        periodSelect.addEventListener('input', function() {
          inputValues[5].value = appData.calcSavedMoney();
        });

      },
      getExpensesBlock: function() {
        let newExpensesItems = expensesItems[0].cloneNode(true),
            expensesChilds = newExpensesItems.childNodes;

        for(let key in expensesChilds) {
          if(expensesChilds[key].type === 'text') {
            expensesChilds[key].value = '';
          }
        }

        expensesItems[0].parentNode.insertBefore(newExpensesItems, expensesAddBtn);
        expensesItems = document.querySelectorAll('.expenses-items');

        if( expensesItems.length === 3 ) {
          expensesAddBtn.style.display = 'none';
        }
      },
      getExpenses: function() {
        expensesItems.forEach(function(item) {
          let itemExpenses = item.querySelector('input.expenses-title').value,
              cashExpenses = item.querySelector('.expenses-amount').value;

          if(itemExpenses !== 0 && cashExpenses !== 0 ) {
            appData.expenses[itemExpenses] = cashExpenses;
          }
        });
      },
      getIncome: function() {

        incomeItems.forEach(function(item) {
          let incomeTitle = item.querySelector('.income-title').value,
              incomeAmount = item.querySelector('.income-amount').value;

          if( incomeTitle !== '' && incomeAmount !== '' ) {
            appData.income[incomeTitle] = +incomeAmount;
          }
        });

        for(let key in appData.income) {
          appData.incomeMonth += +appData.income[key];
        }
      },
      getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');

        addExpenses.forEach(function(item) {
          item = item.trim();
          if(item !== '') {
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function() {
        addIncomeItem.forEach(function(item) {
          let itemValue = item.value.trim();

          if(item.value !== '') {
            appData.addIncome.push(itemValue);
          }
        });
      },
      getInfoDeposit: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    
        if(appData.deposit) {
          do {
            appData.percentDeposit = prompt('Введите годовой процент:', '9.4');
          } while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
          do {
            appData.moneyDeposit = prompt('Какая сумма вложений?', '15000');
          } while( isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
    
          appData.percentDeposit = Number(appData.percentDeposit);
          appData.moneyDeposit = Number(appData.moneyDeposit);
        }
        // console.log('DEPOSITPERCENT' + typeof(appData.percentDeposit));
        // console.log('DEPOSITMONEY' + typeof(appData.moneyDeposit));      
      },
      getExpensesMonth: function() {
      
        for( let key in appData.expenses) {
          appData.expensesMonth += +appData.expenses[key];
        }
        
        return appData.expensesMonth;
      },
      getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
      getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
      calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
      },
      getIncomeBlock: function() {
        let newIncomeItems = incomeItems[0].cloneNode(true),
            incomeChilds = newIncomeItems.childNodes;

        for(let key in incomeChilds) {
          if(incomeChilds[key].type === 'text') {
            incomeChilds[key].value = '';
          }
        }
        
        incomeItems[0].parentNode.insertBefore(newIncomeItems, incomeAddBtn);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3) {
          incomeAddBtn.style.display = 'none';
        }
      }
    };


    data.addEventListener('input', function(e) {
      let target = e.target;
      if(target.placeholder === 'Наименование') {
        target.value = target.value.replace(/[^,.!:;?А-я\ ]/,'');
      } else if( target.placeholder === 'Сумма' ) {
        target.value = target.value.replace(/\D/g,'');
      }
    });

    salaryAmount.addEventListener('input', function() {
      if(salaryAmount === '') {
        start.disabled = true;
        start.removeEventListener('click', appData.start());
      } else {
        start.disabled = false;
        start.addEventListener('click', appData.start);
      }
    });
    expensesAddBtn.addEventListener('click', appData.getExpensesBlock);
    incomeAddBtn.addEventListener('click', appData.getIncomeBlock);
    periodSelect.addEventListener('input', function() {
      periodAmount.textContent = periodSelect.value;
    });  
    
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
      let mainArr = appData.addExpenses,
          arr = [];

      mainArr.forEach(function(item) {
        arr[item] = mainArr[item].toUpperCase().slice(-0, 1) + mainArr[item].slice(1);
      });
      console.log(arr.join(', '));
    }
    
    // showObjInfo(appData);
    // showExpensesString();
    