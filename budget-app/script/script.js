let salaryAmount = document.querySelector('.salary-amount'),
		income = document.querySelector('.income'),
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

    
const AppData = function() {

	this.budget = 0;
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];
	this.deposit = false;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
};

AppData.prototype.start = function() {
			
	this.budget = +salaryAmount.value;

	this.getExpenses();
	this.getIncome();
	this.getExpensesMonth();
	this.getAddExpenses();
	this.getAddIncome();
	this.getBudget();    
	this.showResult();

	cancel.style.display = 'block';
	start.style.display = 'none';
	allInputs.forEach(function(item) {
		if(item.classList.contains('result-total')) {
			item.disabled = false;
		} else if(item.classList.contains('income-title') || item.classList.contains('income-amount')) {
			item.disabled = true;
		} else {
			item.disabled = true;
		}
	});

	incomeItems.forEach(function(item) {
		let childs = item.childNodes;
		childs.forEach(function(item) {
			if(item.type = 'text') {
				item.disabled = true;
			}
		});
	});

	expensesItems.forEach(function(item) {
		let childs = item.childNodes;
		childs.forEach(function(item) {
			if(item.type = 'text') {
				item.disabled = true;
			}
		});
	});
};

AppData.prototype.showResult = function() {
	const _this = this;
	inputValues[0].value = this.budgetMonth;
	inputValues[1].value = this.budgetDay;
	inputValues[2].value = this.expensesMonth;
	inputValues[3].value = this.addIncome.join(', ');
	inputValues[4].value = this.addExpenses.join(', ');
	inputValues[5].value = this.calcSavedMoney();
	inputValues[6].value = this.getTargetMonth();
	
	periodSelect.addEventListener('input', function() {
		inputValues[5].value = _this.calcSavedMoney();
	});
};

AppData.prototype.getExpensesBlock = function() {
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
};

AppData.prototype.getExpenses = function() {
	let _this = this;
	expensesItems.forEach(function(item) {
		let itemExpenses = item.querySelector('input.expenses-title').value,
				cashExpenses = item.querySelector('.expenses-amount').value;

		if(itemExpenses !== 0 && cashExpenses !== 0 ) {
			_this.expenses[itemExpenses] = cashExpenses;
		}
	});
};

AppData.prototype.getIncome = function() {
	let _this = this;
	incomeItems.forEach(function(item) {
		let incomeTitle = item.querySelector('.income-title').value,
				incomeAmount = item.querySelector('.income-amount').value;

		if( incomeTitle !== '' && incomeAmount !== '' ) {
			_this.income[incomeTitle] = +incomeAmount;
		}
	});

	for(let key in this.income) {
		this.incomeMonth += +this.income[key];
	}
};

AppData.prototype.getAddExpenses = function() {
	let addExpenses = addExpensesItem.value.split(','),
			_this = this;

	addExpenses.forEach(function(item) {
		item = item.trim();
		if(item !== '') {
			_this.addExpenses.push(item);
		}
	});
};

AppData.prototype.getAddIncome = function() {
	let _this = this;
	addIncomeItem.forEach(function(item) {
		let itemValue = item.value.trim();

		if(item.value !== '') {
			_this.addIncome.push(itemValue);
		}
	});
};

AppData.prototype.getInfoDeposit = function() {
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
};

AppData.prototype.getExpensesMonth = function() {

	for( let key in this.expenses) {
		this.expensesMonth += +this.expenses[key];
	}
	
	return this.expensesMonth;
};

AppData.prototype.getBudget = function() {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
	return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() {
	if( this.budgetDay > 800 ) {
		return 'Высокий уровень дохода';
	} else if( this.budgetDay >= 300 && this.budgetDay <= 800 ) {
		return 'Средний уровень дохода';
	} else if( this.budgetDay >= 0 && this.budgetDay <= 300 ) {
		return 'Низкий уровень дохода';
	} else if( this.budgetDay < 0 ) {
		return 'Что-то пошло не так';
	}
};

AppData.prototype.calcSavedMoney = function() {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getIncomeBlock = function() {
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
};

AppData.prototype.reset = function() {
	/* ОЧИЩАЕМ ОБЪЕКТ */
	for(let key in this) {
		if(typeof(this[key]) !== 'object' && typeof(this[key]) !== 'function') {
			this[key] = 0;
		} else if(typeof(this[key]) === 'object' && !(Array.isArray(this[key]))) {
			this[key] = {};
		} else if( Array.isArray(this[key]) ) {
			this[key] = [];
		}
	}

	/* УДАЛЯЕМ ДОБАВЛЕННЫЕ БЛОКИ INCOME */
	// let income = document.querySelector('.income');

	incomeItems.forEach(function(item) {
		let childs = item.childNodes;
		childs.forEach(function(item) {
			if(item.type === 'text') {
				item.disabled = false;
				item.value = '';
			}
		});
		if(item.className === 'income-items') {
			item.remove();
		} 
	});

	incomeAddBtn.style.display = 'block';
	incomeItems = [];
	income.insertBefore(cloneIncomeItems, incomeAddBtn);
	incomeItems = document.querySelectorAll('.income-items');

	/* УДАЛЯЕМ ДОБАВЛЕННЫЕ БЛОКИ EXPENSES */
	let expenses = document.querySelector('.expenses');

	expensesItems.forEach(function(item) {
		let childs = item.childNodes;
		childs.forEach(function(item) {
			if(item.type === 'text') {
				item.disabled = false;
				item.value = '';
			}
		});
		if(item.className === 'expenses-items') {
			item.remove();
		} 
	});

	expensesAddBtn.style.display = 'block';
	expensesItems = [];
	expenses.insertBefore(cloneExpensesItems, expensesAddBtn);
	expensesItems = document.querySelectorAll('.expenses-items');

	/* АКТИВИРУЕМ ИНПУТЫ */
	allInputs.forEach(function(item) {
		item.value = '';
		item.removeAttribute('disabled');
	});
	periodSelect.value = 1;
	periodAmount.textContent = periodSelect.value;
};

AppData.prototype.eventListeners = function() {
	let _this = this;
	data.addEventListener('input', function(e) {
		let target = e.target;
		if(target.placeholder === 'Наименование') {
			target.value = target.value.replace(/[^,.!:;?А-я\ ]/,'');
		} else if( target.placeholder === 'Сумма' ) {
			target.value = target.value.replace(/\D/g,'');
		}
	});
	
	expensesAddBtn.addEventListener('click', _this.getExpensesBlock);
	incomeAddBtn.addEventListener('click', _this.getIncomeBlock);
	
	periodSelect.addEventListener('input', function() {
		periodAmount.textContent = periodSelect.value;
	});  
	
	let bind = _this.start.bind(_this);
	
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
		_this.reset();
		cancel.style.display = 'none';
		start.style.display = 'block';
		start.removeEventListener('click', bind);
	});
};

const appData = new AppData();
appData.eventListeners();
// console.log('appData: ', appData);



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