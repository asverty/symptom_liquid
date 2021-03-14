













// ПОКА НЕ УДАЛЯЮ ИЗ ПРОЕКТА, НО ФАЙЛ НИКУДА НЕ ПОДКЛЮЧЕН
















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





// BRANDS MENU

const brandsMenuImage = document.querySelector('#brand-menu-image');
const brandsList = [
	{
		name: '1991',
		menuLink: '#link-to-1991',
		menuImage: '#image-for-1991',
	},
	{
		name: 'Anna Maslovskaya',
		menuLink: '#link-to-anna-maslovskaya',
		menuImage: '#image-for-anna-maslovskaya',
	},
	{
		name: 'Arha',
		menuLink: '#link-to-arha',
		menuImage: '#image-for-arha',
	},
	{
		name: 'Atauchi',
		menuLink: '#link-to-atauchi',
		menuImage: '#image-for-atauchi',
	},
	{
		name: 'Behurr',
		menuLink: '#link-to-behurr',
		menuImage: '#image-for-behurr',
	},
	{
		name: 'BLACK FORM',
		menuLink: '#link-to-black-form',
		menuImage: '#image-for-black-form',
	},
	{
		name: 'HUBRIS',
		menuLink: '#link-to-hubris',
		menuImage: '#image-for-hubris',
	},
	{
		name: 'Liberte',
		menuLink: '#link-to-liberte',
		menuImage: '#image-for-liberte',
	},
	{
		name: 'Natalie Tonkal',
		menuLink: '#link-to-natalie-tonkal',
		menuImage: '#image-for-natalie-tonkal',
	},
	{
		name: 'NOT CONCEPT',
		menuLink: '#link-to-not-concept',
		menuImage: '#image-for-not-concept',
	},
	{
		name: 'Odor Objects',
		menuLink: '#link-to-odor-objects',
		menuImage: '#image-for-odor-objects',
	},
	{
		name: 'Other Objects',
		menuLink: '#link-to-other-objects',
		menuImage: '#image-for-other-objects',
	},
	{
		name: 'Perfert',
		menuLink: '#link-to-perfert',
		menuImage: '#image-for-perfert',
	},
	{
		name: 'Perfume Opera',
		menuLink: '#link-to-perfume-opera',
		menuImage: '#image-for-perfume-opera',
	},
	{
		name: 'Sands',
		menuLink: '#link-to-sands',
		menuImage: '#image-for-sands',
	},
	{
		name: 'Sub Rosa',
		menuLink: '#link-to-sub-rosa',
		menuImage: '#image-for-sub-rosa',
	},
	{
		name: 'Veta Perfume',
		menuLink: '#link-to-veta-perfume',
		menuImage: '#image-for-veta-perfume',
	},
	{
		name: 'Malkenza',
		menuLink: '#link-to-malkenza',
		menuImage: '#image-for-malkenza',
	},
	{
		name: 'Silvester',
		menuLink: '#link-to-silvester',
		menuImage: '#image-for-silvester',
	}
];

const brandsInMenu = brandsList.filter(brand => {
	return brand.menuLink !== null;
});

brandsInMenu.forEach(brand => {
	let brandLink = document.querySelector(brand.menuLink);
	let brandImage = document.querySelector(brand.menuImage);
	let allImages = document.querySelectorAll('.menu__image');
	if (brandLink) {
		brandLink.addEventListener('mouseover', () => {
			allImages.forEach(image => image.classList.add('menu__image_hidden'));
			brandImage.classList.remove('menu__image_hidden');
		});
	};
});





// CATEGORIES MENU

const categoriesMenuImage = document.querySelector('#categories-menu-image');
const categoriesList = [
	{
		name: 'Подвески',
		menuLink: '#link-to-pendals',
		menuImage: '#image-for-pendals',
	},
	{
		name: 'Серьги',
		menuLink: '#link-to-earrings',
		menuImage: '#image-for-earrings',
	},
	{
		name: 'Кольца',
		menuLink: '#link-to-rings',
		menuImage: '#image-for-rings',
	},
	{
		name: 'Браслеты',
		menuLink: '#link-to-bracelets',
		menuImage: '#image-for-bracelets',
	},
	{
		name: 'Каффы',
		menuLink: '#link-to-cuffs',
		menuImage: '#image-for-cuffs',
	},
	{
		name: 'Заколки',
		menuLink: '#link-to-hairpins',
		menuImage: '#image-for-hairpins',
	},
	{
		name: 'Духи',
		menuLink: '#link-to-perfume',
		menuImage: '#image-for-perfume',
	},
	{
		name: 'Твёрдые духи',
		menuLink: '#link-to-solid-perfume',
		menuImage: '#image-for-solid-perfume',
	},
	{
		name: 'Головные уборы',
		menuLink: '#link-to-headwear',
		menuImage: '#image-for-headwear',
	},
	{
		name: 'Одежда',
		menuLink: '#link-to-clothes',
		menuImage: '#image-for-clothes',
	},
	{
		name: 'Фероньерки',
		menuLink: '#link-to-feronniere',
		menuImage: '#image-for-feronniere',
	},
	{
		name: 'Керамика',
		menuLink: '#link-to-ceramics',
		menuImage: '#image-for-ceramics',
	}
];

const categoriesInMenu = categoriesList.filter(category => {
	return category.menuLink !== null;
});

categoriesInMenu.forEach(category => {
	let categoryLink = document.querySelector(category.menuLink);
	let categoryImage = document.querySelector(category.menuImage);
	let allCategories = document.querySelectorAll('.menu__image');
	if (categoryLink) {
		categoryLink.addEventListener('mouseover', () => {
			allCategories.forEach(image => image.classList.add('menu__image_hidden'));
			categoryImage.classList.remove('menu__image_hidden');
		});
	};
});

// ВАЛИДАЦИЯ ФОРМ
// без обязательного чекбокса (вход, восстановление пароля)

class FormValidator {

	constructor(formSelector) {
		this._form = document.querySelector(formSelector);
		this._inputs = Array.from(this._form.querySelectorAll('.input__field'));
		this._submitButton = this._form.querySelector('.submit-button');
		this._inactiveButtonClass = 'black-button_inactive';
		this._invalidInputClass = 'input__field_invalid';
		this._errorVisibleClass = 'input__error_shown';
	}

	enableValidation() {
		this.resetValidation();
		this._inputs.forEach((input) => {
			input.addEventListener('input', () => {
				this._isInputValid(input);
				this._toggleButtonState(this._submitButton);
			});
		});
	}

	resetValidation() {
		this._toggleButtonState(this._submitButton);
		this._inputs.forEach((input) => {
			this._hideError(input);
		});
	}

	_isInputValid(input) {
		if (!input.validity.valid) {
			this._showError(input, input.validationMessage);
		} else {
			this._hideError(input);
		}
	}

	_toggleButtonState() {
		if (!this._hasInvalidInput()) {
			this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
			this._submitButton.style.cursor = 'pointer';
		} else {
			this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', true);
			this._submitButton.style.cursor = 'default';
		}
	}

	_hasInvalidInput() {
		return this._inputs.some((input) => {
			return !input.validity.valid;
		});
	}

	_showError(input, errorMessage) {
		const errorElement = this._form.querySelector(`#${input.id}-error`);
		input.classList.add(this._invalidInputClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorVisibleClass);
	}

	_hideError(input) {
		const errorElement = this._form.querySelector(`#${input.id}-error`);
		input.classList.remove(this._invalidInputClass);
		errorElement.classList.remove(this._errorVisibleClass);
		errorElement.textContent = '';
	}

}

const logInFormValidator = new FormValidator('#login-form');
const recoveryFormValidator = new FormValidator('#password-recovery-form');
logInFormValidator.enableValidation();
recoveryFormValidator.enableValidation();





// ВАЛИДАЦИЯ ФОРМ
// с обязательным чекбоксом (подписка, регистрация)

class FormValidatorExtended extends FormValidator {

	constructor(formSelector) {
		super(formSelector);
		this._requiredCheckbox = this._form.querySelector('.checkbox__true-checkbox_required');
	}

	enableValidation() {
		super.enableValidation();
		this._requiredCheckbox.addEventListener('click', () => {
			this._toggleButtonState(this._submitButton);
		});
	}

	_toggleButtonState() {
		if (this._requiredCheckbox.checked && !this._hasInvalidInput()) {
			this._submitButton.classList.remove(this._inactiveButtonClass);
			this._submitButton.removeAttribute('disabled');
			this._submitButton.style.cursor = 'pointer';
		} else {
			this._submitButton.classList.add(this._inactiveButtonClass);
			this._submitButton.setAttribute('disabled', true);
			this._submitButton.style.cursor = 'default';
		}
	}

}

const subscribeFormValidator = new FormValidatorExtended('#subscribe-form');
const signInFormValidator = new FormValidatorExtended('#signin-form');
subscribeFormValidator.enableValidation();
signInFormValidator.enableValidation();





// ЧАТРА
const chatraButton = document.querySelector('#open_chatra');
chatraButton.addEventListener('click', () => {
	const chatraWindow = document.querySelector('.chatra--webkit');
	chatraWindow.classList.contains('chatra--expanded')
		? Chatra('minimizeWidget')
		: Chatra('openChat', true)
});





// ФИЛЬТРЫ КАТЕГОРИЙ
const filterNew = document.querySelector('#filter-new');
const filterMinPrice = document.querySelector('#filter-min-price');
const filterMaxPrice = document.querySelector('#filter-max-price');
const filterNewOutline = document.querySelector('#filter-new-outline');
const filterMinPriceOutline = document.querySelector('#filter-min-price-outline');
const filterMaxPriceOutline = document.querySelector('#filter-max-price-outline');