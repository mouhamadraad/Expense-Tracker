const elements = {
  balance: document.getElementById("balance"),
  moneyPlus: document.getElementById("money-plus"),
  moneyMinus: document.getElementById("money-minus"),
  list: document.getElementById("list"),
  form: document.getElementById("form"),
  text: document.getElementById("text"),
  amount: document.getElementById("amount")
};

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(event) {
  event.preventDefault();

  const { text, amount } = elements;
  const textValue = text.value.trim();
  const amountValue = +amount.value.trim();

  if (!textValue || !amountValue) {
    alert('Please add text and amount');
    return;
  }

  const transaction = {
    id: generateID(),
    text: textValue,
    amount: amountValue
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
const { list } = elements;

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

  elements.balance.innerText = `$${total}`;
  elements.moneyPlus.innerText = `$${income}`;
  elements.moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function Init() {
  elements.list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

function fetchCurrencies() {
  fetch('https://rich-erin-angler-hem.cyclic.app/students/available')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch currencies');
      }
    })
    .then(data => {
      console.log('Available currencies:', data);
    
    })
    .catch(error => {
      console.error('Error fetching currencies:', error.message);
    });
}

function performCurrencyConversion() {
  const postData = {
    from: 'USD',  
    to: 'EUR',    
    amount: 100   
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  };

  fetch('https://rich-erin-angler-hem.cyclic.app/students/available', options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to convert currency');
      }
    })
    .then(data => {
      console.log('Conversion result:', data);
    
    })
.catch(error => {
      console.error('Error converting currency:', error.message);
    });
}


Init();


elements.form.addEventListener('submit', addTransaction);


fetchCurrencies();
performCurrencyConversion();
