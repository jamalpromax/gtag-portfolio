// ==========================
// NAV ACTIVE STATE
// ==========================
const navMenu = document.querySelectorAll("nav a");

const removeActiveClass = () => {
  navMenu.forEach((item) => {
    item.classList.remove("active");
  });
};

navMenu.forEach((item) => {
  item.addEventListener("click", () => {
    removeActiveClass();
    item.classList.add("active");
  });
});

// ==========================
// THEME TOGGLE + LOCAL STORAGE
// ==========================
const themeBtn = document.querySelector(".theme__btn");

themeBtn.addEventListener("click", () => {
  if (document.body.className == "") {
    document.body.className = "dark";
    localStorage.setItem("portfolio__theme", "dark");
    themeBtn.innerHTML = `<i class="ph ph-sun"></i>`;
  } else {
    document.body.className = "";
    localStorage.setItem("portfolio__theme", "");
    themeBtn.innerHTML = `<i class="ph ph-moon"></i>`;
  }
});

// Apply theme on reload
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("portfolio__theme") || "";
  document.body.className = savedTheme;
  if (document.body.className == "") {
    themeBtn.innerHTML = `<i class="ph ph-moon"></i>`;
  } else {
    themeBtn.innerHTML = `<i class="ph ph-sun"></i>`;
  }
});

// ==========================
// TESTIMONIALS ANIMATION
// ==========================
window.addEventListener("load", () => {
  const track = document.querySelector(".testimonials__track");
  if (track) {
    const testimonials = [...track.children];

    // Duplicate testimonials for seamless loop
    testimonials.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    const card = testimonials[0];
    const cardWidth = card.offsetWidth;
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || 0);

    const totalCards = testimonials.length; // only originals
    const distance = (cardWidth + gap) * totalCards;

    const speed = 100; // px per second
    const duration = distance / speed;

    track.style.animationDuration = `${duration}s`;
  }
});

// ==========================
// DRAGGABLE NAV WITH BOUNDARY CHECK
// ==========================
const nav = document.querySelector("nav");
let offsetX,
  offsetY,
  isDragging = false;

function moveNav(x, y) {
  const navWidth = nav.offsetWidth;
  const navHeight = nav.offsetHeight;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Clamp values so nav stays fully visible
  let newLeft = Math.min(Math.max(0, x - offsetX), screenWidth - navWidth);
  let newTop = Math.min(Math.max(0, y - offsetY), screenHeight - navHeight);

  nav.style.left = newLeft + "px";
  nav.style.top = newTop + "px";
  nav.style.bottom = "auto"; // disable bottom positioning
  nav.style.transform = "none"; // disable center transform
}

// Mouse Events
nav.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - nav.offsetLeft;
  offsetY = e.clientY - nav.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) moveNav(e.clientX, e.clientY);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Touch Events
nav.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - nav.offsetLeft;
  offsetY = touch.clientY - nav.offsetTop;
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    moveNav(touch.clientX, touch.clientY);
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});
