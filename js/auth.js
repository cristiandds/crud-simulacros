export function initAuth() {
  const loginBtn = document.querySelector('.btn-login');
  const registerBtn = document.querySelector('.btn-register');
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');

  // Initialize login modal
  loginBtn?.addEventListener('click', () => {
    showLoginModal();
  });

  // Initialize register modal
  registerBtn?.addEventListener('click', () => {
    showRegisterModal();
  });

  function showLoginModal() {
    loginModal.innerHTML = `
      <div class="modal-content">
        <h2>Iniciar Sesión</h2>
        <div class="user-type-selector">
          <button class="user-type active" data-type="student">
            <i class="fas fa-user-graduate"></i>
            Estudiante
          </button>
          <button class="user-type" data-type="teacher">
            <i class="fas fa-chalkboard-teacher"></i>
            Profesor
          </button>
        </div>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required>
          </div>
          <button type="submit" class="btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            Ingresar
          </button>
        </form>
        <p>¿No tienes cuenta? <a href="#" class="switch-to-register">Regístrate</a></p>
      </div>
    `;
    loginModal.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    
    // Handle user type selection
    document.querySelectorAll('.user-type').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.user-type').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  function showRegisterModal() {
    registerModal.innerHTML = `
      <div class="modal-content">
        <h2>Registro</h2>
        <form id="registerForm">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input type="text" id="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <input type="password" id="confirmPassword" required>
          </div>
          <button type="submit" class="btn-primary">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="#" class="switch-to-login">Inicia sesión</a></p>
      </div>
    `;
    registerModal.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
  }

  async function handleLogin(e) {
    e.preventDefault();
    // Add login logic here
  }

  async function handleRegister(e) {
    e.preventDefault();
    // Add register logic here
  }
}