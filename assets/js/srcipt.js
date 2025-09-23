const slides = document.querySelectorAll(".slide");
let current = 0;

// ----- FONCTIONS -----
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// ----- INITIALISATION -----
showSlide(current);

// ----- BOUTONS CAROUSEL -----
document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
});

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// ----- DÉFILEMENT AUTOMATIQUE -----
let autoPlayEnabled = true;
let autoPlayInterval = setInterval(nextSlide, 5000);

// ----- TOGGLE AUTO-PLAY -----
const toggleAutoplayBtn = document.getElementById("toggle-autoplay");
if (toggleAutoplayBtn) {
  const toggleIcon = toggleAutoplayBtn.querySelector("i");

  toggleAutoplayBtn.addEventListener("click", () => {
    autoPlayEnabled = !autoPlayEnabled;

    if (autoPlayEnabled) {
      toggleIcon.classList.replace("fa-play", "fa-pause");
      autoPlayInterval = setInterval(nextSlide, 5000);
    } else {
      toggleIcon.classList.replace("fa-pause", "fa-play");
      clearInterval(autoPlayInterval);
    }

    // Petite animation visuelle
    toggleAutoplayBtn.classList.add("clicked");
    setTimeout(() => toggleAutoplayBtn.classList.remove("clicked"), 300);
  });
}

// ----- GESTION GALERIE -----
const galleryModal = document.getElementById("gallery-modal");
const btnShowAll = document.getElementById("btn-show-all");
const closeGallery = document.getElementById("close-gallery");

if (btnShowAll) {
  btnShowAll.addEventListener("click", () => galleryModal.classList.add("active"));
}

if (closeGallery) {
  closeGallery.addEventListener("click", () => galleryModal.classList.remove("active"));
}

if (galleryModal) {
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) galleryModal.classList.remove("active");
  });
}

// ----- LIGHTBOX -----
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("active");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => lightbox.classList.remove("active"));
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });
}

// ----- MUSIQUE -----
const bgMusic = document.getElementById("bg-music");

if (bgMusic) {
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {
    document.body.addEventListener("click", () => bgMusic.play(), { once: true });
  });
}
