'use strict';

// Задача 1
const taxRate = 73;
let taxPaid = 0;

function sumTax (productPrice) {
  let taxPay;
  taxPay = productPrice / 100 * taxRate;
  taxPaid += taxPay;
    return `Налог с продаж (${taxRate})%, к оплате: ${taxPay} Q Всего выплачено налога: ${taxPaid} Q`;
}

console.log(sumTax(7000));
console.log(sumTax(10000));
console.log(sumTax(8000));

// Статус: Сделал

console.log('\n');

// Задача 2 
let giftWrap = 30;
let order;  
let result;                    

function pack(width, height, length) {
    order = length*width;  //Рассчитываем нужную площадь бумаги

    if (giftWrap >= order) {   //Проверяем, есть ли столько бумаги у нас в наличии?
       giftWrap = giftWrap - order; //Сколько останется после заказа
       result = console.log(`Заказ ${width}/${height}/${length} м упакован, осталось упаковочной бумаги ${giftWrap} м2`);
       return true;
    }
    else {
       result = console.log(`Заказ ${width}/${height}/${length} м  не упакован, осталось упаковочной бумаги ${giftWrap} м2`);
       return false;
    }
}

pack(2,3,6);
pack(2,3,8);
pack(1,3,10);

// Статус: сделал

console.log('\n');

// Задача 3

const battery = [7, 2, 1, 4, 8];
const counters = [];

for (let i = 0; i < battery.length; i++) {

  let teleportNumber, teleportValue;

  teleportNumber = i + 1;
  teleportValue = battery[i];

  function chargeCheck() {
     if (teleportValue > 1) {
       teleportValue -= 1;
       console.log(`Телепорт ${teleportNumber} использован, заряд — ${teleportValue} единиц`);
     } else if (teleportValue === 1) {
       teleportValue -= 1;
       console.log(`Телепорт ${teleportNumber} использован, заряд — ${teleportValue} единиц, требуется перезарядка!`);
     } else if (teleportValue === 0) {
       console.log(`Телепорт ${teleportNumber} недоступен, перезаряжается`);
     } 
  }
  counters.push(chargeCheck);
}

function teleportUse(number) {
  let execution = counters[number-1];
  return execution();
}

teleportUse(1);
teleportUse(1);
teleportUse(3);
teleportUse(4);
teleportUse(2);
teleportUse(3);

// Статус: сделал 