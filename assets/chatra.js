// CHATRA

const chatraButton = document.querySelector('.footer__chatra-button');

chatraButton.addEventListener('click', () => {
	const chatraWindow = document.querySelector('.chatra--webkit');
	chatraWindow.classList.contains('chatra--expanded')
		? Chatra('minimizeWidget')
		: Chatra('openChat', true)
});