 'use strict';

// Исходные данные
    let positions = [
{
title: 'Телепорт бытовой VZHIH-101',
producer: {
  name: 'Рязанский телепортостроительный завод',
  deferPeriod: 10,
  lot: 3
},
price: 10000
},
{
title: 'Ховерборд Mattel 2016',
producer: {
  name: 'Волжский Ховерборд Завод',
  deferPeriod: 24,
  lot: 14
},
price: 9200
},
{
title: 'Меч световой FORCE (синий луч)',
producer: {
  name: 'Тульский оружейный комбинат',
  deferPeriod: 5,
  lot: 1
},
price: 57000
}
];

// Задание 1 

const data = {
lots: 0,
total: 0
}

function lotCalculator(product, number) {
let parts;
let price;
let lot = product.producer.lot;
  if(number > 0 && number <= lot) {
      parts = 1;
  } else if(number > lot) {
      parts = Math.ceil(number / lot);
  } else {
      console.log('Ошибка');
  }
price = parts * lot * product.price;
data.lots += parts;
data.total += price;
return `${product.title} ${number} штук: заказать партий  ${parts}, стоимость ${price}`;
}

let result1 = lotCalculator(positions[0], 15);
console.log(result1); 

let result2 = lotCalculator(positions[1], 21);
console.log(result2); 

let result3 = lotCalculator(positions[2], 25);
console.log(result3); 

// Статус: Сделал


// Задача 2

const deferedPayments = [];

function deferPay(producer, amount, shipmentDate) {
//Вычислить дату платежа
let shipmentDateSec = Date.parse(shipmentDate);                    // Преобразовываем дату отгрузки во временную метку
let deferPeriodSec = producer.deferPeriod * 24 * 60 * 60 * 1000;   // Отсрочка дней в милисекундак
let paymentDateSec = shipmentDateSec + deferPeriodSec;             // Получаем дату платежа в милисекундах
let paymentDate = new Date(paymentDateSec);                        //Преобразуем формат даты
paymentDate = paymentDate.toLocaleDateString('ru-Ru');            // Выводим в определенном формате дату

const data = {};
data.producer = producer;
data.paymentDate = paymentDate;
data.amount = amount;

deferedPayments.push(data);
}

deferPay(positions[0].producer, 7200, new Date(2019, 2, 16, 17, 16, 42));
deferPay(positions[1].producer, 2100, new Date(2019, 2, 16, 11, 14, 42));
deferPay(positions[2].producer, 12000, new Date(2017, 8, 29, 13, 14, 42));

console.log(`${deferedPayments[0].paymentDate}: ${deferedPayments[0].producer.name}, сумма ${deferedPayments[0].amount}`);
console.log(`${deferedPayments[1].paymentDate}: ${deferedPayments[1].producer.name}, сумма ${deferedPayments[1].amount}`);
console.log(`${deferedPayments[2].paymentDate}: ${deferedPayments[2].producer.name}, сумма ${deferedPayments[2].amount}`);

// Статус: сделал

// Задание 3 

// Исходные данные
function loadCurrencyJSON() { return '{"AUD":44.95,"AZN":33.73,"GBP":73.42,"AMD":0.12,"BYN":30.96,"BGN":32.01, "BRL":18.8,"HUF":0.2,"DKK":8.42,"USD":58.85,"EUR":62.68,"INR":0.88,"KZT":0.18, "CAD":44.74,"KGS":0.85,"CNY":8.55,"MDL":2.94,"NOK":7.02,"PLN":14.55,"RON":13.92, "ZZZ":79.91,"SGD":41.36,"TJS":7.43,"TRY":15.97,"TMT":16.84,"UZS":0.02,"UAH":2.16, "CZK":2.32,"SEK":6.6,"CHF":58.69,"ZAR":4.4,"KRW":0.05,"JPY":0.52}'; }

// Функция конвертирования
function convertCurrency (amount, from, to) {
    try {
      var jsObject = JSON.parse(loadCurrencyJSON());
    } catch(err) {
        console.log(err);
      }

    // Расчет
    var result = (amount * jsObject[from]) / jsObject[to];
    result = Math.ceil((result) * 100) / 100;
    return result;
}

 
  let price1 = convertCurrency(7000, 'ZZZ', 'USD');
  console.log(`Сумма ${price1} USD`);
// Сумма 9505.01 USD

  let price2 = convertCurrency(790, 'EUR', 'ZZZ');
  console.log(`Сумма ${price2} ZZZ`);

  let price3 = convertCurrency(1000, 'AMD', 'RON');
  console.log(`Сумма ${price3} RON`);

// Статус: сделал