/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/
const modal = document.querySelector('.js-modal-backdrop');
const form = document.querySelector('form');
const inputLink = document.querySelector('input');
const cards = document.querySelector('.cards');
const element = document.querySelector('#card').innerHTML.trim()
const template = Handlebars.compile(element);
form.addEventListener('submit', addNewCard);
cards.addEventListener('click', removeLink);
// отрисовываем при загрузке закладки из localstorage,
//  если закладок нет, обьявляем масив для добавления в него обьектов закладок.
// ------------------------------------------------------------
let links = JSON.parse(localStorage.getItem(""));
if (links === null) {
  links = []
};
if (links) {
  cards.innerHTML = template(links);
}
//---------------------------------------------------------------
//-----------------добавляем ссылку------------------------------
function addNewCard(ev) {
  ev.preventDefault();
  // проверяем на валидность
  if (!validateLink(inputLink.value)) {
    openModal('Не валидная ссылка!')
    return
  }
  fetchLink(inputLink.value).then(data => {
    // проверяем на уникальность в колекции
    if (links.some(el => el.url === data.url)) {
      openModal('Данная ссылка уже есть  в закладках!');
      return;
    }
    if (data) {
      links.unshift(data);
      // обновляем интерфейс и перезаписываем localstorage
      reloadInterface(links, cards);
      return
    }
  })
}
// делаем запрос по API----------------------------------------
function fetchLink(link) {
  return fetch('https://api.linkpreview.net/?key=5cf192f15d69c372680a47ac1b06023127cc5830f0441&q=' + link)
    .then(response => {
      if (response.ok) return response.json();
      openModal('Не валидная ссылка!')
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      console.log(data)
      return data
    })
    .catch(error => console.log(error))
}
// --------------------------------------------------------
function removeLink(ev) {
  if (ev.target.dataset.action !== 'remove') return;
  const delLink = ev.target.parentNode.querySelector('a').href;
  links = links.filter(el => el.url !== delLink)
  reloadInterface(links, cards)
}

function reloadInterface(arrofObj, parent) {
  localStorage.setItem('', JSON.stringify(arrofObj));
  parent.innerHTML = template(arrofObj);
}
// -------------функционал модальноого окна для сообщения об ошибке-----------------
function openModal(message) {
  modal.classList.remove('modal-hidden')
  modal.innerHTML = `<div class="modal-content">
  <div class="close-btn" data-action="close-modal"></div>
  <p class="modal-text">${message}</p></div>`
  const close = modal.querySelector('.close-btn')
  close.addEventListener('click', closeModal)
}

function closeModal() {
  modal.classList.add('modal-hidden')
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add('modal-hidden');
  }
}
// --------------------------------------------------------------------
function validateLink(link) {
  const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return pattern.test(link)
}