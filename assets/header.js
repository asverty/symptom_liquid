// HEADER

const main = document.querySelector('main');
const header = document.querySelector('header');
const headerLogo = document.querySelector('#header-logo');

const buttons = document.querySelectorAll('.header__button');
const headerBrandsButton = document.querySelector('#header-brands-button');
const headerCategoriesButton = document.querySelector('#header-categories-button');
const headerSubscribeButton = document.querySelector('#header-subscribe-button');
const headerLogInButton = document.querySelector('#header-login-button');
const headerFinderButton = document.querySelector('#header-finder-button');
const headerCartButton = document.querySelector('#header-cart-button');

const outlines = document.querySelectorAll('.header__button-outline');
const brandsOutline = document.querySelector('#brands-outline');
const categoriesOutline = document.querySelector('#categories-outline');
const subscribeOutline = document.querySelector('#subscribe-outline');
const logInOutline = document.querySelector('#login-outline');
const finderOutline = document.querySelector('#finder-outline');
const cartOutline = document.querySelector('#cart-outline');

const menus = document.querySelectorAll('.menu');
const brandsMenu = document.querySelector('#brands-menu');
const categoriesMenu = document.querySelector('#categories-menu');
const finderMenu = document.querySelector('#finder-menu');

const forms = document.querySelectorAll('.form');
const subscribeForm = document.querySelector('#subscribe-form');
const logInForm = document.querySelector('#login-form');
const signInButton = document.querySelector('#signin-button');
const recoveryButton = document.querySelector('#recovery-button');
const signInForm = document.querySelector('#signin-form');
const passwordRecoveryForm = document.querySelector('#password-recovery-form');

function headerTurnsBlack() {
	if (header.classList.contains('header_two-colored')) {
		headerLogo.classList.remove('header__logo_white');
		buttons.forEach(button => button.classList.remove('header__button_white'));
		finderOutline.classList.remove('header__button-outline_white');
		cartOutline.classList.remove('header__button-outline_white');
	}
};

function headerTurnsWhite() {
	if (header.classList.contains('header_two-colored')) {
		headerLogo.classList.add('header__logo_white');
		buttons.forEach(button => button.classList.add('header__button_white'));
		finderOutline.classList.add('header__button-outline_white');
		cartOutline.classList.add('header__button-outline_white');
	}
};

function showOutline(outline) {
	outline.classList.remove('header__button-outline_hidden');
};

function hideAllOutlines() {
	outlines.forEach(outline => outline.classList.add('header__button-outline_hidden'));
};

function showPopup(popup, hidingClass) {
	headerTurnsBlack();
	popup.classList.remove(hidingClass);
};

function hideAllPopups() {
	menus.forEach(menu => menu.classList.add('menu_hidden'));
	// для finderMenu приходится прописывать логику отдельно, поскольку на него нельзя повесить
	// класс menu без поломки вёрстки, а соответственно он не входит в нодлист menus
	finderMenu.classList.add('menu_hidden');
	forms.forEach(form => form.classList.add('form_hidden'));
	hideAllOutlines();
	headerTurnsWhite();
};

if (headerBrandsButton) {
	headerBrandsButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(brandsOutline);
		showPopup(brandsMenu, 'menu_hidden');
	});
};

if (headerCategoriesButton) {
	headerCategoriesButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(categoriesOutline);
		showPopup(categoriesMenu, 'menu_hidden');
	});
};

if (headerSubscribeButton) {
	headerSubscribeButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(subscribeOutline);
		showPopup(subscribeForm, 'form_hidden');
	});
};

if (headerLogInButton) {
	headerLogInButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(logInOutline);
		showPopup(logInForm, 'form_hidden');
	});
};

if (signInButton) {
	signInButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(logInOutline);
		showPopup(signInForm, 'form_hidden');
	});
};

if (recoveryButton) {
	recoveryButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(logInOutline);
		showPopup(passwordRecoveryForm, 'form_hidden');
	});
};

if (headerFinderButton) {
	headerFinderButton.addEventListener('click', () => {
		hideAllPopups();
		showOutline(finderOutline);
		showPopup(finderMenu, 'menu_hidden');
	});
};

if (headerCartButton) {
	headerCartButton.addEventListener('click', () => {
		hideAllOutlines();
		showOutline(cartOutline);
	});
};

// закрываем меню и формы кликом по основному разделу
document.addEventListener('keydown', event => {
	if (event.key == 'Escape') hideAllPopups();
});

// закрываем меню и формы кликом по основному разделу
if (main) {
	main.addEventListener('click', (event) => {
		// пока что сделал проверку максимально "втупую", ибо сроки горят
		if ((!brandsMenu.classList.contains('menu_hidden'))
			|| (!categoriesMenu.classList.contains('menu_hidden'))
			|| (!finderMenu.classList.contains('menu_hidden'))
			|| (!subscribeForm.classList.contains('form_hidden'))
			|| (!logInForm.classList.contains('form_hidden'))
			|| (!signInForm.classList.contains('form_hidden'))
			|| (!passwordRecoveryForm.classList.contains('form_hidden'))) {
			event.preventDefault();
		}
		hideAllPopups();
	});
};

// закрываем меню и формы кликом по футеру
document.addEventListener('click', event => {
	let isFooter = event.target.closest('.footer');
	if (isFooter) hideAllPopups();
});
