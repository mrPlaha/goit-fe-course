const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const putOnCancel = 'Отменено пользователем!';
const passwordOk = 'Добро пожаловать!';
const passwordError = 'Доступ запрещен, неверный пароль!';
const loginError = 'Доступ запрещен, неверный логин!';   
 


const login = prompt ('Введите логин', '');
    if (login == adminLogin ){
    const password = prompt ('Введите пароль', '');
        if (password == adminPassword ){
               alert (passwordOk);
       } else if( password ===null ){
              alert(putOnCancel); 
       } else {
              alert (passwordError);
       }
} else if ( login ===null ){
  alert (putOnCancel);
} else {
 alert (loginError);
}