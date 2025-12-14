export const initActiveLink = () => {
	document.addEventListener('DOMContentLoaded', () => {
		const navLinks = document.querySelectorAll('.navbar__list-link'),
			navMenu = document.querySelector('.navbar__list'),

			removeActiveClass = (item) => item.classList.remove('navbar__list-link--active'),
			addActiveClass = (item) => item.classList.add('navbar__list-link--active');

		navMenu.addEventListener('click', (event) => {
			const target = event.target;

			if (target && target.classList.contains('navbar__list-link')) {
				if (!target.classList.contains('navbar__list-link--active')) {
					navLinks.forEach((link) => removeActiveClass(link));
					addActiveClass(target);
				}
			}
		});
	});
}