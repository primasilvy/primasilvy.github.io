// Mendeklarasikan variabel hanya sekali
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let darkModeIcon = document.querySelector("#darkMode-icon");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let header = document.querySelector(".header");

// Toggle untuk menu navigasi
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Menu Toggle untuk mobile
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x"); // Menambah atau menghapus kelas untuk ikon hamburger
  navbar.classList.toggle("active"); // Menampilkan atau menyembunyikan navbar
};

// Scroll Event untuk mengaktifkan link aktif di navbar
window.onscroll = () => {
  let top = window.scrollY;

  // Menangani highlight link aktif saat scroll
  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
    }
  });

  // Menambahkan kelas sticky ke header saat scroll
  header.classList.toggle("sticky", top > 100);

  // Menutup menu jika scroll
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Dark Mode Toggle
darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun"); // Menambahkan atau menghapus ikon matahari
  document.body.classList.toggle("dark-mode"); // Mengubah tema gelap atau terang
};

// Inisialisasi Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Scroll Reveal untuk animasi muncul saat scroll
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img img, .services-container, .journey-box, .chapter-wrapper, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", { origin: "right" });
