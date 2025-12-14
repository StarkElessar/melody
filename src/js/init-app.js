export function initApp() {
	const pathFloor = Array.from(document.querySelectorAll('[data-floor]'));
	const pathFlat = Array.from(document.querySelectorAll('[data-flat]'));
	const nameFlats = Array.from(document.querySelectorAll('.flat__list-link'));
	const floorParent = document.querySelector('.main__image-home');
	const counterPlace = document.querySelector('.counter__number');
	const counterUp = document.querySelector('.counter__arrow-up');
	const counterDown = document.querySelector('.counter__arrow-down');
	const modalWindow = document.querySelector('.modal');

	// State object (replaces let variables)
	const state = {
		floor: null, // will initialize below
		flat: null,
	};

	const pad = n => (n >= 0 && n < 10 ? `0${n}` : String(n));

	// derive floors from DOM (numbers may be strings like '02')
	const floors = Array.from(new Set(pathFloor
		.map(el => Number(String(el.dataset.floor).replace(/^0+/, '') || NaN))
		.filter(Number.isFinite))).sort((a, b) => a - b);
	const minFloor = floors.length ? floors[0] : 2;
	const maxFloor = floors.length ? floors[floors.length - 1] : 18;

	// count of flats per floor (from DOM)
	const flatsCount = document.querySelectorAll('.number-of-flat').length || 10;

	// determine base numbers automatically: try to read existing first flat; fallback to 21
	const firstFlatText = document.querySelector('.number-of-flat')?.textContent?.trim();
	const baseStart = Number(firstFlatText) && Number(firstFlatText) <= 1000 ? Number(firstFlatText) : 21;

	// helper: create base numbers [baseStart, baseStart+1, ...]
	const makeBaseNumbers = (count, start = baseStart) => Array.from({ length: count }, (_, i) => start + i);

	// helper: compute offset for a given floor (distance from minFloor times flatsCount)
	const floorOffset = floorNumber => (floorNumber - minFloor) * flatsCount;

	// initialize state.floor from counterPlace if present or minFloor
	state.floor = Number(counterPlace?.textContent?.replace(/^0+/, '')) || minFloor;
	state.flat = 1;

	const updateArrows = () => {
		if (counterUp) counterUp.disabled = state.floor >= maxFloor;
		if (counterDown) counterDown.disabled = state.floor <= minFloor;
	};

	const setFloor = newFloor => {
		if (!Number.isFinite(newFloor)) return;
		state.floor = newFloor;
		if (counterPlace) counterPlace.textContent = pad(newFloor);
		// toggle current-floor class
		pathFloor.forEach(p => p.classList.remove('current-floor'));
		const el = document.querySelector(`[data-floor="${pad(newFloor)}"]`) || document.querySelector(`[data-floor="${String(newFloor)}"]`);
		el?.classList.toggle('current-floor');
		updateArrows();
	};

	const setFlat = newFlat => {
		state.flat = newFlat;
		pathFlat.forEach(p => p.classList.remove('current-flat'));
		nameFlats.forEach(f => f.classList.remove('current-flat'));
		document.querySelector(`[data-flat-number="${newFlat}"]`)?.classList.toggle('current-flat');
		document.querySelector(`[data-flat="${newFlat}"]`)?.classList.toggle('current-flat');
	};

	// initial arrows state
	updateArrows();

	// Event listeners
	floorParent?.addEventListener('mouseover', e => {
		const el = e.target?.closest?.('[data-floor]');
		if (!el) return;
		const floorNum = Number(String(el.dataset.floor).replace(/^0+/, '')) || minFloor;
		setFloor(floorNum);
	});

	counterUp?.addEventListener('click', () => {
		if (state.floor < maxFloor) setFloor(state.floor + 1);
	});

	counterDown?.addEventListener('click', () => {
		if (state.floor > minFloor) setFloor(state.floor - 1);
	});

	modalWindow?.addEventListener('mouseover', e => {
		const elFlat = e.target?.closest?.('[data-flat], [data-flat-number]');
		if (!elFlat) return;
		const flatNum = elFlat.getAttribute('data-flat') || elFlat.getAttribute('data-flat-number');
		setFlat(flatNum);
	});

	document.addEventListener('click', e => {
		const target = e.target;
		const showModalBtn = target?.classList?.contains('main__nav-btn');
		const modalCover = target?.classList?.contains('modal');
		const modalCloseBtn = target?.classList?.contains('modal__close-btn');
		const svgBtn = target?.classList?.contains('svg__close-btn');
		const pathBtn = target?.classList?.contains('path__close-btn');
		const currentNumberFloor = counterPlace?.textContent || '';
		const currentFloorInModal = document.querySelector('.modal__counter');

		if (target?.hasAttribute?.('data-floor') || showModalBtn) {
			modalWindow?.classList?.add('show');
			if (currentFloorInModal) currentFloorInModal.textContent = currentNumberFloor;
			changeCurrentNumberOfFlat();
		}

		if (modalCloseBtn || svgBtn || pathBtn || modalCover) {
			modalWindow?.classList?.remove('show');
		}
	});

	function changeCurrentNumberOfFlat() {
		const currentNumberOfFlats = Array.from(document.querySelectorAll('.number-of-flat'));
		const count = currentNumberOfFlats.length || flatsCount;

		// generate base numbers automatically
		const baseNumbers = makeBaseNumbers(count, baseStart);

		// compute offset based on current floor and minFloor
		const offset = floorOffset(Number(String(state.floor).replace(/^0+/, '')) || minFloor);

		currentNumberOfFlats.forEach((flatEl, idx) => {
			const value = (baseNumbers[idx] ?? 0) + offset;
			flatEl.textContent = String(value);
		});
	}
}
