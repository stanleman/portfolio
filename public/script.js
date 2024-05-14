const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".header");
function onToggleMenu(e) {
  e.name = e.name === "menu" ? "close" : "menu";
  navLinks.classList.toggle("top-[690px]");
}

// navLinks.classList.toggle("bg-white");
//   header.classList.toggle("bg-white");
//   header.classList.toggle("duration-300");

let sections = document.querySelectorAll("section");
let navigation = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navigation.forEach((links) => {
        links.classList.remove("bg-gradient-to-r");
        links.classList.remove("from-blue-500");
        links.classList.remove("to-purple-500");
        links.classList.remove("bg-cover");
        links.classList.remove("text-transparent");
        links.classList.remove("bg-clip-text");
        links.classList.remove("font-bold");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("bg-gradient-to-r");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("from-blue-500");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("to-purple-500");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("bg-cover");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("text-transparent");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("bg-clip-text");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("font-bold");
      });
    }
  });
};

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".vid-slide");
const slidetext = document.querySelectorAll(".slide-text");

var sliderNav = function (manual) {
  btns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  slides.forEach((slide) => {
    slide.classList.remove("vid-active");
  });

  slidetext.forEach((stext) => {
    stext.classList.remove("text-active");
  });

  btns[manual].classList.add("btn-active");
  slides[manual].classList.add("vid-active");
  slidetext[manual].classList.add("text-active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});

// const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
