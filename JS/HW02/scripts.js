'use strict';



let userInput;
const numbers = [];
let total = 0;


do  {
    userInput = prompt ('Введите число в массив', '');
    const num = Number (userInput);
    const isValidInput = ((num !== null) && (!isNaN(num)));
    if (!isValidInput){
        alert ('Введите число!');
    } else{
    numbers.push (num);
    }
} while (userInput !== null);
  numbers.pop ();
  alert ( 'Введеные Вами числа ' +  numbers); 
for (let i = 0; i < numbers.length; i += 1){
    total += numbers [i];
}
alert(`Общая сумма чисел равна ${total}`);