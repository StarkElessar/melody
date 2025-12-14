export const initActiveLink = () => {
	const navLinks = document.querySelectorAll('.navbar__list-link');
	const navMenu = document.querySelector('.navbar__list');

	const removeActiveClass = (item) => item.classList.remove('navbar__list-link--active');
	const addActiveClass = (item) => item.classList.add('navbar__list-link--active');

	navMenu.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('navbar__list-link')) {
			if (!target.classList.contains('navbar__list-link--active')) {
				navLinks.forEach((link) => removeActiveClass(link));
				addActiveClass(target);
			}
		}
	});
};