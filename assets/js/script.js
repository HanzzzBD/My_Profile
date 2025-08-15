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

// Custom Ripple Effect for both desktop and mobile
$(document).ready(function() {
  const hero = $('.hero');
  
  // Create canvas for ripple effect
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  
  // Add canvas to hero
  hero.css('position', 'relative');
  hero.append(canvas);
  
  // Set canvas size
  function resizeCanvas() {
    const rect = hero[0].getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Ripple class
  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = Math.max(canvas.width, canvas.height) * 0.3;
      this.opacity = 0.8;
      this.speed = 4;
      this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`; // Random blue-cyan colors
    }
    
    update() {
      this.radius += this.speed;
      this.opacity -= 0.015;
      return this.opacity > 0;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add inner circle for better effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }
  
  let ripples = [];
  let animationId;
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ripples = ripples.filter(ripple => {
      ripple.draw();
      return ripple.update();
    });
    
    if (ripples.length > 0) {
      animationId = requestAnimationFrame(animate);
    }
  }
  
  // Handle click/touch events
  function createRipple(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ripples.push(new Ripple(x, y));
    
    if (ripples.length === 1) {
      animate();
    }
  }
  
  // Add event listeners for both desktop and mobile
  hero.on('click touchstart', function(e) {
    e.preventDefault();
    createRipple(e);
  });
  
  // Add multiple ripples on touch move for mobile (with throttling)
  let lastTouchTime = 0;
  hero.on('touchmove', function(e) {
    e.preventDefault();
    const now = Date.now();
    if (now - lastTouchTime > 100 && e.touches.length > 0) { // Throttle to 100ms
      createRipple(e);
      lastTouchTime = now;
    }
  });
  
  // Add ripple on touch end for better mobile experience
  hero.on('touchend', function(e) {
    if (e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      ripples.push(new Ripple(x, y));
      if (ripples.length === 1) {
        animate();
      }
    }
  });
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
