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

// ===== Gallery Lightbox + Like + Comment =====
(function () {
  if (!document.querySelector('.photo-item')) return;

  // Create lightbox once
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" type="button">×</button>
    <div class="lightbox-placeholder" id="lbMedia">Photo</div>
    <div class="lightbox-actions">
      <div class="like-row">
        <button class="like-btn" id="lbLike" type="button">♡ Like</button>
        <span class="like-count" id="lbLikeCount">0 likes</span>
      </div>
      <div class="comment-box">
        <input type="text" id="lbCommentInput" placeholder="Write a comment...">
        <button type="button" id="lbCommentBtn">Post</button>
      </div>
      <div class="comment-list" id="lbComments"></div>
    </div>
  `;
  document.body.appendChild(lb);

  let currentId = '';

  function storageKey(id, type) {
    return 'bdc_gallery_' + type + '_' + id;
  }

  function getLikes(id) {
    return parseInt(localStorage.getItem(storageKey(id, 'likes')) || '0', 10);
  }

  function getLiked(id) {
    return localStorage.getItem(storageKey(id, 'liked')) === '1';
  }

  function getComments(id) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(id, 'comments')) || '[]');
    } catch (e) {
      return [];
    }
  }

  function openLightbox(item, index) {
    currentId = location.pathname + '_photo_' + index;
    const media = document.getElementById('lbMedia');
    const img = item.querySelector('img');

    if (img) {
      media.outerHTML = '<img class="lightbox-img" id="lbMedia" src="' + img.src + '" alt="Photo">';
    } else {
      media.outerHTML = '<div class="lightbox-placeholder" id="lbMedia">' + (item.textContent.trim() || 'Photo') + '</div>';
    }

    updateLikeUI();
    renderComments();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLikeUI() {
    const liked = getLiked(currentId);
    const count = getLikes(currentId);
    const btn = document.getElementById('lbLike');
    const cnt = document.getElementById('lbLikeCount');
    btn.textContent = liked ? '♥ Liked' : '♡ Like';
    btn.classList.toggle('liked', liked);
    cnt.textContent = count + (count === 1 ? ' like' : ' likes');
  }

  function renderComments() {
    const list = document.getElementById('lbComments');
    const comments = getComments(currentId);
    list.innerHTML = comments.length
      ? comments.map(c => '<div>' + c + '</div>').join('')
      : '<div style="opacity:0.5">No comments yet</div>';
  }

  document.querySelectorAll('.photo-item').forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(item, index));
  });

  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.getElementById('lbLike').addEventListener('click', () => {
    let count = getLikes(currentId);
    if (getLiked(currentId)) {
      localStorage.setItem(storageKey(currentId, 'liked'), '0');
      localStorage.setItem(storageKey(currentId, 'likes'), Math.max(0, count - 1));
    } else {
      localStorage.setItem(storageKey(currentId, 'liked'), '1');
      localStorage.setItem(storageKey(currentId, 'likes'), count + 1);
    }
    updateLikeUI();
  });

  document.getElementById('lbCommentBtn').addEventListener('click', () => {
    const input = document.getElementById('lbCommentInput');
    const text = input.value.trim();
    if (!text) return;
    const comments = getComments(currentId);
    comments.push(text);
    localStorage.setItem(storageKey(currentId, 'comments'), JSON.stringify(comments));
    input.value = '';
    renderComments();
  });
})();
