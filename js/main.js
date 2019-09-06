let startBlock = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value'),
    expensesItem = document.getElementsByClassName('expenses-item'),
    allBtn = document.getElementsByTagName('button'),
    expensesItemBtn = allBtn[0],
    optionalexpensesBtn = allBtn[1],
    countBudgetBtn = allBtn[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    savings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    money,
    time;

expensesItemBtn.disabled = true;
optionalexpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

startBlock.addEventListener('click', function() {
    time = prompt("Введите сегодняшнюю дату?", "YYYY-MM-DD");
    money = +prompt("Какой у вас бюджет на месяц?", "0");       
    
    expensesItemBtn.disabled = false;
    optionalexpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    let dateUser = new Date(Date.parse(time));
    yearValue.value = dateUser.getFullYear();
    monthValue.value = dateUser.getMonth() + 1;
    dayValue.value = dateUser.getDay() + 1;
});

expensesItemBtn.addEventListener('click', function() {
    addExpense(expensesItem, "expenses", expensesItem.length, expensesValue, true);
});

optionalexpensesBtn.addEventListener('click', function() {
    addExpense(optionalexpensesItem, "optionalExpenses", optionalexpensesItem.length, optionalexpensesValue, false);
});

countBudgetBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - appData.expensesSum - appData.optionalExpensesSum) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Маленький уровень достатка!";
        } else if (appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка!";
        } else {
            levelValue.textContent = "Произошла ошибка в расчетах!";
        }
    }
    else {
        daybudgetValue.textContent = "Необходимо нажать кнопку 'Начать расчет'";
    }
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = items;    
});

savings.addEventListener('click', function() {
    appData.savings = savings.checked;
    if (!appData.savings) {
        monthsavingsValue.textContent = 0;
        yearsavingsValue.textContent = 0;
    }
});

chooseSum.addEventListener('input', function() {
    getMainSum();
});

choosePercent.addEventListener('input', function() {
    getMainSum();
});

function getMainSum() {
    let sumValue = +chooseSum.value,
        percentValue = +choosePercent.value;
    if (appData.savings) {
        if (sumValue != 0 && !sumValue.isNaN &&
            percentValue != 0 && !percentValue.isNaN) {
            appData.monthIncome = (sumValue/100/12*percentValue).toFixed();
            appData.yearIncome = (sumValue/100*percentValue).toFixed();
            monthsavingsValue.textContent = appData.monthIncome;
            yearsavingsValue.textContent = appData.yearIncome;
        }
        else {
            monthsavingsValue.textContent = 0;
            yearsavingsValue.textContent = 0;
        }
    }
}

let appData = {
    budget : money,
    timeData: time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings: false,
    expensesSum: 0,
    optionalExpensesSum: 0
};

function addExpense(inputField, nameVar, countExpense, inputFieldSum, expenseMain) {
    let expense;
    for (let i = 0; i < countExpense; i++) {         
        if (expenseMain) {
            expense = inputField[i].value;
            i++;
        }         
        else {
            expense = "Статья необязательных расходов - " + (i + 1);
        }
        let expenseSum = inputField[i].value;
    
        if ( (typeof(expense)) === 'string' && (typeof(expense)) != null && (typeof(expenseSum)) != null &&
                expense != '' && expenseSum != '' && expense.length < 50) {
            appData[nameVar][expense] = +expenseSum;
            appData[nameVar + "Sum"] += +expenseSum;
        }
    }
    inputFieldSum.textContent = appData[nameVar + "Sum"];
}