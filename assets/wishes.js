// закрываем меню и футеры кликом по основному разделу
// (а кнопке "желания" возвращаем овал)
document.addEventListener('keydown', event => {
	if (event.key == 'Escape') {
    hideAllPopups();
    wishesOutline.classList.remove('header__button-outline_hidden');
  };
});

// закрываем меню и футеры кликом по основному разделу
// (а кнопке "желания" возвращаем овал)
main.addEventListener('click', () => {
  hideAllPopups();
  wishesOutline.classList.remove('header__button-outline_hidden');
});