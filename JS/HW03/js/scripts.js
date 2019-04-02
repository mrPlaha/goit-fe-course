'use strict';



const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
let login = prompt ('Введите логин', '');


function isLoginValid (login) { 
 if (login.length < 4 || login.length > 16) {
 alert ('Ошибка! Логин должен быть от 4 до 16 символов');
   return false; 
}   
   return true;   
}
           
function isLoginUnique (logins, login) {
if (logins.includes (login)) {
alert ('Такой логин уже используется!');
return false;
} 
return true; 
}

function addLogin (login) {

 if (isLoginValid (login) && isLoginUnique ( logins, login)) {
  logins.push (login);
      alert ('Логин успешно добавлен!');
} 
}

addLogin (login);