export function initTestimonials() {
  const testimonials = [
    {
      type: 'student',
      name: "María García",
      role: "Estudiante",
      university: "Universidad Nacional Mayor de San Marcos",
      message: "Gracias a SimuPro logré ingresar a Medicina. Los simulacros son muy realistas y el feedback es excelente.",
      score: "Puesto 5 de 1500",
      avatar: "M"
    },
    {
      type: 'teacher',
      name: "Prof. Juan Pérez",
      role: "Profesor",
      institution: "Academia Preuniversitaria Excellence",
      message: "SimuPro me permite crear simulacros personalizados y hacer seguimiento detallado del progreso de mis alumnos.",
      experience: "10 años de experiencia",
      avatar: "J"
    },
    {
      type: 'student',
      name: "Carlos Rodriguez",
      role: "Estudiante", 
      university: "Pontificia Universidad Católica del Perú",
      message: "La plataforma me ayudó a identificar mis puntos débiles y mejorarlos. ¡Ingresé en mi primer intento!",
      score: "95% de aciertos",
      avatar: "C"
    }
  ];

  class TestimonialSlider {
    constructor(container) {
      this.container = container;
      this.currentSlide = 0;
      this.testimonials = testimonials;
      this.init();
    }

    init() {
      this.render();
      this.startAutoSlide();
      this.addControls();
    }

    render() {
      this.container.innerHTML = `
        <div class="testimonials-track">
          ${this.testimonials.map((t, i) => this.createSlide(t, i)).join('')}
        </div>
        <div class="testimonial-controls">
          <button class="prev-testimonial">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <div class="testimonial-dots">
            ${this.testimonials.map((_, i) => `
              <button class="dot ${i === this.currentSlide ? 'active' : ''}" data-index="${i}"></button>
            `).join('')}
          </div>
          <button class="next-testimonial">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6L8.59 7.41 13.17 12z"/>
            </svg>
          </button>
        </div>
      `;
      this.updateSlides();
    }

    createSlide(testimonial, index) {
      const isTeacher = testimonial.type === 'teacher';
      return `
        <div class="testimonial-card ${testimonial.type}" data-index="${index}">
          <div class="testimonial-content">
            <div class="testimonial-avatar">${testimonial.avatar}</div>
            <div class="testimonial-role">
              <i class="fas fa-${isTeacher ? 'chalkboard-teacher' : 'user-graduate'}"></i>
              ${testimonial.role}
            </div>
            <div class="testimonial-quote">"${testimonial.message}"</div>
            <div class="testimonial-author">
              <h3>${testimonial.name}</h3>
              <p class="institution">${isTeacher ? testimonial.institution : testimonial.university}</p>
              <p class="achievement">${isTeacher ? testimonial.experience : testimonial.score}</p>
            </div>
          </div>
        </div>
      `;
    }

    updateSlides() {
      const slides = this.container.querySelectorAll('.testimonial-card');
      const dots = this.container.querySelectorAll('.dot');
      
      slides.forEach((slide, index) => {
        const offset = index - this.currentSlide;
        slide.style.transform = `translateX(${offset * 100}%)`;
        slide.style.opacity = offset === 0 ? '1' : '0.5';
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
      this.updateSlides();
    }

    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
      this.updateSlides();
    }

    goToSlide(index) {
      this.currentSlide = index;
      this.updateSlides();
    }

    startAutoSlide() {
      setInterval(() => this.nextSlide(), 5000);
    }

    addControls() {
      this.container.querySelector('.prev-testimonial').addEventListener('click', () => this.prevSlide());
      this.container.querySelector('.next-testimonial').addEventListener('click', () => this.nextSlide());
      
      this.container.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
          this.goToSlide(parseInt(dot.dataset.index));
        });
      });
    }
  }

  const container = document.querySelector('.testimonials-slider');
  if (container) {
    new TestimonialSlider(container);
  }
}