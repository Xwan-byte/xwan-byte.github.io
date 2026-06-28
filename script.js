// Array teks untuk efek ketik (typewriter) pada tagline
const texts = [
    "Hardware & Web Enthusiast.", 
    "Pengembang Sistem Embedded.", 
    "Mahasiswa Rekayasa Sistem Komputer."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

// Fungsi Efek Typewriter
function typeWriter() {
    const targetElement = document.getElementById("typewriter-text");
    if (!targetElement) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Hapus karakter
        targetElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Kecepatan hapus lebih cepat
    } else {
        // Tambah karakter
        targetElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Kecepatan ketik normal
    }

    // Logika pergantian teks
    if (!isDeleting && charIndex === currentText.length) {
        // Selesai mengetik satu kalimat, beri jeda sebelum menghapus
        isDeleting = true;
        typeSpeed = 1500; 
    } else if (isDeleting && charIndex === 0) {
        // Selesai menghapus, lanjut ke kalimat berikutnya
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Jeda sebelum mulai mengetik kalimat baru
    }

    setTimeout(typeWriter, typeSpeed);
}

// Fungsi Smooth Scrolling untuk Navigasi Menu
function initSmoothScrolling() {
    // Pilih semua link navigasi yang mengarah ke id tertentu
    const navLinks = document.querySelectorAll('.vintage-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Kalkulasi posisi scroll dengan mengabaikan tinggi navbar fixed
                const navHeight = document.querySelector('.vintage-nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fungsi Efek Interaktif Kursor bergaya Vintage (Kursor Bulat yang Mengikuti)
function initVintageCursor() {
    // Buat elemen kursor kustom
    const cursorTrail = document.createElement('div');
    cursorTrail.style.position = 'fixed';
    cursorTrail.style.width = '24px';
    cursorTrail.style.height = '24px';
    cursorTrail.style.borderRadius = '50%';
    cursorTrail.style.backgroundColor = 'rgba(107, 112, 92, 0.3)'; // Warna hijau zaitun transparan
    cursorTrail.style.pointerEvents = 'none'; // Agar tidak menghalangi klik ke elemen bawahnya
    cursorTrail.style.transform = 'translate(-50%, -50%)';
    cursorTrail.style.transition = 'transform 0.1s ease-out, width 0.3s, height 0.3s, background-color 0.3s';
    cursorTrail.style.zIndex = '9999';
    cursorTrail.style.mixBlendMode = 'multiply'; // Efek blend vintage
    
    document.body.appendChild(cursorTrail);

    // Ikuti pergerakan mouse
    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    });

    // Membesar sedikit ketika mouse diklik
    document.addEventListener('mousedown', () => {
        cursorTrail.style.width = '35px';
        cursorTrail.style.height = '35px';
        cursorTrail.style.backgroundColor = 'rgba(112, 66, 20, 0.4)'; // Berubah warna menjadi sepia
    });

    document.addEventListener('mouseup', () => {
        cursorTrail.style.width = '24px';
        cursorTrail.style.height = '24px';
        cursorTrail.style.backgroundColor = 'rgba(107, 112, 92, 0.3)';
    });
    
    // Berikan efek khusus ketika cursor melayang di atas elemen yang dapat diklik
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorTrail.style.width = '45px';
            cursorTrail.style.height = '45px';
            cursorTrail.style.borderRadius = '8px'; // Menjadi agak kotak/tumpul untuk highlight
            cursorTrail.style.backgroundColor = 'rgba(112, 66, 20, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursorTrail.style.width = '24px';
            cursorTrail.style.height = '24px';
            cursorTrail.style.borderRadius = '50%';
            cursorTrail.style.backgroundColor = 'rgba(107, 112, 92, 0.3)';
        });
    });
}

// Inisialisasi semua fungsi ketika seluruh dokumen HTML telah dimuat (DOM Ready)
document.addEventListener('DOMContentLoaded', () => {
    // Memulai efek animasi pengetikan dengan sedikit penundaan
    setTimeout(typeWriter, 1000); 
    
    // Mengaktifkan smooth scrolling
    initSmoothScrolling();
    
    // Mengaktifkan kustom kursor interaktif hanya pada perangkat yang memiliki mouse (bukan touch screen)
    if(window.matchMedia("(pointer: fine)").matches) {
        initVintageCursor();
    }
});
