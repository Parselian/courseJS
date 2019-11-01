let salaryAmount = document.querySelector('.salary-amount'),
		incomeItems = document.querySelectorAll('.income-items'),
		cloneIncomeItems = incomeItems[0].cloneNode(true),
    incomeAddBtn = document.querySelectorAll('button')[0],
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		cloneExpensesItems = expensesItems[0].cloneNode(true),
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
    allInputs = document.querySelectorAll('input[type="text"]');

    
    
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
			
			this.budget = +salaryAmount.value;
		
			this.getExpenses();
			this.getIncome();
			this.getExpensesMonth();
			this.getAddExpenses();
			this.getAddIncome();
			this.getBudget();    
			this.showResult();

			// console.log('this: ', this);

			cancel.style.display = 'block';
			start.style.display = 'none';
			allInputs.forEach(function(item) {
				if(item.classList.contains('result-total')) {
					item.disabled = false;
				} else {
					item.disabled = true;
				}
			});
		},
		showResult: function() {
			inputValues[0].value = this.budgetMonth;
			inputValues[1].value = this.budgetDay;
			inputValues[2].value = this.expensesMonth;
			inputValues[3].value = this.addIncome.join(', ');
			inputValues[4].value = this.addExpenses.join(', ');
			inputValues[5].value = this.calcSavedMoney();
			inputValues[6].value = this.getTargetMonth();
			
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

			for(let key in this.income) {
				this.incomeMonth += +this.income[key];
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
			this.deposit = confirm('Есть ли у вас депозит в банке?');

			if(this.deposit) {
				do {
					this.percentDeposit = prompt('Введите годовой процент:', '9.4');
				} while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
				do {
					this.moneyDeposit = prompt('Какая сумма вложений?', '15000');
				} while( isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);

				this.percentDeposit = Number(this.percentDeposit);
				this.moneyDeposit = Number(this.moneyDeposit);
			}
		},
		getExpensesMonth: function() {
		
			for( let key in this.expenses) {
				this.expensesMonth += +this.expenses[key];
			}
			
			return this.expensesMonth;
		},
		getBudget: function() {
			this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
			this.budgetDay = Math.floor(this.budgetMonth / 30);
		},
		getTargetMonth: function() {
			return Math.ceil(targetAmount.value / this.budgetMonth);
		},
		getStatusIncome: function() {
			if( this.budgetDay > 800 ) {
				return 'Высокий уровень дохода';
			} else if( this.budgetDay >= 300 && this.budgetDay <= 800 ) {
				return 'Средний уровень дохода';
			} else if( this.budgetDay >= 0 && this.budgetDay <= 300 ) {
				return 'Низкий уровень дохода';
			} else if( this.budgetDay < 0 ) {
				return 'Что-то пошло не так';
			}
		},
		calcSavedMoney: function() {
			return this.budgetMonth * periodSelect.value;
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
		},
		reset: function() {
			/* ОЧИЩАЕМ ОБЪЕКТ */
			for(let key in appData) {
			  if(typeof(appData[key]) !== 'object' && typeof(appData[key]) !== 'function') {
					// console.log(key + ":" + typeof(appData[key]));
					appData[key] = 0;
				} else if(typeof(appData[key]) === 'object' && !(Array.isArray(appData[key]))) {
					appData[key] = {};
				} else if( Array.isArray(appData[key]) ) {
					appData[key] = [];
				}
			}

			/* УДАЛЯЕМ ДОБАВЛЕННЫЕ БЛОКИ EXPENSES */
			let expenses = document.querySelector('.expenses');

			expensesItems.forEach(function(item) {
				if(item.className === 'expenses-items') {
					expenses.removeChild(item);
				} 
			});

			expensesAddBtn.style.display = 'block';
			expensesItems = [];
			expenses.insertBefore(cloneExpensesItems, expensesAddBtn);
			expensesItems = document.querySelectorAll('.expenses-items');

			/* УДАЛЯЕМ ДОБАВЛЕННЫЕ БЛОКИ INCOME */
			let income = document.querySelector('.income');

			incomeItems.forEach(function(item) {
				if(item.className === 'income-items') {
					income.removeChild(item);
				} 
			});

			incomeAddBtn.style.display = 'block';
			incomeItems = [];
			income.insertBefore(cloneIncomeItems, incomeAddBtn);
			incomeItems = document.querySelectorAll('.income-items');

			/* АКТИВИРУЕМ ИНПУТЫ */
			allInputs.forEach(function(item) {
				item.value = null;
				item.removeAttribute('disabled');
			});
			periodSelect.value = 1;
			periodAmount.textContent = periodSelect.value;
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
  
    expensesAddBtn.addEventListener('click', appData.getExpensesBlock);
    incomeAddBtn.addEventListener('click', appData.getIncomeBlock);

    periodSelect.addEventListener('input', function() {
      periodAmount.textContent = periodSelect.value;
    });  

    let bind = appData.start.bind(appData);

    salaryAmount.addEventListener('change', function() {
      if(salaryAmount === '' || salaryAmount === null) {
        start.disabled = true;
        start.removeEventListener('click', bind);
      } else if(salaryAmount !== '' || salaryAmount !== null) {
        start.disabled = false;
        start.addEventListener('click', bind);
      }
    });

    cancel.addEventListener('click', function() {
      appData.reset();
      cancel.style.display = 'none';
      start.style.display = 'block';
      start.removeEventListener('click', bind);
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
    