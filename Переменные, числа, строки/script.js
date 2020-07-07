'use strict';
// Задачи 1,2 
var productName, price;
productName = 'Телепорт бытовой VZHIH-101';
price = 10000;
console.log(`В наличии имеется: ${productName}`);
console.log(`Стоимость товара ${price} Q`);

// Задача 3 
var productNumber = 2;
var discount = 10;
var discountClient = price * productNumber / 100 * discount;
var paymentClient =  price * productNumber - discountClient;

console.log(`Цена покупки составит ${paymentClient} Q`);
console.log(discountClient);

// дополнительная задача 4 
var moneyAvailable = 52334224;
var purchasePrice = 6500;

var balance = moneyAvailable % purchasePrice;
var canBuy = Math.floor(moneyAvailable / purchasePrice);
console.log (`Мы можем закупить ${canBuy} единиц товара, после закупки на счету останется ${balance} Q`);