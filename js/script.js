// ===== Toggle menu mobile =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== Tahun otomatis di footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Animasi muncul saat scroll (Intersection Observer) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .cert-card, .timeline-item, .section-title').forEach((el) => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ===== LOGIKA CAROUSEL 3D (INFINITE LOOP) =====
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  
  if (items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;

  // Fungsi untuk update class posisi setiap kartu
  function updateCarousel() {
    items.forEach((item, index) => {
      // Hapus semua class state
      item.classList.remove('active', 'prev', 'next', 'hidden');

      // Tentukan posisi index relatif terhadap index aktif saat ini
      // Menggunakan modulo agar berputar tanpa batas (infinite loop)
      const diff = (index - currentIndex + totalItems) % totalItems;

      if (diff === 0) {
        item.classList.add('active'); // Kartu di tengah
      } else if (diff === 1) {
        item.classList.add('next');   // Kartu di kanan (blur)
      } else if (diff === totalItems - 1) {
        item.classList.add('prev');   // Kartu di kiri (blur)
      } else {
        item.classList.add('hidden'); // Kartu sisanya disembunyikan
      }
    });
  }

  // Tombol Next (Kanan)
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  // Tombol Prev (Kiri)
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  // (Opsional) Klik pada kartu blur di kiri/kanan untuk pindah ke tengah
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('prev') || item.classList.contains('next')) {
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  // Inisialisasi pertama kali
  updateCarousel();
});