      'use strict';

        // Исходные данные

        const clients = [{
            name: 'Филип Фрай',
            email: 'fray@mail.un',
            isSubscribed: false,
            orders: [ 11700, 1980, 450, 5500 ]
        }, 
        {
            name: 'Бендер Сгибатель Родригес',
            email: 'bender.rodriges@rambler.un',
            isSubscribed: true,
            orders: [ 440, 226, 7650, 2990, 70 ]
        },
        {
            name: 'Доктор Джон Зоидберг',
            email: 'zoidberg-md@list.un',
            isSubscribed: true,
            orders: [ 720 ]
        },];


        // Задача 1 

        clients.findByName = function(name) {
          return clients.find(client => client.name === name);
        }

        // clients.__proto__.findByName = findByName;

        const clientOne = clients.findByName('Доктор Джон Зоидберг');
        console.log(clientOne.email); 

        const clientTwo = clients.findByName('Люрр');
        console.log(typeof clientTwo); 


        // Статус: Сделал (осталось переписать в стрелочную функцию)

        console.log('\n');

        // Задача 2

        function compareByTotalSumm(left, right) {
          let leftValue = left.orders.reduce((accumulator, currentValue) => accumulator + currentValue);
          let rightValue = right.orders.reduce((accumulator, currentValue) => accumulator + currentValue);

          if(leftValue < rightValue) {
            return 1;
          } else if(leftValue === rightValue) {
            return 0;
          } else {
            return -1;
          }
        }

      clients
        .sort(compareByTotalSumm)
        .forEach(client => console.log(client.name));
      

      // Статус: сделал (не понял до конца как работает цепочка вызовов и передаются в функцию left и right)

      console.log('\n');

      // Задача 3

      function sendMail(email) {
        console.log(`Письмо отправлено на адрес ${email}`);
      }

      function getSubscribedEmails(list) {
        return list
          .filter(value => value.isSubscribed)
          .map(value => value.email);
      }

      getSubscribedEmails(clients).forEach(sendMail);

      // Статус: сделал