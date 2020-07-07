'use strict'

        const items = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    available: 7,
    holded: 0
  },
  {
    title: 'Ховерборд Mattel 2016',
    available: 4,
    holded: 5
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    available: 1, 
    holded: 1
  }
];

// Задача 1

// Исходные данные
const itemPrototype = {
  sell(field, amount = 1) {
    console.log(this[field]);
    if (this[field] < amount) {
      throw `Недостаточно товара для продажи (${this[field]} из ${amount})`
    }
    this[field] -= amount;
    return true;
  },
  sellHolded(amount = 1) {
    return itemPrototype.sell.call(this, 'holded', amount);
  },
  sellAvailable(amount = 1) {
    return itemPrototype.sell.call(this, 'available', amount);
  }
};


// Решение
function sellItem(item, amount, isHolded = false) {
  if(isHolded === false) {
    var sellAvailableBind = itemPrototype.sellAvailable.bind(items[items.indexOf(item)]);
    sellAvailableBind(amount);
  } else if (isHolded === true) {
    var sellHoldedBind = itemPrototype.sellHolded.bind(items[items.indexOf(item)]);
    sellHoldedBind(amount);
  }
  
}

sellItem(items[0], 5);
// console.log(items[0].available);
// console.log(items[0].holded);

// Статус: Сделал


// Задача 2 

// Исходные данные
function formatFull() {
  return `${this.title}:\n\tдоступно ${this.available} шт.\n\tв резерве ${this.holded} шт.`;
}

function formatLite() {
  return `${this.title} (${this.available} + ${this.holded})`;
}

function show(format) {
  console.log(format());
}

// Решение
function showItems(list, formatter) {
  for(let i = 0; i < list.length; i++) {
    let formatterItem = formatter.bind(list[i]);
    show(formatterItem);
  }
}

showItems(items, formatFull); 

// Статус: сделал


// Задача 3

function createButton(title, onclick) {
  return {
    title,
    onclick,
    click() {
    this.onclick.call(this);
    }
  };
}

function result() {
    console.log(`${this.title} добавлен в корзину`);
  }

function createBuyButtons(items) {
  let itemsClick = [];
  for(let i = 0; i < items.length; i++) {
   itemsClick.push(createButton.call(items[i], 'Купить', result.bind(items[i])));
  //  itemsClick[i].onclick.bind(items[i]);
  }
  return itemsClick; 
}

const buttons = createBuyButtons(items);

buttons[0].click();
buttons[2].click();
buttons[1].click();

// Статус: Сделал