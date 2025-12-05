document.addEventListener('DOMContentLoaded', function () {
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));
  if (!cards.length) return;

  let current = 0;
  const total = cards.length;

  // Apply the right state classes to each card
  function updateClasses() {
    cards.forEach((card, index) => {
      card.classList.remove('is-prev', 'is-active', 'is-next', 'is-hidden');

      if (index === current) {
        // center card
        card.classList.add('is-active');
      } else if (index === (current - 1 + total) % total) {
        // left card
        card.classList.add('is-prev');
      } else if (index === (current + 1) % total) {
        // right card
        card.classList.add('is-next');
      } else {
        // anything else
        card.classList.add('is-hidden');
      }
    });
  }

  function goNext() {
    current = (current + 1) % total;
    updateClasses();
  }

  function goPrev() {
    current = (current - 1 + total) % total;
    updateClasses();
  }

  // Buttons
  const nextBtn = document.querySelector('.testimonial-btn.next');
  const prevBtn = document.querySelector('.testimonial-btn.prev');

  if (nextBtn) nextBtn.addEventListener('click', goNext);
  if (prevBtn) prevBtn.addEventListener('click', goPrev);

  // Initial state
  updateClasses();

  // Auto-play
  let autoTimer = setInterval(goNext, 6000);

  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    });

    slider.addEventListener('mouseleave', () => {
      if (!autoTimer) {
        autoTimer = setInterval(goNext, 6000);
      }
    });
  }
});
