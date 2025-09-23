// ----- GÉNÉRATION DES IMAGES -----
const totalImages = 45; // Tu peux changer ce nombre si tu ajoutes encore plus de photos
const carouselContainer = document.getElementById("carousel-container");
const galleryGrid = document.getElementById("gallery-grid");

for (let i = 1; i <= totalImages; i++) {
  const imgCarousel = document.createElement("img");
  imgCarousel.src = `assets/img/img${i}.jpeg`;
  imgCarousel.classList.add("slide");
  if (i === 1) imgCarousel.classList.add("active"); // 2ᵉ image active par défaut
  carouselContainer.appendChild(imgCarousel);

  const imgGallery = document.createElement("img");
  imgGallery.src = `assets/img/img${i}.jpeg`;
  galleryGrid.appendChild(imgGallery);
}

// ----- SLIDES -----
const slides = document.querySelectorAll(".slide");
let current = 1; // commence sur la 2e image

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// ----- CONTROLES -----
document.querySelector(".next").addEventListener("click", nextSlide);

document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// Défilement automatique
let autoPlayEnabled = true;
let autoPlayInterval = setInterval(nextSlide, 5000);

// Bouton pause/play autoplay
const toggleAutoplayBtn = document.getElementById("toggle-autoplay");
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
});

// ----- MUSIC MODAL-----
const musicModal = document.getElementById ("music-modal");
document.getElementById ("btn-show-music").addEventListener ("click", () => {
    musicModal.classList.add("active");
});
document.getElementById ("close-music").addEventListener ("click", () => {
    musicModal.classList.remove("active");
});
musicModal.addEventListener("click", (e) => {
    if (e.target === musicModal) musicModal.classList.remove("active");
});

// ----- GALERIE -----
const galleryModal = document.getElementById("gallery-modal");
document.getElementById("btn-show-all").addEventListener("click", () => {
  galleryModal.classList.add("active");
});
document.getElementById("close-gallery").addEventListener("click", () => {
  galleryModal.classList.remove("active");
});
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) galleryModal.classList.remove("active");
});

// ----- LIGHTBOX -----
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

galleryGrid.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("active");
  });
});

lightboxClose.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// ----- MUSIQUE -----
const bgMusic = document.getElementById("bg-music");
const toggleMusic = document.getElementById("toggle-music");

if (bgMusic) {
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {
    document.body.addEventListener("click", () => bgMusic.play(), { once: true });
  });

  toggleMusic.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      toggleMusic.querySelector("i").classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
      bgMusic.pause();
      toggleMusic.querySelector("i").classList.replace("fa-volume-high", "fa-volume-xmark");
    }
  });
}
