const slides = document.querySelectorAll(".slide");
let current = 0;

// Afficher la slide courante
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

showSlide(current);

// Bouton suivant
document.querySelector(".next").addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

// Bouton précédent
document.querySelector(".prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// Défilement automatique
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// ----- GESTION GALERIE -----
const galleryModal = document.getElementById("gallery-modal");
const btnShowAll = document.getElementById("btn-show-all");
const closeGallery = document.getElementById("close-gallery");

btnShowAll.addEventListener("click", () => galleryModal.classList.add("active"));
closeGallery.addEventListener("click", () => galleryModal.classList.remove("active"));
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) galleryModal.classList.remove("active");
});

// ----- LIGHTBOX -----
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

// Ouvrir la lightbox au clic sur une image de la galerie
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("active");
  });
});

// Fermer la lightbox
lightboxClose.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});
