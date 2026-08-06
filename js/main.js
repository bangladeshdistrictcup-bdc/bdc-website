// ===== BDC Website JS =====

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// Simple fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// Registration form success (demo)
const regForm = document.getElementById('regForm');
if (regForm) {
  regForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formBox = document.querySelector('.form-box');
    formBox.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <div style="font-size:60px; margin-bottom:16px;">✅</div>
        <h2 style="color:white; margin-bottom:12px;">Registration Submitted!</h2>
        <p style="color:rgba(255,255,255,0.7); margin-bottom:24px;">
          Thank you for registering your team for Bangladesh District Cup.<br>
          We will contact you soon via WhatsApp/Phone.
        </p>
        <a href="index.html" class="glass-btn glass-btn-gold">Back to Home</a>
      </div>
    `;
  });
}

// Contact form success (demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.innerHTML = `
      <div style="text-align:center; padding: 30px 10px;">
        <div style="font-size:50px; margin-bottom:12px;">✅</div>
        <h3 style="color:white; margin-bottom:8px;">Message Sent!</h3>
        <p style="color:rgba(255,255,255,0.6);">We will get back to you soon.</p>
      </div>
    `;
  });
}
