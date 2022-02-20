const allSections = document.querySelectorAll(".section");
const arrowLeft = document.querySelector(".gallery__popup-arrow--left");
const arrowRight = document.querySelector(".gallery__popup-arrow--right");
const galleryElements = document.querySelectorAll(
	".gallery__img-list-element img"
);
const menu = document.querySelector(".nav__menu");
const menuElements = document.querySelectorAll(".nav__elements-item");
const nav = document.querySelector(".nav__elements");
const navigation = document.querySelector(".nav");
const popupClose = document.querySelector(".gallery__popup-close");
const popupImg = document.querySelector(".gallery__popup-img");
const popupOpen = document.querySelector(".gallery__popup");
const searchButton = document.querySelector(".nav__search");
const searchButtonAccept = document.querySelector("#search-button-accept");
const searchButtonDecline = document.querySelector("#search-button-decline");
const searchEnter = document.querySelector(".search-input__input");
const searchError = document.querySelector(".search-input__error");
const searchInput = document.querySelector(".search-input");
const year = document.querySelector(".footer__rights-year");

let currentIndexOfGallery;

// --- FUNCTIONS ---

const searchActive = () => {
	searchInput.classList.toggle("search-input--active");
	searchError.textContent = "";
	if (
		menu.classList.contains("nav__menu--active") &&
		nav.classList.contains("nav__elements--active")
	) {
		menu.classList.remove("nav__menu--active");
		nav.classList.remove("nav__elements--active");
	}
};

const menuActive = () => {
	menu.classList.toggle("nav__menu--active");
	nav.classList.toggle("nav__elements--active");
	if (searchInput.classList.contains("search-input--active")) {
		searchInput.classList.remove("search-input--active");
	}
};

menuElements.forEach((element) => {
	setTimeout(() => {
		element.addEventListener("click", menuActive);
	}, 1000);
});

const acceptSearch = () => {
	if (searchEnter.value !== "") {
		searchActive();
		searchEnter.value = "";
		searchError.textContent = "";
	} else {
		searchError.textContent = "You must type any text!";
	}
};

const declineSearch = () => {
	searchActive();
};

const handleObserver = () => {
	const currentSection = window.scrollY;
	allSections.forEach((section) => {
		if (
			section.classList.contains("red-nav") &&
			section.offsetTop <= currentSection
		) {
			navigation.classList.add("claret-style");
		} else if (
			!section.classList.contains("red-nav") &&
			section.offsetTop <= currentSection
		) {
			navigation.classList.remove("claret-style");
		}
	});
};

galleryElements.forEach((element, index) => {
	element.addEventListener("click", (el) => {
		popupOpen.classList.remove("gallery__popup--hidden");
		popupImg.src = el.target.src;
		currentIndexOfGallery = index;
	});
});

const closePopup = () => {
	popupOpen.classList.add("gallery__popup-fadingOut");
	setTimeout(() => {
		popupOpen.classList.add("gallery__popup--hidden");
		popupOpen.classList.remove("gallery__popup-fadingOut");
	}, 200);
};

const closePopupTarget = (e) => {
	if (e.target === popupOpen) {
		closePopup();
	}
};

const moveGalleryToRight = () => {
	if (currentIndexOfGallery === galleryElements.length - 1) {
		currentIndexOfGallery = 0;
	} else {
		currentIndexOfGallery++;
	}
	popupImg.src = galleryElements[currentIndexOfGallery].src;
};

const moveGalleryToLeft = () => {
	if (currentIndexOfGallery === 0) {
		currentIndexOfGallery = galleryElements.length - 1;
	} else {
		currentIndexOfGallery--;
	}
	popupImg.src = galleryElements[currentIndexOfGallery].src;
};

const keyCheck = (e) => {
	if (!popupOpen.classList.contains("gallery__popup--hidden")) {
		if (e.key === "Enter") {
			acceptSearch();
		} else if (e.key === "Escape") {
			declineSearch();
		} else if (e.key === "ArrowRight") {
			moveGalleryToRight();
		} else if (e.key === "ArrowLeft") {
			moveGalleryToLeft();
		}
	}
};

const handleYear = () => {
	const currentYear = new Date().getFullYear();
	year.innerText = currentYear;
};

handleYear();

// --- EVENT LISTENERS ---

searchButton.addEventListener("click", searchActive);
menu.addEventListener("click", menuActive);
searchButtonAccept.addEventListener("click", acceptSearch);
searchButtonDecline.addEventListener("click", declineSearch);
window.addEventListener("scroll", handleObserver);
popupClose.addEventListener("click", closePopup);
popupOpen.addEventListener("click", closePopupTarget);
arrowRight.addEventListener("click", moveGalleryToRight);
arrowLeft.addEventListener("click", moveGalleryToLeft);
document.addEventListener("keydown", keyCheck);
