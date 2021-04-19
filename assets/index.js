// FULLPAGE.JS

const numberOfSections =  document.querySelectorAll('#fullpage .section').length;
const counter = document.querySelector('.counter');

const updateCounter = () => {
	const element = document.querySelector('.section.active');
	const activeIndex = Array.from(element.parentNode.children).indexOf(element) + 1;

	counter.textContent = `${activeIndex}/${numberOfSections}`;
}

$(document).ready(() => {
	const options = {
		menu: '#menu',
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: ['#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA'],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: true,
		afterLoad: updateCounter,
		afterRender: updateCounter,
	};

	const res = $('#fullpage').pagepiling(options);
});

// FOOTER

const footer = document.querySelector('.footer');
const lastSection = Array.from(document.querySelectorAll('.section')).pop();

lastSection.addEventListener('swiped-up', showFooter);
lastSection.addEventListener('swiped-down', hideFooter);
lastSection.addEventListener('click', hideFooter);
footer.addEventListener('swiped-down', hideFooter);
header.addEventListener('click', hideFooter);

function showFooter() {
	footer.classList.remove('footer_hidden');
};

function hideFooter() {
	footer.classList.add('footer_hidden');
};

// открываем футер клавишей "вниз"
document.addEventListener('keydown', event => {
	const isLastSectinActive = document.querySelector('.section.active').nextElementSibling === null
	if(!isLastSectinActive) return;

	switch(event.key){
		case 'ArrowDown':
			showFooter();
		break;
		case 'ArrowUp':
		case 'Escape':
			hideFooter();
		break;
	}
});

// открываем футер колёсиком мыши
lastSection.addEventListener('wheel', event => {
	if (event.wheelDelta < 0) showFooter();
});

// Mozilla Firefox
// открываем футер колёсиком мыши
lastSection.addEventListener('DOMMouseScroll', event => {
	if (event.detail > 0) showFooter();
});

// закрываем футер колёсиком мыши (если курсор на секции)
lastSection.addEventListener('wheel', event => {
	if (event.wheelDelta > 0) hideFooter();
});

// Mozilla Firefox
// закрываем футер колёсиком мыши (если курсор на секции)
lastSection.addEventListener('DOMMouseScroll', event => {
	if (event.detail < 0) hideFooter();
});

// закрываем футер колёсиком мыши (если курсор на самом футере)
footer.addEventListener('DOMMouseScroll', event => {
	if (event.detail < 0) hideFooter();
});

// Mozilla Firefox
// закрываем футер колёсиком мыши (если курсор на самом футере)
footer.addEventListener('wheel', event => {
	if (event.wheelDelta > 0) hideFooter();
});

// закрываем футер кликом по секции
lastSection.addEventListener('click', (event) => {
	if (!footer.classList.contains('footer_hidden')) {
		event.preventDefault();
		hideFooter();
	}
});

// закрываем футер кликом по меню
// ВАЖНО: переменная menus берётся из common.js
// menus.forEach(menu => {
// 	menu.addEventListener('click', () => hideFooter());
// });

// закрываем футер кликом по форме
// ВАЖНО: переменная forms берётся из common.js
// forms.forEach(form => {
// 	form.addEventListener('click', () => hideFooter());
// });

// COOKIES

const cookiesPopup = document.querySelector('#cookies-popup');
const showCookies = () => cookiesPopup.classList.remove('cookies_hidden');
const hideCookies = () => cookiesPopup.classList.add('cookies_hidden');

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
	options = {
		path: '/',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function areCookiesAccepted() {
	let isAccepted = getCookie('cookiesAccepted');
	if (isAccepted == 'true') {
		hideCookies();
	} else {
		showCookies();
	}
}

const cookiesCloseButton = document.querySelector('#cookies-close-button');

cookiesCloseButton.addEventListener('click', () => {
	// 8000000 миллисекунд = 3 месяца
	setCookie('cookiesAccepted', 'true', { 'max-age': 8000000 });
	hideCookies();
});

areCookiesAccepted();