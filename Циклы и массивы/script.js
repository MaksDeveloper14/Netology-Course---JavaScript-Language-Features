'use strict';

// Задача 1
var positions = [
  'Отвертка ультразвуковая WHO-D',
  'Ховерборд Mattel 2016',
  'Нейтрализатор FLASH black edition',
  'Меч световой FORCE (синий луч)',
  'Машина времени DeLorean',
  'Репликатор домашний STAR-94',
  'Лингвенсор 000-17',
  'Целеуказатель электронный WAY-Y'
]

var arrayLength = positions.length;
console.log('Список наименований:');

for (var i = 0; i < arrayLength; i++) {
  console.log(`${i + 1} ${positions[i]}`);
}

// Задача 2
positions.push('Экзоскелет Trooper-111', 'Нейроинтерфейс игровой SEGUN', 'Семена дерева Эйва');

var arrayLength = positions.length;
console.log('\n Окончательный список наименований:');

for (var i = 0; i < arrayLength; i++) {
  console.log(`${i + 1} ${positions[i]}`);
}

// Задача 3
var productIndex = positions.indexOf('Машина времени DeLorean');
var delNumbers = positions.splice(productIndex, 1);
var preOrder = delNumbers[0];
positions.unshift(preOrder);

console.log('\n Принять в первую очередь:');
for (var i = 0; i < 3; i++) {
  console.log(`${i + 1} ${positions[i]}`);
}


