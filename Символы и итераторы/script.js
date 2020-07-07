'use strict';

        class BarcodeGenerator 
        {
            constructor(size = 1)
            {
                this.size = size;
            }

            create() {
                var amount = this.size;
                let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + getFourNumber();

                if(generator[BarcodeGenerator.prefix] !== undefined) {
                    const hidden_prop = Symbol('prefix');
                    this[hidden_prop] = generator[BarcodeGenerator.prefix];
                    return `${this[hidden_prop]} - ${code}`;
                } else {
                    return `${code}`;
                }

                // Функционал получения числа длиной равное this.size
                function getFourNumber() {
                    var str = '1';
                    for(let i = 1; i < amount; i++) {
                        str += 0;
                    }
                    let number = Number(str);
                    return number;
                }
            }
        }

        const generator = new BarcodeGenerator(4);

        generator[BarcodeGenerator.prefix] = 'AA';
        console.log(generator.create());

        generator[BarcodeGenerator.prefix] = 'XX';
        console.log(generator.create());
        console.log(generator.create());
        console.log(generator.create());

        delete generator[BarcodeGenerator.prefix];
        console.log(generator.create());

        
        // Статус: сделал


        console.log('\n');


       // Задача 2 

        class HexRange
        {
            constructor(from, to) {
                this.from = from;
                this.to = to;
                this.__proto__[Symbol.iterator] = function() {
                    let current = this.from;
                    let last = this.to;

                    return {
                      next() {
                        var value;
                        if(current <= last) {
                          value = current.toString(16);
                          current++;
                          return {
                            done: false,
                            value: value
                          };
                        } else {
                            return {
                              done: true
                            };
                          }
                      }
                    }
                }
            }
        }

        let queue = new HexRange(247, 253);

        console.log(...queue);

        // Статус: сделал


        console.log('\n');


        // Задача 3

        class DateRange
        {
            constructor(from, to) {
                this.__proto__[Symbol.iterator] = function() {
                    let current = from;
                    let last = to; 

                    return {
                      next() { 
                        let currentCopy = new Date(current);

                        if(current.getDay() === 6) { 
                          current = new Date(current.setDate(current.getDate() + 3));
                          currentCopy = new Date(currentCopy.setDate(currentCopy.getDate() + 2));
                        } else if(current.getDay() === 0) {
                            current = new Date(current.setDate(current.getDate() + 2)); 
                            currentCopy = new Date(currentCopy.setDate(currentCopy.getDate() + 1));
                          } else {
                              current = new Date(current.setDate(current.getDate() + 1)); // следущий день
                            }


                        
                        if(currentCopy.getDate() <= last.getDate()) {
                            return {
                              done: false,
                              value: currentCopy
                            }; 
                        } else {
                            return {
                              done: true
                            };
                          }
                      }
                    }
                }
            }
        }


        const from = new Date(2017, 2, 13, 23, 59);
        const to = new Date(2017, 2, 21, 0, 1);

        let range = new DateRange(from, to);
        

        for (let day of range) {
          console.log(day.toLocaleDateString('ru-Ru'));
        }


        // Статус: Cделал