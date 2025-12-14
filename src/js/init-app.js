export function initApp() {
	let currentFloor = 2;
	let currentFlat = 1;

	const pathFloor = document.querySelectorAll('[data-floor]');
	const pathFlat = document.querySelectorAll('[data-flat]');
	const nameFlats = document.querySelectorAll('.flat__list-link');
	const floorParent = document.querySelector('.main__image-home');
	const counterPlace = document.querySelector('.counter__number');
	const counterUp = document.querySelector('.counter__arrow-up');
	const counterDown = document.querySelector('.counter__arrow-down');
	const modalWindow = document.querySelector('.modal');

	const getZero = number => number >= 0 && number < 10 ? `0${number}` : number;

	if (floorParent) {
		floorParent.addEventListener('mouseover', (event) => {
			const target = event.target;
			const thisFloor = target && target.hasAttribute && target.hasAttribute('data-floor');

			if (target && thisFloor) {
				pathFloor.forEach((path) => path.classList.remove('current-floor'));
				currentFloor = target.getAttribute('data-floor');
				if (counterPlace) counterPlace.innerHTML = currentFloor;
				const el = document.querySelector(`[data-floor="${currentFloor}"]`);
				if (el) el.classList.toggle('current-floor');
			}
		});
	}

	if (counterUp) {
		counterUp.addEventListener('click', () => {
			if (currentFloor < 18) {
				currentFloor++;
				if (counterPlace) counterPlace.innerHTML = getZero(currentFloor);
				pathFloor.forEach((path) => path.classList.remove('current-floor'));
				const el = document.querySelector(`[data-floor="${getZero(currentFloor)}"]`);
				if (el) el.classList.toggle('current-floor');
			}
		});
	}

	if (counterDown) {
		counterDown.addEventListener('click', () => {
			if (currentFloor > 2) {
				currentFloor--;
				if (counterPlace) counterPlace.innerHTML = getZero(currentFloor);
				pathFloor.forEach((path) => path.classList.remove('current-floor'));
				const el = document.querySelector(`[data-floor="${getZero(currentFloor)}"]`);
				if (el) el.classList.toggle('current-floor');
			}
		});
	}

	if (modalWindow) {
		modalWindow.addEventListener('mouseover', (event) => {
			const target = event.target;
			const thisFlat = target && target.hasAttribute && target.hasAttribute('data-flat');
			const thisNameFlat = target && target.hasAttribute && target.hasAttribute('data-flat-number');

			if (target && (thisFlat || thisNameFlat)) {
				currentFlat = (target.getAttribute('data-flat') || target.getAttribute('data-flat-number'));
				pathFlat.forEach((path) => path.classList.remove('current-flat'));
				nameFlats.forEach((flat) => flat.classList.remove('current-flat'));
				const a1 = document.querySelector(`[data-flat-number="${currentFlat}"]`);
				const a2 = document.querySelector(`[data-flat="${currentFlat}"]`);
				if (a1) a1.classList.toggle('current-flat');
				if (a2) a2.classList.toggle('current-flat');
			}
		});
	}

	document.addEventListener('click', (event) => {
		const target = event.target;
		const showModalBtn = target && target.classList && target.classList.contains('main__nav-btn');
		const modalCover = target && target.classList && target.classList.contains('modal');
		const modalCloseBtn = target && target.classList && target.classList.contains('modal__close-btn');
		const svgBtn = target && target.classList && target.classList.contains('svg__close-btn');
		const pathBtn = target && target.classList && target.classList.contains('path__close-btn');
		const currentNumberFloor = (document.querySelector('.counter__number') || {}).innerHTML || '';
		const currentFloorInModal = document.querySelector('.modal__counter');

		if (target && (target.hasAttribute && target.hasAttribute('data-floor') || showModalBtn)) {
			if (modalWindow) modalWindow.classList.add('show');
			if (currentFloorInModal) currentFloorInModal.innerHTML = currentNumberFloor;
			changeCurrentNumberOfFlat();
		}
		if (target && (modalCloseBtn || svgBtn || pathBtn || modalCover)) {
			if (modalWindow) modalWindow.classList.remove('show');
		}
	});

	function changeCurrentNumberOfFlat() {
		const currentNumberOfFlats = document.querySelectorAll('.number-of-flat');
		const numbers = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
		const numbersForLoop = [
			{ floor: '02', numbers: 0 },
			{ floor: '03', numbers: 10 },
			{ floor: '04', numbers: 20 },
			{ floor: '05', numbers: 30 },
			{ floor: '06', numbers: 40 },
			{ floor: '07', numbers: 50 },
			{ floor: '08', numbers: 60 },
			{ floor: '09', numbers: 70 },
			{ floor: '10', numbers: 80 },
			{ floor: '11', numbers: 90 },
			{ floor: '12', numbers: 100 },
			{ floor: '13', numbers: 110 },
			{ floor: '14', numbers: 120 },
			{ floor: '15', numbers: 130 },
			{ floor: '16', numbers: 140 },
			{ floor: '17', numbers: 150 },
			{ floor: '18', numbers: 160 }
		];

		// Находим текущий этаж и соответствующее смещение (offset)
		const currentFloorStr = (document.querySelector('.counter__number') || {}).innerHTML || '';
		const found = numbersForLoop.find(item => item.floor === currentFloorStr);
		const offset = found ? found.numbers : 0;

		// Заполняем номера квартир одним циклом
		currentNumberOfFlats.forEach((flat, index) => {
			const base = Number(numbers[index]) || 0;
			flat.innerHTML = String(base + offset);
		});
	}
}

