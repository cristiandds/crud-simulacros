import { initAuth } from './auth.js';
import { initSimulations } from './simulations.js';
import { initStats } from './stats.js';
import { initTestimonials } from './testimonials.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initSimulations();
  initStats();
  initTestimonials();
  initAnimations();
  initMobileMenu();
  initParallax();
});

function initAnimations() {
  // Animate hero section elements on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('stat')) {
          animateStats(entry.target);
        } else if (entry.target.classList.contains('benefit-card')) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  document.querySelectorAll('.stat, .benefit-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

function animateStats(statElement) {
  const numberElement = statElement.querySelector('.stat-number');
  const targetValue = parseInt(statElement.dataset.value);
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let currentValue = 0;
  const increment = targetValue / steps;

  const updateValue = () => {
    currentValue += increment;
    if (currentValue <= targetValue) {
      numberElement.textContent = Math.round(currentValue).toLocaleString();
      setTimeout(updateValue, stepDuration);
    } else {
      numberElement.textContent = targetValue.toLocaleString();
    }
  };

  updateValue();
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Enhanced scroll handler for header
  let lastScroll = 0;
  const scrollThreshold = 50; // Minimum scroll distance before showing/hiding header
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Always show header at top of page
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      header.classList.remove('scroll-down');
      return;
    }
    
    // Don't do anything if change in scroll is less than threshold
    if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
      return;
    }
    
    // Hide header when scrolling down
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    }
    // Show header when scrolling up
    else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.menu-toggle')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Close mobile menu when window is resized to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initParallax() {
  const hero = document.querySelector('.hero');
  const heroIllustration = document.querySelector('.hero-illustration');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && heroIllustration) {
      heroIllustration.style.transform = `translateY(${scrolled * 0.4}px)`;
      hero.querySelector('.hero-content').style.transform = `translateY(${scrolled * -0.2}px)`;
    }
  });
}