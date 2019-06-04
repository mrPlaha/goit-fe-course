'use strict';

const galleryItems = [
  {
    preview: "img/preview-1.jpg",
    fullview: "img/fullview-1.jpg",
    alt: "cloude"
  },
  {
    preview: "img/preview-2.jpg",
    fullview: "img/fullview-2.jpg",
    alt: "cliff"
  },
  {
    preview: "img/preview-3.jpg",
    fullview: "img/fullview-3.jpg",
    alt: "nature"
  },
  {
    preview: "img/preview-4.jpg",
    fullview: "img/fullview-4.jpg",
    alt: "rocks"
  },
  {
    preview: "img/preview-5.jpg",
    fullview: "img/fullview-5.jpg",
    alt: "rocks"
  },
  {
    preview: "img/preview-6.jpg",
    fullview: "img/fullview-6.jpg",
    alt: "rocks"
  },
  
];

document.addEventListener("DOMContentLoaded", () => {
  const imageGallery = document.querySelector(".js-image-gallery");

  const fullviewImage = showFullviewImage(galleryItems[0]);
  const previewImages = showPreviewImages(galleryItems);

  const previewImgs = imageGallery.querySelectorAll(".preview-img");
  const previewActiveImg = previewImgs[0].classList.add("preview-img-active");

  imageGallery.addEventListener("click", imgGalleryClick);

  function imgGalleryClick({ target }) {
    const hasClass = target.classList.contains("preview-img");

    if (!hasClass) return;

    const activeFullviewImage = imageGallery.querySelector(".fullview-img");

    activeFullviewImage.setAttribute("src", target.dataset.fullview);

    setActivePreviewImg(previewImgs, target);
  }

  function setActivePreviewImg(previewImgs, target) {
    previewImgs.forEach(previewImg => {
      if (previewImg !== target) {
        previewImg.classList.remove("preview-img-active");
      } else {
        previewImg.classList.add("preview-img-active");
      }
    });
  }


  function showFullviewImage({ fullview }) {
    const imageGallery  = document.querySelector(".js-image-gallery");

    const div = document.createElement("div");
      div.classList.add("fullview-item");

    const img = document.createElement("img");
      img.classList.add("fullview-img");
      img.setAttribute("src", `${fullview}`);
      img.setAttribute("alt", "cloud");

      div.append(img);
      imageGallery.append(div);
  }

  function showPreviewImages() {
    const imageGallery  = document.querySelector(".js-image-gallery");

    const div = document.createElement("div");
      div.classList.add("slider");

    const list = document.createElement("ul"); 
      list.classList.add("preview-items");

    const elements = createListGallary(galleryItems);
      list.append(...elements);
      div.append(list);
     
      imageGallery.append(div); 

  }

  function createListGallary(arr) {
    return arr.reduce ((acc,el)=> acc.concat (createListItem(el)),[]);
  }

  function createListItem ({preview, fullview, alt}) {

    const listItem = document.createElement("li");
        listItem.classList.add("preview-item");

    const image = document.createElement("img");
        image.classList.add("preview-img");
        image.setAttribute("src", `${preview}`);
        image.setAttribute("alt", `${alt}`);
        image.setAttribute("data-fullview", `${fullview}`);

        listItem.append(image);
        return listItem;
  }
     
});