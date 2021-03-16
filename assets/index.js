// FULLPAGE.JS

const counter = document.querySelector('.counter');
const numberOfSections = Array.from(document.querySelectorAll('.section')).length;

const myFullpage = new fullpage('#fullpage', {
	licenseKey: '035BCCB5-F4C94A55-B766CB96-94A4230B',

	//Navigation
	menu: '#menu',
	lockAnchors: false,
	anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
	navigation: false,
	navigationPosition: 'right',
	navigationTooltips: ['firstSlide', 'secondSlide', 'thirdSlide', 'fourthSlide'],
	showActiveTooltip: true,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',

	//Scrolling
	css3: true,
	scrollingSpeed: 700,
	autoScrolling: true,
	fitToSection: true,
	fitToSectionDelay: 1000,
	scrollBar: false,
	easing: 'easeInOutCubic',
	easingcss3: 'ease',
	loopBottom: false,
	loopTop: false,
	loopHorizontal: true,
	continuousVertical: false,
	continuousHorizontal: false,
	scrollHorizontally: false,
	interlockedSlides: false,
	dragAndMove: false,
	offsetSections: false,
	resetSliders: false,
	fadingEffect: false,
	normalScrollElements: '#element1, .element2',
	scrollOverflow: false,
	scrollOverflowReset: false,
	scrollOverflowOptions: null,
	touchSensitivity: 15,
	bigSectionsDestination: null,

	//Accessibility
	keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,

	//Design
	controlArrows: false,
	verticalCentered: true,
	sectionsColor: ['#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA'],
	paddingTop: '0',
	paddingBottom: '0',
	fixedElements: '#header, .footer',
	responsiveWidth: 0,
	responsiveHeight: 0,
	responsiveSlides: false,
	parallax: false,
	parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
	cards: false,
	cardsOptions: { perspective: 100, fadeContent: true, fadeBackground: true },

	//Custom selectors
	sectionSelector: '.section',
	slideSelector: '.slide',

	lazyLoading: true,

	//events
	onLeave: function (origin, destination, direction) {
		counter.textContent = `${destination.index + 1}/${numberOfSections}`;
	},
	afterLoad: function (origin, destination, direction) { },
	afterRender: function () { },
	afterResize: function (width, height) { },
	afterReBuild: function () { },
	afterResponsive: function (isResponsive) { },
	afterSlideLoad: function (section, origin, destination, direction) { },
	onSlideLeave: function (section, origin, destination, direction) { }
});

if(counter){
	counter.textContent = `1/${numberOfSections}`;
};





// FOOTER

const footer = document.querySelector('.footer');
const lastSection = Array.from(document.querySelectorAll('.section')).pop();

function showFooter() {
	footer.classList.remove('footer_hidden');
	myFullpage.setAllowScrolling(false, 'up');
	myFullpage.setKeyboardScrolling(false, 'up');
};

function hideFooter() {
	footer.classList.add('footer_hidden');
	setTimeout(() => {
		myFullpage.setAllowScrolling(true, 'up');
		myFullpage.setKeyboardScrolling(true, 'up');
	}, 300);
};

// открываем футер клавишей "вниз"
document.addEventListener('keydown', event => {
	let activeSection = myFullpage.getActiveSection();
	if ((activeSection.isLast) && (event.key == 'ArrowDown')) showFooter();
});

// закрываем футер клавишей "вверх" или "Esc"
document.addEventListener('keydown', event => {
	let activeSection = myFullpage.getActiveSection();
	if ((activeSection.isLast) && ((event.key == 'ArrowUp') || event.key == 'Escape')) hideFooter();
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
const cookiesCloseButton = document.querySelector('#cookies-close-button');
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

cookiesCloseButton.addEventListener('click', () => {
	// 8000000 миллисекунд = 3 месяца
	setCookie('cookiesAccepted', 'true', { 'max-age': 8000000 });
	hideCookies();
});

areCookiesAccepted();
