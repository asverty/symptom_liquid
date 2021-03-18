// МЕНЮ
const menu = document.querySelector('.menu-popup');
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.menu-close-button');

const toggleMenu = () => {
  menu.classList.toggle('menu-popup_hidden');
  header.classList.toggle('header_hidden');
  main.classList.toggle('main_hidden');
}

menuButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);
