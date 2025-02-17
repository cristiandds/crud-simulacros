document.addEventListener('DOMContentLoaded', () => {
  const simulations = initSimulations();
  initSimulacrosPage(simulations);
});

function initSimulacrosPage(simulations) {
  // Mock data for simulacros - replace with real data later
  const mockSimulacros = [
    {
      id: 1,
      title: 'Simulacro UNI – Matemática',
      subtitle: 'Examen de Admisión 2024-I',
      area: 'matematica',
      difficulty: 'avanzado',
      university: 'uni',
      description: 'Preguntas enfocadas en álgebra, geometría y trigonometría. Ideal para estudiantes que buscan ingresar a carreras de ingeniería.',
      questions: 60,
      timeLimit: 180,
      progress: 0,
      isNew: true,
      icon: 'square-root-alt'
    },
    {
      id: 2,
      title: 'Simulacro UNMSM – Ciencias',
      subtitle: 'Examen General 2024',
      area: 'ciencias',
      difficulty: 'intermedio',
      university: 'unmsm',
      description: 'Simulacro que abarca física, química y biología. Preparado según el último modelo de examen de San Marcos.',
      questions: 50,
      timeLimit: 150,
      progress: 30,
      isPopular: true,
      icon: 'flask'
    },
    {
      id: 3,
      title: 'Simulacro PUCP – Humanidades',
      subtitle: 'Examen de Admisión 2024',
      area: 'humanidades',
      difficulty: 'basico',
      university: 'pucp',
      description: 'Enfoque en comprensión lectora, razonamiento verbal y materias humanísticas.',
      questions: 40,
      timeLimit: 120,
      progress: 0,
      icon: 'book'
    }
  ];

  renderSimulacros(mockSimulacros);
  initFilters(mockSimulacros);
  initSearch();
  initModalHandlers();
}

function renderSimulacros(simulacros) {
  const grid = document.querySelector('.simulacros-grid');
  grid.innerHTML = simulacros.map((simulacro, index) => `
    <article class="simulacro-card" style="animation-delay: ${index * 0.1}s">
      <div class="simulacro-header">
        ${simulacro.isNew ? '<span class="tag">Nuevo</span>' : 
          simulacro.isPopular ? '<span class="tag">Popular</span>' : ''}
        <h3 class="simulacro-title">
          <i class="fas fa-${simulacro.icon}"></i>
          ${simulacro.title}
        </h3>
        <p class="simulacro-subtitle">${simulacro.subtitle}</p>
      </div>
      
      <div class="simulacro-content">
        <div class="simulacro-stats">
          <div class="simulacro-stat">
            <i class="fas fa-question-circle"></i>
            ${simulacro.questions} preguntas
          </div>
          <div class="simulacro-stat">
            <i class="fas fa-clock"></i>
            ${simulacro.timeLimit} minutos
          </div>
        </div>
        
        <p class="simulacro-description">${simulacro.description}</p>
      </div>
      
      <div class="simulacro-footer">
        ${simulacro.progress > 0 ? `
          <div class="simulacro-progress">
            <span>${simulacro.progress}% completado</span>
            <div class="progress-bar">
              <div class="progress-bar-fill" style="width: ${simulacro.progress}%"></div>
            </div>
          </div>
        ` : '<div></div>'}
        
        <button class="btn-start" onclick="showSimulacroDetails(${simulacro.id})">
          <i class="fas fa-play"></i>
          Iniciar
        </button>
      </div>
    </article>
  `).join('');
}

function initFilters(simulacros) {
  const filterInputs = document.querySelectorAll('.filter-option input');
  
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      const activeFilters = {
        area: Array.from(document.querySelectorAll('input[type="checkbox"][value]'))
          .filter(cb => cb.checked)
          .map(cb => cb.value),
        difficulty: document.querySelector('input[name="difficulty"]:checked')?.value,
        university: Array.from(document.querySelectorAll('input[value="uni"], input[value="unmsm"], input[value="pucp"]'))
          .filter(cb => cb.checked)
          .map(cb => cb.value)
      };

      const filteredSimulacros = simulacros.filter(simulacro => {
        const areaMatch = activeFilters.area.length === 0 || activeFilters.area.includes(simulacro.area);
        const difficultyMatch = !activeFilters.difficulty || simulacro.difficulty === activeFilters.difficulty;
        const universityMatch = activeFilters.university.length === 0 || activeFilters.university.includes(simulacro.university);
        
        return areaMatch && difficultyMatch && universityMatch;
      });

      renderSimulacros(filteredSimulacros);
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchSimulacros');
  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredSimulacros = mockSimulacros.filter(simulacro => 
        simulacro.title.toLowerCase().includes(searchTerm) ||
        simulacro.description.toLowerCase().includes(searchTerm)
      );
      renderSimulacros(filteredSimulacros);
    }, 300);
  });
}

function initModalHandlers() {
  window.showSimulacroDetails = (simulacroId) => {
    const simulacro = mockSimulacros.find(s => s.id === simulacroId);
    if (!simulacro) return;

    const modal = document.getElementById('examModal');
    modal.style.display = 'flex';
    
    modal.querySelector('.modal-content').innerHTML = `
      <div class="exam-details">
        <h2>${simulacro.title}</h2>
        <p class="exam-subtitle">${simulacro.subtitle}</p>
        
        <div class="exam-info">
          <div class="info-item">
            <i class="fas fa-question-circle"></i>
            <span>${simulacro.questions} preguntas</span>
          </div>
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>${simulacro.timeLimit} minutos</span>
          </div>
          <div class="info-item">
            <i class="fas fa-graduation-cap"></i>
            <span>${simulacro.university.toUpperCase()}</span>
          </div>
        </div>
        
        <p class="exam-description">${simulacro.description}</p>
        
        <div class="exam-actions">
          <button class="btn-start-exam" onclick="startExam(${simulacro.id})">
            <i class="fas fa-play"></i>
            Comenzar Examen
          </button>
          <button class="btn-close" onclick="closeModal()">
            Cancelar
          </button>
        </div>
      </div>
    `;
  };

  window.closeModal = () => {
    document.getElementById('examModal').style.display = 'none';
  };

  window.startExam = (simulacroId) => {
    // Implement exam start logic here
    console.log(`Starting exam ${simulacroId}`);
    closeModal();
  };

  // Close modal when clicking outside
  document.getElementById('examModal').addEventListener('click', (e) => {
    if (e.target.id === 'examModal') {
      closeModal();
    }
  });
}