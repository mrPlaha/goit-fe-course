'use strict';
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-1.com'
    },
    {
      img: "https://placeimg.com/400/150/nature",
      title: "Post title 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-2.com'
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-3.com'
    }
  ];
  
  const createPostCard = ({img, title, text, link}) => {
    const body = document.querySelector('body');

    const movie = document.createElement("div");
        movie.classList.add("movie");

    const movie__image = document.createElement('img');
        movie__image.classList.add("movie__image");
        movie__image.setAttribute('src', img);
        movie__image.setAttribute('alt', "post image");

    const movie__title = document.createElement("h2");
        movie__title.classList.add("movie__title");
        movie__title.textContent=title;

    const movie__txt = document.createElement("p");
        movie__txt.classList.add("movie__txt");
        movie__txt.textContent=text;
      
    const movie__link = document.createElement("a");
        movie__link.classList.add("movie__link");
        movie__link.setAttribute("href", link);
        movie__link.textContent = link;
    
    movie.append(movie__image, movie__title, movie__txt, movie__link);
    body.append(movie);
  }
  const createCards = (arr) => {
    const posts = arr.map(post => createPostCard(post));
    
    return posts;
  }
  
  createCards(posts);
     