        'use strict';

        //Задача 1

        // проверить на палиндром
        function isPolindrom(item) {
          let reverse =  item.split('').reverse().join('');
          return reverse === item;
        }

        function checkCoupon(code) {
          let reg = /[a-z0-9]/gi;
          let filterCode = code.match(reg).join('').toLowerCase();
          if(filterCode.length >= 10) {
            return isPolindrom(filterCode);
          } else {
              return false; 
            }
        }

        let codes = [ 
            'Madam, I’m Adam', 
            'A man, a plan, a canal. Panama', 
            '----<-------Eve------->-----', 
            '[__777-x-44-x-777__]', 
            '1234564321', 
            'Olson in Oslo' 
        ]; 

        for (let code of codes) { 
          let result = checkCoupon(code) ? 'подходит' : 'не подходит'; 
          console.log(`Код «${code}» ${result}`); 
        }


        // Статус: сделал


        console.log('\n');


        // Задача 2

        function stripTags(text) {
          let reg1 = /<[a-zA-Z]*>/gi;
          let reg2 = /<\/[a-zA-Z]*>/gi;

          let res1 = text.replace(reg1, '');
          let res2 = res1.replace(reg2, '');
          return res2;
        } 

        const texts = [ 
          '<strong>Наши</strong> <em>ховерборды</em> лучшие в <u>мире</u>!', 
          '<EM>Световой меч</EM> в <strong>каждый</strong> дом!' 
        ]; 

        for (let text of texts) { 
          console.log(stripTags(text)); 
        }

        // Статус: сделал (но возможно не лучшим решением)

        console.log('\n');

        // Задача 3

        const fields = [ 
          { name: 'name', rule: /^[a-z ]{5,}$/i }, 
          { name: 'email', rule: 'email' }, 
          { name: 'phone', rule: 'phone' }
        ]; 

        const forms = [ 
          { 
          name: 'Ivan Ivanov', 
          email: 'ivan@test.co', 
          phone: '+79212753690' 
          }, 
          { name: 'III', 
          email: 'ivan@test', 
          phone: '11111' 
          } 
        ]; 


        function validate(form, fields) {
          let reg = {
            name: /^[a-z ]{5,}$/i,
            email: /[a-zA-Z\d*]+@[a-z]+\.[a-z]+/g,
            phone: /\+79\d{9}|89\d{9}/g
          }
          for(let field of fields) {
            let property = field.name;
            for(let key in reg) {
              if(String(field.rule) === String(reg[key])) {
                return field.rule.test(form[property]);
              } else {
                  return reg[key].test(form[property]);
                }
            }   
          }  
        }

        for (let form of forms) { 
          console.log(form);
          if(validate(form, fields)) { 
            console.log('Ошибок нет'); 
          } else { 
              console.log('Форма заполнена неверно'); 
            } 
        } 

// Статус: сделал