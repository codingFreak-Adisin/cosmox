
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Toggle menu icon
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
  
  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (testimonials.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    
    // Only apply slider functionality on mobile if there are multiple testimonials
    if (testimonials.length > 1 && window.innerWidth < 768) {
      // Hide all testimonials except the first one on mobile
      testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          testimonial.style.display = 'none';
        }
      });
      
      // Function to show a specific slide
      function showSlide(index) {
        testimonials.forEach(testimonial => {
          testimonial.style.display = 'none';
        });
        
        dots.forEach(dot => {
          dot.classList.remove('active');
        });
        
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
        currentSlide = index;
      }
      
      // Event listeners for dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlide(index);
        });
      });
      
      // Event listeners for previous and next buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          let newIndex = currentSlide - 1;
          if (newIndex < 0) {
            newIndex = testimonials.length - 1;
          }
          showSlide(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
          let newIndex = currentSlide + 1;
          if (newIndex >= testimonials.length) {
            newIndex = 0;
          }
          showSlide(newIndex);
        });
      }
    }
  }
  
  // Back to Top button functionality
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Header scroll effect
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        header.style.padding = '12px 0';
        header.style.backgroundColor = 'rgba(8, 10, 19, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.padding = '16px 0';
        header.style.backgroundColor = 'rgba(8, 10, 19, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add parallax effect to stars
  const starField = document.querySelector('.star-field');
  
  if (starField) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const stars = starField.querySelectorAll('div');
      
      stars.forEach((star, index) => {
        const speed = 0.2 + (index * 0.1);
        star.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }
  
  // Simple image lightbox for any image with class "lightbox-image"
  const lightboxImages = document.querySelectorAll('.lightbox-image');
  
  lightboxImages.forEach(image => {
    image.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';
      
      const lightboxImage = document.createElement('img');
      lightboxImage.src = this.src;
      
      const closeButton = document.createElement('span');
      closeButton.className = 'lightbox-close';
      closeButton.innerHTML = '&times;';
      
      lightboxContent.appendChild(lightboxImage);
      lightboxContent.appendChild(closeButton);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);
      
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
      
      // Add lightbox closing functionality
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeButton) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });
});
