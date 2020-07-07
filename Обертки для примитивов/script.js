        'use strict';
    
        // Исходные данные
        function showSpecialPrice() {
            console.log('Введен секретный код. Все цены уменьшены вдвое!');
        }

    
        // Задача 1
    
        function fixAmount(amount) {
          amount = String(amount);
          if(!amount.search(/[1-9],[1-9]/)) {
            amount = amount.replace(',','.');
          }
          let parsed = parseFloat(amount);
          if(isNaN(parsed)) {
            return -1;
          } else {
            return parsed;
          }
        }

    
        const orders = [
            {price: 21, amount: 4},
            {price: 50, amount: '17 штук'},
            {price: 7, amount: '1,5 килограмма'},   
            {price: 2, amount: '2.7  метра'},   
            {price: 1, amount: 'семь единиц'},
        ];    
    
        for (let order of orders) {
        let result = fixAmount(order.amount);
        console.log(`Заказ на сумму: ${result * order.price} Q`);
    }
    
    // Статус: Сделал
    
    console.log('\n');

    // Задание 2

    let stringKeys = "";

    function handleKey(char) {
      const secretKey = 'r2d2';
      const start = -4;
      const end = 4;
      
      //складываем символы в строку
      stringKeys += char;
      // вырезаем 4 символа с конца строки и преобразуем к нижнему регистру
      if(stringKeys.substr(start,end).toLowerCase() === secretKey.toLowerCase()) {
        showSpecialPrice();
      } 
    }

    var keys = ['2', '4', 'R', '2', 'd', '2'];
    for (let key of keys) {
      handleKey(key);
    }
    
    // Статус: сделал
    
    console.log('\n');

    // Задание 3 

    function parseData(cellsNames, lines, separator = ',') {
      let resultData = [];
      
      for(let i = 0; i < lines.length; i++) {
        let res = lines[i].split(separator);
        let result = {};
        for(let y = 0; y < res.length; y++) {
          result[cellsNames[y]] = res[y];
          if(y === res.length - 1) {
            resultData.push(result);
          } 
        } 
      }
      return resultData;
    }

    const data = [
      '12,Телепорт бытовой VZHIH-101 ,17,10000',
      '77, Меч световой FORCE (синий луч), 2,57000'
    ];

    let items = parseData(['id', 'name', 'amount', 'price'], data);
    console.log(items);

    // Статус: сделал