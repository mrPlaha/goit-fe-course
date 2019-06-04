'use strict';
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/


const start = document.querySelector('.js-start');
const lap = document.querySelector('.js-take-lap');
const reset = document.querySelector('.js-reset');
reset.disabled = true;
const time = document.querySelector('.js-time');
const lapsList = document.querySelector('.js-laps');
let startTime;
  let timerId;
   let deltaTime=0;
   const laps = [];
start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);
lap.addEventListener('click', takeLap);
function startTimer() {
  reset.disabled = false;
  if (start.classList.contains('started')) {
    clearInterval(timerId);
    start.textContent = 'Continue';
    start.classList.remove('started');
    return;
  }
  start.textContent = 'Pause';
  start.classList.add('started');
  startTime = Date.now() - deltaTime;
  timerId = setInterval(() => {
    deltaTime = Date.now() - startTime;
    updateClockface(time, deltaTime);
  }, 100);
}
function resetTimer () {
  clearInterval(timerId);
  deltaTime = 0;
  updateClockface(time, deltaTime);
  start.textContent = 'Start';
  start.classList.remove('started');
  laps.length = 0;
  lapsList.innerHTML = '';
  reset.disabled = true;
}
function takeLap(){
  if(!laps.includes(deltaTime)){
laps.push(deltaTime);
lapsList.innerHTML += `<li>${getFormattedTime(deltaTime)}</li>`
  }
}
function updateClockface(elem, time) {
  elem.textContent = getFormattedTime(time);
}
function getFormattedTime(time) {
  let date = new Date(time);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  let milliseconds = Math.floor(date.getMilliseconds()/100);
  return `${minutes}:${seconds}.${milliseconds}`
}