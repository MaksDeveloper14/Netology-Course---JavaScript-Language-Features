'use strict';

class Calendar { 
  constructor(now = new Date()) { 
    this.now = now; 
  } 

  setDate(now) {
    this.now = now;
  }

  get today() { 
    return this.now.toLocaleString('ru-Ru'); 
  } 
} 

class PaymentTerminal { 
  constructor(title, calendar) { 
    this.title = title; 
    this.calendar = calendar; 
  } 

  get status() { 
    return this.isActive ? 'работает' : 'недоступен'; 
  } 

  get isActive() { 
    return this.checkActive(); 
  } 

  checkActive() { 
    return false; 
  } 
}

class RegistrationError extends Error { 
  constructor(field = null) { 
    super(`Ошибка в поле ${field}`); 
    this.field = field; 
  } 
} 

class NotValidEmailRegistrationError extends RegistrationError { 
  constructor(field, email) { 
    super(field); 
    this.email = email; 
  } 
} 

class NotUniqueRegistrationError extends RegistrationError { 
  constructor(field, value) { 
    super(field); 
    this.value = value; 
  } 
} 

class NotSameRegistrationError extends RegistrationError {} 

function isValidEmail(email) { 
  return /^\w+(\.\w+)*@\w+(\.\w+)+$/i.test(email); 
} 

function isUniqueLogin(login) { 
  return !['admin', 'boss'].includes(login); 
} 

function checkPassword(original, copy) { 
  return original === copy; 
} 

function registerNewUser(data) { 
  if (!isValidEmail(data.email)) { 
    throw new NotValidEmailRegistrationError('Адрес электронной почты', data.email); 
  } 
  if (!isUniqueLogin(data.login)) { 
    throw new NotUniqueRegistrationError('Логин', data.login); 
  } 
  if (!checkPassword(data.password, data.passwordCopy)) { 
    throw new NotSameRegistrationError('Пароль'); 
  } 
} 

// Задание 1 

class SpaceDate extends Date { 
  copy() { 
    return new SpaceDate(this); 
  } 

  getNextDate() { 
    const date = this.copy();
    return new SpaceDate(date.setDate(date.getDate() + 1));
  } 

  getPrevDate() {
    const date = this.copy();
    return new SpaceDate(date.setDate(date.getDate() - 1));
  } 

  getDayBeginning() { 
    const date = this.copy();
    date.setHours(0, 0, 0, 0);
    return date; 
  } 

  getDayEnd() { 
    const date = this.copy();
    date.setHours(23,59,59,999);
    return date;
  } 
} 

// Пример использования

let dateOriginal = new SpaceDate(2017, 1, 22);
let dateCopy = dateOriginal.copy(); 
dateCopy.setYear(2040); 
console.log(`Оригинальная дата: ${dateOriginal.toLocaleDateString('ru-Ru')}`); 
console.log(`Измененная копия: ${dateCopy.toLocaleDateString('ru-Ru')}`); 

let orderDate = new SpaceDate(2017, 2, 10); 
let deliveryDate = orderDate.getNextDate(); 
console.log(`Дата заказа: ${orderDate.toLocaleDateString('ru-Ru')}`); 
console.log(`Дата доставки: ${deliveryDate.toLocaleDateString('ru-Ru')}`); 

let supplyDate = new SpaceDate(2017, 3, 3); 
let requestDate = supplyDate.getPrevDate(); 
console.log(`Дата поставки: ${supplyDate.toLocaleDateString('ru-Ru')}`); 
console.log(`Дата заявки поставщику: ${requestDate.toLocaleDateString('ru-Ru')}`); 

let someDate = new SpaceDate(2017, 2, 10, 12, 44); 
let from = someDate.getDayBeginning(); 
let to = someDate.getDayEnd(); 
console.log(`В любое время с ${from.toLocaleString('ru-Ru')} по ${to.toLocaleString('ru-Ru')}`); 

// Статус: сделал


console.log('\n');

// Задание 2 

// class WorkspacePaymentTerminal  extends PaymentTerminal {
//   checkActive() {
//     let day = this.calendar.now.getDay();
//     let hours = this.calendar.now.getHours();
//     if(day === 6 || day === 0) {
//       return false;
//     } else if(hours >= 18 || hours < 8) {
//         return false;
//       } else {
//           return true;  
//         }
//   }
// }

// Второй вариант реализации  класса 

class WorkspacePaymentTerminal extends PaymentTerminal {
  checkActive() {
    const day = this.calendar.now.getDay();
    const hours = this.calendar.now.getHours();

    return day !== 0 && day !== 6 && hours >= 8 && hours < 18;
  }
}

class AllDayPaymentTerminal extends PaymentTerminal {
  checkActive() {
    return true;
  }
}


class AllDayExceptHolidaysPaymentTerminal extends PaymentTerminal {
  constructor(title, calendar, holidays) {
    super(title, calendar);
    this.holidays = holidays;
  }
  checkActive() {
    let date = this.calendar.now.getDate();
    let month = this.calendar.now.getMonth();
    
    for(let holiday of holidays) {
      if(date === holiday.date &&  month === holiday.month) {
        return false;
      }
    }
    return true;
  }
}

// Пример использования

const holidays = [ 
{ date: 11, month: 3 - 1 }, 
{ date: 23, month: 2 - 1 } 
]; 


const calendar = new Calendar(); 
calendar.setDate(new Date(2017,2,22)); 

const terminals = [ 
new WorkspacePaymentTerminal('Терминал в офисе Убербанка', calendar), 
new AllDayPaymentTerminal('Терминал в аэропорту', calendar), 
new AllDayExceptHolidaysPaymentTerminal('Терминал в торговом центре', 
calendar, holidays) 
]; 

function showTerminals(date) {
if (date !== undefined) { 
calendar.setDate(date); 
} 
console.log(calendar.today);  
terminals 
.filter(terminal => terminal instanceof PaymentTerminal) 
.forEach(terminal => console.log(`${terminal.title} ${terminal.status}`)); 
} 

showTerminals(new Date(2017, 2 - 1, 23)); 
showTerminals(new Date(2017, 3 - 1, 11)); 
showTerminals(new Date(2017, 3 - 1, 14, 18, 1)); 
showTerminals(new Date(2017, 3 - 1, 14, 8, 3));


// Статус: сделал


console.log('\n');


// Задача 3


function handleRegistration(data) {
  try {
    registerNewUser(data);
    console.log('Пользователь успешно зарегистрирован');
  } catch(e) {
      if(e instanceof NotValidEmailRegistrationError) {
        console.log(`${data.email} не является адресом электронной почты`);
      } 
      if(e instanceof NotUniqueRegistrationError) {
        console.log(`Пользователь с логином ${data.login} уже зарегистрирован`);
      } 
      if(e instanceof NotSameRegistrationError) {
        console.log(`Введенные пароли не совпадают`);
      }
    }
      
}


const notValidEmailUser = { email: 'test' };
handleRegistration(notValidEmailUser);

const notUniqueLoginUser = { email: 'test@test.co', login: 'boss' };
handleRegistration(notUniqueLoginUser);

const differentPwUser = { email: 'test@test.co', login: 'ivan', password: '123', passwordCopy: '456' };
handleRegistration(differentPwUser);

const normalUser = { email: 'test@test.co', login: 'ivan', password: '123', passwordCopy: '123' };
handleRegistration(normalUser);



// Статус: сделал