'use strict';
// Задача 1
var storageProducts,customerPurchase;

storageProducts = 200;
customerPurchase = 5;

if(customerPurchase > storageProducts) {
  console.log('На складе нет такого количества товаров.');
}
else if(customerPurchase === storageProducts) {
  console.log('Вы забираете весь товар c нашего склада!.');
}
else {
  console.log('Заказ оформлен.');
}

// Задача 2
var customerLocation;
var price;

customerLocation = 'Галактика Туманность Андромеды';

switch (customerLocation) {
  case 'Луна': 
  price = 150;
  console.log(`Стоимость доставки для области Луна ${price} + Q`)
  break;
  case 'Крабовидная туманность': 
  price = 250;
  console.log(`Стоимость доставки для области Крабовидная туманность ${price} Q`)
  break;
  case 'Галактика Туманность Андромеды': 
  price = 550;
  console.log(`Стоимость доставки для области Галактика Туманность Андромеды ${price} Q`)
  break;
  case 'Туманность Ориона': 
  price = 600;
  console.log(`Стоимость доставки для области Туманность Ориона ${price} Q`)
  break;
  case 'Звезда смерти': 
  price = 'договорная';
  console.log(`Стоимость доставки для области Звезда смерти: ${price}`)
  break;
  default: console.log('В ваш квадрант доставка не осуществляется')
}


// Задача 3 
var priceStorekeeper = "2";

try {
  if(typeof(priceStorekeeper) === "number") {
    console.log('Цена товара введена корректно'); 
    }
    // где ситуация когда в переменной не цена?
    else {
      throw `"${priceStorekeeper}" не является числом.`;
    }
} catch (err) { // нужно передавать в круглых скобках переменную ошибки
  console.log(`Введенные вами данные: ${err}`);
}


// Задача 4 
var planetResidence;
var age;

planetResidence = 'Юпитер';
age = 12;

if(planetResidence === 'Земля' && age < 18) {
  console.log('Вы не достигли совершеннолетия');
}
else if(planetResidence === 'Земля' && age >= 18) {
  console.log('Приятных покупок');
}
else if(planetResidence === 'Юпитер' && age < 120) {
  console.log('Чистого неба и удачных покупок!');
}
else {
  console.log('Спасибо, что пользуетесь услугами нашего магазина!');
}