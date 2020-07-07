'use strict';

// Исходные данные 
var positions = [
  'Телепорт бытовой VZHIH-101',
  'Отвертка ультразвуковая WHO-D',
  'Ховерборд Mattel 2016',
  'Нейтрализатор FLASH black edition',
  'Меч световой FORCE (синий луч)'
];

var prices = [
  10000,
  4800,
  9200,
  2500,
  57000
];

var hitName = positions[2], hitPrice = prices[2];


// Задача 1
var hit = {
  name: hitName,
  price: hitPrice
}

console.log(`Хит продаж мартобря: <${hit.name}> цена ${hitPrice} Q`);  

//Статус: сделал

console.log('\n');

// Задача 2 
var items = [];

var teleport = {name: positions[0], price: prices[0] };
var screwdriver = {name: positions[1], price: prices[1]};
var hoverboard = {name: positions[2], price: prices[2]};
var neutralizer = {name: positions[3], price: prices[3]};
var sword = {name: positions[4], price: prices[4]};

items.push(teleport,screwdriver,hoverboard,neutralizer,sword);

console.log(`Купите ${items[4].name} по цене ${items[4].price} Q` );

// Статус: сделал

console.log('\n');

// Задача 3 
function showDiscount(product, number) {
  let productName = items[product]['name'];      //Имя товара
  let productPrice = items[product]['price'];    //Обычная цена
  let discount;                                  // Размер скидки
  
  if (number > 0 && number < 10) { 
      discount = 5;
  } else if (number >= 10 && number < 50 ) {
        discount = 7;
  } else if (number >= 50 && number < 100 ) {
        discount = 10;
  } else if (number >= 100) {
        discount = 15;
  } else {
        console.log('Такого количества товара на складе нету, либо вы ввели некорректые данные');
       }

  let benefit = productPrice * number / 100 * discount; // Выгода
  let discountPrice = productPrice * number - benefit; // Цена со скидкой
  
  return console.log(`${productName} — стоимость партии из ${number} штук ${discountPrice} Q (скидка ${discount} %), ваша выгода ${benefit} Q!`);
} 

showDiscount(0, 12);
showDiscount(3, 97);

// Статус: сделал

console.log('\n');

// Задача 4 
items[3].amount = 4;

function updateAmount(product, number = 1) {
  if(!(product['amount'])) {
      return;
  } else if(product.amount === 0 || product.amount < number) {
    console.log(`${product.name} закончился на складе`);
  } else if (product.amount > number) {
    product.amount -= number;
    console.log(`${product.name} - остаток ${product.amount}`);
  } else {
    console.log(`Это был последний ${product.name}, вам повезло!`);
  }
}

updateAmount(items[1], 17);
updateAmount(items[3], 3);
updateAmount(items[3]);

// Статус: сделал