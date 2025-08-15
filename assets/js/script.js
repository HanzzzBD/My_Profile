// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Ripple effect for hero section (desktop only)
$(document).ready(function() {
  // Check if device is mobile/touch
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window;
  
  if (!isMobile) {
    // Only initialize ripples on desktop
    $('.hero').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04
    });

    $('.hero').on('click', function(e) {
      var $el = $(this);
      var x = e.pageX - $el.offset().left;
      var y = e.pageY - $el.offset().top;
      var dropRadius = 20;
      var strength = 0.04 + Math.random() * 0.04;

      $el.ripples('drop', x, y, dropRadius, strength);
    });
  }
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Terima kasih, pesan Anda sudah terkirim.');
      this.reset();
    });
  }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(15,17,21,.95)';
  } else {
    header.style.background = 'rgba(15,17,21,.8)';
  }
});

// Add animation to skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.fill');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
      bar.style.transition = 'width 1s ease-in-out';
    }, 500);
  });
}

// Trigger skill bar animation when skills section is in view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector('#about');
if (skillsSection) {
  observer.observe(skillsSection);
}

// Modal Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img id="modal-img" src="" alt="">
      <div class="modal-caption" id="modal-caption"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Get modal elements
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.close');

  // Add click event to all portfolio images
  const portfolioImages = document.querySelectorAll('.grid .tile img');
  portfolioImages.forEach(img => {
    img.addEventListener('click', function() {
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt');
      const ariaLabel = this.parentElement.getAttribute('aria-label');
      
      modalImg.src = src;
      modalImg.alt = alt;
      modalCaption.textContent = ariaLabel || alt;
      
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal when clicking close button
  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
});
