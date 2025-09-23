// ----- GÉNÉRATION DES IMAGES -----
    const totalImages = 46;
    const carouselContainer = document.getElementById("carousel-container");
    const galleryGrid = document.getElementById("gallery-grid");

    for (let i = 1; i <= totalImages; i++) {
      const imgCarousel = document.createElement("img");
      imgCarousel.src = `assets/img/img${i}.jpeg`;
      imgCarousel.classList.add("slide");
      if (i === 1) imgCarousel.classList.add("active"); // Première image active par défaut
      carouselContainer.appendChild(imgCarousel);

      const imgGallery = document.createElement("img");
      imgGallery.src = `assets/img/img${i}.jpeg`;
      galleryGrid.appendChild(imgGallery);
    }

    // ----- SLIDES -----
    const slides = document.querySelectorAll(".slide");
    let current = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    // ----- AUTOPLAY -----
    let autoPlayInterval = setInterval(nextSlide, 5000);
    const toggleAutoplayBtn = document.getElementById("toggle-autoplay");
    const toggleIcon = toggleAutoplayBtn.querySelector("i");
    let autoPlayEnabled = true;

    toggleAutoplayBtn.addEventListener("click", () => {
      if (autoPlayEnabled) {
        clearInterval(autoPlayInterval);
        toggleIcon.classList.replace("fa-pause", "fa-play");
      } else {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
        toggleIcon.classList.replace("fa-play", "fa-pause");
      }
      autoPlayEnabled = !autoPlayEnabled;
    });

    // ----- GALERIE -----
    const galleryModal = document.getElementById("gallery-modal");
    document.getElementById("btn-show-all").addEventListener("click", () => galleryModal.classList.add("active"));
    document.getElementById("close-gallery").addEventListener("click", () => galleryModal.classList.remove("active"));
    galleryModal.addEventListener("click", (e) => { if (e.target === galleryModal) galleryModal.classList.remove("active"); });

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
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("active"); });

    // ----- MUSIQUE -----
const bgMusic = document.getElementById("bg-music");
const toggleMusic = document.getElementById("toggle-music");

// Liste des musiques
const musicList = [
  "assets/audio/music4.mp3",
  "assets/audio/music2.mp3",
  "assets/audio/music3.mp3",
  "assets/audio/music1.mp3"
];

let currentMusicIndex = 0;

if (bgMusic) {
  bgMusic.volume = 0.3;
  bgMusic.src = musicList[currentMusicIndex];

  // Tenter de jouer automatiquement
  bgMusic.play().catch(() => {
    // Si autoplay bloqué → jouer au premier clic
    const playMusicOnce = () => {
      bgMusic.play();
      document.body.removeEventListener("click", playMusicOnce);
    };
    document.body.addEventListener("click", playMusicOnce);
  });

  // Bouton activer / désactiver la musique
  toggleMusic.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      toggleMusic.querySelector("i").classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
      bgMusic.pause();
      toggleMusic.querySelector("i").classList.replace("fa-volume-high", "fa-volume-xmark");
    }
  });

  // ---- Lecture automatique suivant morceau ----
  bgMusic.addEventListener("ended", () => {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    bgMusic.src = musicList[currentMusicIndex];
    bgMusic.play();
  });
}

// ----- MODAL MUSIQUE -----
const musicModal = document.getElementById("music-modal");
document.getElementById("btn-show-music").addEventListener("click", () => musicModal.classList.add("active"));
document.getElementById("close-music").addEventListener("click", () => musicModal.classList.remove("active"));
musicModal.addEventListener("click", (e) => { if (e.target === musicModal) musicModal.classList.remove("active"); });

// Changement manuel depuis la liste
document.querySelectorAll(".music-list li").forEach((item, index) => {
  item.addEventListener("click", () => {
    currentMusicIndex = index;
    bgMusic.src = item.dataset.src;
    bgMusic.play();
    musicModal.classList.remove("active");
  });
});
