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