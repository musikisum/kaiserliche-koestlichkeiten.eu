// Carousel
(function () {
  var carousels = document.querySelectorAll('[data-carousel]');
  if (!carousels.length) return;

  var indices = {};
  carousels.forEach(function (el) {
    var id = el.dataset.carousel;
    var images = JSON.parse(el.dataset.images);
    indices[id] = 0;
    el.src = images[0];
    el.onclick = function () {
      var href = el.closest('a') ? null : el.dataset.href;
      if (href) window.location.href = href;
    };
    el._images = images;
  });

  setInterval(function () {
    carousels.forEach(function (el) {
      var id = el.dataset.carousel;
      indices[id] = (indices[id] + 1) % el._images.length;
      el.src = el._images[indices[id]];
    });
  }, 4000);
})();

// Lightbox
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
}

if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
}
