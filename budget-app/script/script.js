'use strict';

let expensesItems = document.querySelectorAll('.expenses-items'),
		incomeItems = document.querySelectorAll('.income-items');

const salaryAmount = document.querySelector('.salary-amount'),
			income = document.querySelector('.income'),
			cloneIncomeItems = incomeItems[0].cloneNode(true),
			incomeAddBtn = document.querySelectorAll('button')[0],
			expenses = document.querySelector('.expenses'),
			addIncomeItem = document.querySelectorAll('.additional_income-item'),
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
			data = document.querySelector('.data');



class AppData {
	constructor() {
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
	}

	start() {
		const incomeItems = document.querySelectorAll('.income-items');
		const expensesItems = document.querySelectorAll('.expenses-items');
		const addExpenses = addExpensesItem.value.split(',');

		this.budget = +salaryAmount.value;

		this.getCalculates(incomeItems, this.income, this.incomeMonth);
		this.getCalculates(expensesItems, this.expenses);
		this.getExpensesMonth();
		this.getAdds(addExpenses);
		this.getAdds(addIncomeItem);
		this.getInfoDeposit();
		this.getBudget();    
		this.showResult();

		const allInputs = document.querySelectorAll('input[type="text"]');
		cancel.style.display = 'block';
		start.style.display = 'none';
		allInputs.forEach((item) => {
			if(item.classList.contains('result-total')) {
				item.disabled = false;
			} else if(item.classList.contains('income-title') || item.classList.contains('income-amount')) {
				item.disabled = true;
			} else {
				item.disabled = true;
			}
		});

		incomeItems.forEach((item) => {
			const childs = item.childNodes;
			childs.forEach((item) => {
				if(item.type === 'text') {
					item.disabled = true;
				}
			});
		});

		expensesItems.forEach((item) => {
			const childs = item.childNodes;
			childs.forEach((item) => {
				if(item.type === 'text') {
					item.disabled = true;
				}
			});
		});
	}

	showResult() {
		inputValues[0].value = this.budgetMonth;
		inputValues[1].value = this.budgetDay;
		inputValues[2].value = this.expensesMonth;
		inputValues[3].value = this.addIncome.join(', ');
		inputValues[4].value = this.addExpenses.join(', ');
		inputValues[5].value = this.calcSavedMoney();
		inputValues[6].value = this.getTargetMonth();
		
		periodSelect.addEventListener('input', () => {
			inputValues[5].value = this.calcSavedMoney();
		});

		let counter = 0;
		inputValues.forEach((item) => {
			localStorage.setItem(counter, item.value);
			console.log(item.value);
			this.setCookie(counter, item.value, 2020, 11, 1);
			counter++;
		});	
		
	}

	getNewBlocks(e) {
		e = e.target;
		let newItems,
				itemsList,
				currBtn,
				childs;

		if( e === expensesAddBtn ) {
			newItems = expensesItems[0].cloneNode(true);
			itemsList = document.querySelectorAll('.expenses-items');
			currBtn = e;
		} else if( e === incomeAddBtn ) {
			newItems = incomeItems[0].cloneNode(true);
			itemsList = document.querySelectorAll('.income-items');
			currBtn = e;
		}

		childs = newItems.childNodes;
		
		for( let key in childs ) {
			if( childs[key].type === 'text' ) {
				childs[key].value = '';
			}
		}

		e.parentNode.insertBefore(newItems, currBtn);

		if( itemsList.length === 2 ) {
			currBtn.style.display = 'none';
		}
	}	

	getCalculates(items, currLoc, property) {
		let itemTitle,
			itemAmount;

		items.forEach( (item) => {
			if( item.classList.contains('income-items') ) {
				itemTitle = item.querySelector('.income-title').value;
				itemAmount = item.querySelector('.income-amount').value;
			} else if( item.classList.contains('expenses-items') ) {
				itemTitle = item.querySelector('input.expenses-title').value;
				itemAmount = item.querySelector('.expenses-amount').value;	
			}

			if( itemTitle !== '' && itemAmount !== '' ) {
				currLoc[itemTitle] = +itemAmount;
			}

		});

		if( property === this.incomeMonth ) {
			for(let key in this.income) {
					this.incomeMonth += +this.income[key];
					console.log(currLoc[key]);
				} 
		} else {
			return;
		}
		console.log(this);
	}

	getAdds(neededAdd) {
		neededAdd.forEach( (item) => {
			if( item !== '' && neededAdd === addIncomeItem ) {
				const itemValue = item.value.trim();
	
				if(item.value !== '') {
					this.addIncome.push(itemValue);
				}
			} else {
				item = item.trim();
				if(item !== '') {
					this.addExpenses.push(item);
				}
			}
		});
	}

	getInfoDeposit() {
		this.percentDeposit = depositPercent.value;
		this.moneyDeposit = depositAmount.value;
	}

	getExpensesMonth() {
		for( let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
		
		return this.expensesMonth;
	}

	getBudget() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}

	getStatusIncome() {
		if( this.budgetDay > 800 ) {
			return 'Высокий уровень дохода';
		} else if( this.budgetDay >= 300 && this.budgetDay <= 800 ) {
			return 'Средний уровень дохода';
		} else if( this.budgetDay >= 0 && this.budgetDay <= 300 ) {
			return 'Низкий уровень дохода';
		} else if( this.budgetDay < 0 ) {
			return 'Что-то пошло не так';
		}
	}

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	}

	reset() {
		const allInputs = document.querySelectorAll('input[type="text"]');
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
		let incomeItems = document.querySelectorAll('.income-items');	

		incomeItems.forEach( (item) => {
			const childs = item.childNodes;
			childs.forEach( (item) => {
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
		let expensesItems = document.querySelectorAll('.expenses-items');

		expensesItems.forEach( (item) => {
			const childs = item.childNodes;
			childs.forEach( (item) => {
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
		allInputs.forEach( (item) => {
			item.value = '';
			item.removeAttribute('disabled');
		});
		periodSelect.value = 1;
		periodAmount.textContent = periodSelect.value;
	}

	eventListeners() {
		data.addEventListener('input', (e) => {
			const target = e.target;
			if(target.placeholder === 'Наименование') {
				target.value = target.value.replace(/[^,.!:;?А-я\ ]/,'');
			} else if( target.placeholder === 'Сумма' ) {
				target.value = target.value.replace(/\D/g,'');
			}
		});
		
		expensesAddBtn.addEventListener('click', this.getNewBlocks);
		incomeAddBtn.addEventListener('click', this.getNewBlocks);
		
		periodSelect.addEventListener('input', () => {
			periodAmount.textContent = periodSelect.value;
		});  
		
		const bind = this.start.bind(this);
		
		salaryAmount.addEventListener('change', () => {
			if(salaryAmount === '' || salaryAmount === null) {
				start.disabled = true;
				start.removeEventListener('click', bind);
			} else if(salaryAmount !== '' || salaryAmount !== null) {
				start.disabled = false;
				start.addEventListener('click', bind);
			}
		});
	
		depositCheck.addEventListener('change', () => {
			if(depositCheck.checked) {
				depositBank.style.display = 'inline-block';
				depositAmount.style.display = 'inline-block';
				this.deposit = true;
				depositBank.addEventListener('change', function () {
					const selectIndex = this.options[this.selectedIndex].value;
					if ( selectIndex === 'other' ) {
						depositPercent.style.display = 'inline-block';
						depositPercent.value = '';
					} else {
						depositPercent.style.display = '';
						depositPercent.value = selectIndex;
					}
				});
			} else {
				this.deposit = false;
				depositBank.style.display = '';
				depositAmount.style.display = '';
				depositAmount.value = '';
			}
		});
		
		cancel.addEventListener('click', () => {
			this.reset();
			cancel.style.display = 'none';
			start.style.display = 'block';
			localStorage.clear();
			start.removeEventListener('click', bind);
		});
	}

	setCookie(key, value, year, month, day, domain, path, secure) {
		let cookieStr = `${encodeURI(key)}=${encodeURI(value)}`;

		if(year) {
			const expires = new Date(year, month-1, day);
			cookieStr += `; expires=${expires.toGMTString()}`;
		}

		cookieStr += domain ? `; domain=${encodeURI(domain)}` : ``;
		cookieStr += path ?  `; path=${encodeURI(path)}` : ``;
		cookieStr += secure ? `; secure` : ``;

		document.cookie = cookieStr;
		console.log(decodeURI(cookieStr));
	}
}

// const appData = new AppData();
const test = new AppData();

test.eventListeners();


function getLocalStorage() {
	let counter = 0;
	inputValues.forEach((item) => {
		item.value = localStorage.getItem(counter);
		counter++;
	});

	cancel.style.display = 'block';
	start.style.display = 'none';

	const allInputs = document.querySelectorAll('input[type="text"]');
	allInputs.forEach((item) => {
		if(item.classList.contains('result-total')) {
			item.disabled = false;
		} else if(item.classList.contains('income-title') || item.classList.contains('income-amount')) {
			item.disabled = true;
		} else {
			item.disabled = true;
		}
	});
}

getLocalStorage();

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
	const mainArr = appData.addExpenses,
			arr = [];

	mainArr.forEach(function(item) {
		arr[item] = mainArr[item].toUpperCase().slice(-0, 1) + mainArr[item].slice(1);
	});
	console.log(arr.join(', '));
}

// showObjInfo(appData);
// showExpensesString();