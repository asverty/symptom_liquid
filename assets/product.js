const mainOptions = {
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.product-single__thumbnails',
  centerPadding: '0px',
  infinite: false,
  focusOnSelect: true
};

const thumbnailsOptions = {
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.item__image-product',
  centerPadding: '0px',
  arrows: false,
  infinite: false,
  focusOnSelect: true,
  responsive: [ 
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      } 
    }
  ]
}; 

window.addEventListener('load', () => {
  const items_count = $('.product-single__thumbnail-item').length; 
  if(items_count === 1) $('.product-single__thumbnails')[0].style.display = "none"; 

  $('.item__image-product').slick(mainOptions);
  $('.product-single__thumbnails').slick(thumbnailsOptions);
})

/* const slider = new Siema({
  selector: '#photo-slider',
  duration: 200,
  easing: 'ease-out',
  perPage: 3,
  startIndex: 0,
  draggable: true,
  multipleDrag: false,
  threshold: 20,
  loop: true,
  rtl: false,
  onInit: () => { },
  onChange: () => { },
});

const mainImage = document.querySelector('#main-image');
const itemOverlay = document.querySelector('.item__overlay');
const fullsizeImage = document.querySelector('.item__fullsize-image');
const allImages = document.querySelectorAll('.product__image-mini');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

mainImage.addEventListener('click', () => {
  itemOverlay.classList.remove('item__overlay_hidden');
});

function updateImage(url, description) {
  mainImage.src = url;
  mainImage.alt = description;
  fullsizeImage.src = url;
  fullsizeImage.alt = description;
};

itemOverlay.addEventListener('click', event => {
  if (event.target.classList.contains('item__overlay')) {
    itemOverlay.classList.add('item__overlay_hidden');
  }
});

document.addEventListener('keydown', event => {
	if (event.key == 'Escape') {
    itemOverlay.classList.add('item__overlay_hidden');
  }
});

allImages.forEach(image => {
  image.addEventListener('click', () => {
    updateImage(image.src, image.alt);
  });
});

prevButton.addEventListener('click', () => {
  slider.prev();
});

nextButton.addEventListener('click', () => {
  slider.next();
});

 */