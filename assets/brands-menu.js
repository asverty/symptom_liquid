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
