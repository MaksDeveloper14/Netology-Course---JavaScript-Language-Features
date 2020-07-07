        'use strict'

// ИСХОДНЫЕ ДАННЫЕ

    var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    price: 10000,
    discount: 7,
    available: 3
  },
  {
    title: 'Ховерборд Mattel 2016',
    price: 9200,
    discount: 4,
    available: 14
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    price: 57000,
    discount: 0,
    available: 1
  }
];


// КОД НАПИСАННЫЙ КОЛЛЕГОЙ

const itemPrototype = {
  hold(amount = 1) {
    if (this.available < amount) {
      return false;
    }
    this.available -= amount;
    this.holded += amount;
    return true;
  },
  toString() {
    return `${this.title} (остаток ${this.available}, в резерве ${this.holded})`;
  }
};

function createItem(title, amount) {
  const item = Object.create(itemPrototype);
  item.title = title;
  item.available = amount;
  item.holded = 0;
  return item;
}

const items = [];
for (let item of positions) {
  items.push(createItem(item.title, item.available));
}



// ВЫПОЛНЕНИЕ

// Задание 1

    function unhold(amount) {
       if(amount > this.holded) {
         return false;
       } else if(amount === undefined) {
          this.available += this.holded;
          this.holded -= this.holded;
          return true;
         }
       this.holded -= amount;
       this.available += amount;
       return true;
    }

    // в прототип записать функцию unhold
    itemPrototype.unhold = unhold;

    console.log(itemPrototype);

    items[0].hold(2);
    items[0].unhold();


    for (var item of items) {
      console.log(`Товар ${item}`);
    }
    
// Статус: сделал 

    console.log('\n');

  //Задание 2

  // Дескриптор доступа
  const config = {
    get() {
      // Получить финальную цену
      function finalPrice() {
        let finalPrice = this.price - (this.price / 100 * this.discount);
        return finalPrice;
      }
      return finalPrice.call(this);
    },
    set(newFinalPrice) {
      let discount = (this.price - newFinalPrice) / 100;
      if(newFinalPrice <= this.price) {
        return this.discount = discount;
      } else {
          console.error('Цена со скидкой не может быть больше первоначальной цены');
        }
    }
  }     

  for(let product of positions) {
     Object.defineProperty(product, 'finalPrice', config);
     console.log(product);
  }

console.log(positions[0].price); 
console.log(positions[0].discount); 
console.log(positions[0].finalPrice); 

positions[0].finalPrice = 8700;

console.log(positions[0].price); 
console.log(positions[0].discount); 
console.log(positions[0].finalPrice); 

//Статус: сделал

    console.log('\n');

// Задание 3

    const requiredFields = ['title', 'price', 'discount'];

    function isValidPosition(product, properties) {
      for(let i = 0; i < requiredFields.length; i++) {
      // console.log(requiredFields[i]);
        if(!product.hasOwnProperty(requiredFields[i])) {
          return false;
        }
      }
      return true;
    }

    console.log(isValidPosition(positions[0], requiredFields));

    // Статус: сделал