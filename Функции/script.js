'use strict';

// Задача 1
function warranty(time) {
  if (time === 1) {
    return 1250 
  }
  else if(time === 2) {
    return 2300; 
  }
  else if (time > 2) {
    return NaN;
  }
  else {
    return 0;
  }
}

 console.log(`Дополнительное гарантийное обслуживание: ${warranty(3)} Q`); 


// Задача 2
var priceWordEngraving = 5;

function engraving(textEngraving) {
  if(textEngraving === null || textEngraving === undefined) {
    return 0;
  }
  else {
    var EngravingWords = textEngraving.split(' ');
    var numberOfWordsEngraved = EngravingWords.length;
    return numberOfWordsEngraved * priceWordEngraving;
  }
}

console.log(`Подарочная упаковка и гравировка: ${engraving('ART MAFIA')} Q `);


// Задача 3
function deliveryCustomer(customerAddress) {
    if(Boolean(customerAddress) === true) {
        switch (customerAddress) {
            case 'Москва': 
            return 150;
            break;
            case 'Нижний новгород': 
            return 250;
            break;
            case 'Орел': 
            return 550;
            break;
            case 'Воронеж': 
            return 600;
            break;
            case 'Сочи': 
            return 850;
            break;
            default:  return 'В такой регион доставка не осуществляется, либо данные введены не корректно';  
        }
    }
    else {
        return 0;
    }
}

console.log(`Цена доставки составляет: ${deliveryCustomer('Москва')} Q`);

