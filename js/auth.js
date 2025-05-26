// Funciones para manejar la autenticación

// Validaciones según normas ISO
const validaciones = {
    // Validar email (formato básico)
    validarEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Validar contraseña (mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número)
    validarPassword: function(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    },
    
    // Validar que las contraseñas coincidan
    validarPasswordsIguales: function(password, confirmPassword) {
        return password === confirmPassword;
    }
};

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
    if (!elemento) return; // <-- Previene el error si el elemento no existe
    // Eliminar mensaje de error previo si existe
    const errorPrevio = elemento.parentElement.querySelector('.error-message');
    if (errorPrevio) {
        errorPrevio.remove();
    }
    
    // Crear y añadir nuevo mensaje de error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = mensaje;
    elemento.parentElement.appendChild(errorElement);
    
    // Añadir clase de error al input
    elemento.classList.add('error');
}

// Función para limpiar errores
function limpiarError(elemento) {
    if (!elemento) return; // <-- Previene el error si el elemento no existe
    const errorElement = elemento.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    elemento.classList.remove('error');
}

// Función para guardar usuario en el archivo de texto (simulado con localStorage)
function guardarUsuario(email, password) {
    // En un entorno real, esto se haría con una petición al servidor
    // Aquí simulamos guardando en localStorage
    
    // Obtener usuarios existentes o crear array vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        return false; // Usuario ya existe
    }
    
    // Añadir nuevo usuario
    usuarios.push({
        email: email,
        password: password, // En un entorno real, NUNCA guardar contraseñas en texto plano
        fechaRegistro: new Date().toISOString()
    });
    
    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // También guardar en un archivo de texto (simulado)
    guardarEnArchivo(usuarios);
    
    return true;
}

// Función para simular guardado en archivo de texto
function guardarEnArchivo(datos) {
    // En un entorno real, esto se haría en el servidor
    // Aquí solo simulamos el proceso
    console.log('Datos guardados en "archivo.txt":', datos);
    
    // Si quisiéramos descargar un archivo real (solo para demostración)
    /*
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.txt';
    a.click();
    URL.revokeObjectURL(url);
    */
}

// Función para verificar credenciales
function verificarCredenciales(email, password) {
    // Obtener usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Buscar usuario por email y contraseña
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        // Guardar sesión del usuario
        localStorage.setItem('usuarioActual', JSON.stringify({
            email: usuario.email,
            fechaRegistro: usuario.fechaRegistro,
            fechaLogin: new Date().toISOString()
        }));
        return true;
    }
    
    return false;
}

// Función para obtener usuario actual
function obtenerUsuarioActual() {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
}

// Función para verificar si el usuario está logueado
function estaLogueado() {
    return obtenerUsuarioActual() !== null;
}

// Función para mostrar/ocultar contraseña
function togglePassword(inputElement, toggleElement) {
    toggleElement.addEventListener('click', function() {
        const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
        inputElement.setAttribute('type', type);
        
        // Cambiar icono (esto requeriría tener dos iconos diferentes)
        // toggleElement.querySelector('img').src = type === 'password' ? '/images/eye.svg' : '/images/eye-slash.svg';
    });
}

// Inicializar funcionalidad cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Configurar toggles de contraseña
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        if (passwordInput && passwordToggles[0]) {
            togglePassword(passwordInput, passwordToggles[0]);
        }
        
        if (confirmPasswordInput && passwordToggles[1]) {
            togglePassword(confirmPasswordInput, passwordToggles[1]);
        }
        
        // Manejar envío del formulario
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            let isValid = true;
            
            // Validar email
            if (!validaciones.validarEmail(email)) {
                mostrarError(document.getElementById('email'), 'Por favor, introduce un email válido');
                isValid = false;
            } else {
                limpiarError(document.getElementById('email'));
            }
            
            // Validar contraseña
            if (!validaciones.validarPassword(password)) {
                mostrarError(document.getElementById('password'), 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
                isValid = false;
            } else {
                limpiarError(document.getElementById('password'));
            }
            
            // Validar confirmación de contraseña
            if (!validaciones.validarPasswordsIguales(password, confirmPassword)) {
                mostrarError(document.getElementById('confirmPassword'), 'Las contraseñas no coinciden');
                isValid = false;
            } else {
                limpiarError(document.getElementById('confirmPassword'));
            }
            
            // Validar términos y condiciones
            if (!terms) {
                mostrarError(document.getElementById('terms'), 'Debes aceptar los términos y condiciones');
                isValid = false;
            } else {
                limpiarError(document.getElementById('terms'));
            }
            
            // Si todo es válido, guardar usuario
            if (isValid) {
                const registroExitoso = guardarUsuario(email, password);
                
                if (registroExitoso) {
                    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                    window.location.href = '/login.html';
                } else {
                    mostrarError(document.getElementById('email'), 'Este email ya está registrado');
                }
            }
        });
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Configurar toggle de contraseña
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.querySelector('.password-toggle');
        
        if (passwordInput && passwordToggle) {
            togglePassword(passwordInput, passwordToggle);
        }
        
        // Manejar envío del formulario
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            let isValid = true;
            
            // Validar email
            if (!validaciones.validarEmail(email)) {
                mostrarError(document.getElementById('email'), 'Por favor, introduce un email válido');
                isValid = false;
            } else {
                limpiarError(document.getElementById('email'));
            }
            
            // Validar contraseña (solo que no esté vacía para el login)
            if (!password) {
                mostrarError(document.getElementById('password'), 'Por favor, introduce tu contraseña');
                isValid = false;
            } else {
                limpiarError(document.getElementById('password'));
            }
            
            // Si todo es válido, verificar credenciales
            if (isValid) {
                const loginExitoso = verificarCredenciales(email, password);
                
                if (loginExitoso) {
                    alert('¡Inicio de sesión exitoso!');
                    window.location.href = '/profile.html'; // Redirigir al perfil
                } else {
                    alert('Email o contraseña incorrectos');
                }
            }
        });
    }
});


// Función para cerrar sesión
function logout() {
    // Eliminar datos de sesión del localStorage
    localStorage.removeItem('usuarioActual');
    
    // Redirigir al usuario a la página de inicio o login
    window.location.href = '/login.html';
    
    // Opcional: Mostrar mensaje de cierre de sesión exitoso
    alert('Has cerrado sesión correctamente');
}

// Mostrar/ocultar el menú desplegable al hacer clic en el icono de usuario
document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.querySelector('.user-dropdown');
            if (dropdown) { // <-- Previene el error si no existe
                dropdown.classList.toggle('show');
                // Cerrar el menú cuando se hace clic fuera de él
                document.addEventListener('click', function closeDropdown(event) {
                    if (!userIcon.contains(event.target)) {
                        dropdown.classList.remove('show');
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            }
        });
    }
});

// Función para cerrar sesión
function toggleDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}
function logout() {
  localStorage.removeItem('usuarios');
  window.location.href = '/login.html';
}