// Credenciales de administrador predefinidas
const ADMIN_CREDENTIALS = {
    email: 'admin@florista.com',
    password: 'Admin123!'
};

// Función para validar credenciales de administrador
function validarCredencialesAdmin(email, password) {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

// Función para mostrar errores
function mostrarErrorAdmin(elemento, mensaje) {
    if (!elemento) return;
    
    // Eliminar mensaje de error previo
    const errorPrevio = elemento.parentElement.querySelector('.error-message');
    if (errorPrevio) {
        errorPrevio.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = mensaje;
    elemento.parentElement.appendChild(errorElement);
    
    // Añadir clase de error al input
    elemento.style.borderColor = '#dc3545';
}

// Función para limpiar errores
function limpiarErrorAdmin(elemento) {
    if (!elemento) return;
    
    const errorElement = elemento.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    elemento.style.borderColor = '#e1e5e9';
}

// Función para guardar sesión de administrador
function guardarSesionAdmin(email) {
    localStorage.setItem('admin_session', JSON.stringify({
        email: email,
        loginTime: new Date().toISOString(),
        role: 'admin'
    }));
}

// Función para verificar si hay sesión de admin activa
function verificarSesionAdmin() {
    const session = localStorage.getItem('admin_session');
    return session !== null;
}

// Función para cerrar sesión de admin
function cerrarSesionAdmin() {
    localStorage.removeItem('admin_session');
    window.location.href = '/admin-login.html';
}

// Función para mostrar/ocultar contraseña
function togglePasswordAdmin(inputElement, toggleElement) {
    toggleElement.addEventListener('click', function() {
        const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
        inputElement.setAttribute('type', type);
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        // Configurar toggle de contraseña
        const passwordInput = document.getElementById('adminPassword');
        const passwordToggle = document.querySelector('.password-toggle');
        
        if (passwordInput && passwordToggle) {
            togglePasswordAdmin(passwordInput, passwordToggle);
        }
        
        // Manejar envío del formulario
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            
            let isValid = true;
            
            // Limpiar errores previos
            limpiarErrorAdmin(document.getElementById('adminEmail'));
            limpiarErrorAdmin(document.getElementById('adminPassword'));
            
            // Validar email
            if (!email) {
                mostrarErrorAdmin(document.getElementById('adminEmail'), 'El email es requerido');
                isValid = false;
            }
            
            // Validar contraseña
            if (!password) {
                mostrarErrorAdmin(document.getElementById('adminPassword'), 'La contraseña es requerida');
                isValid = false;
            }
            
            // Si los campos están llenos, validar credenciales
            if (isValid) {
                if (validarCredencialesAdmin(email, password)) {
                    // Login exitoso
                    guardarSesionAdmin(email);
                    alert('¡Acceso de administrador exitoso!');
                    // Redirigir al panel de administrador
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Credenciales incorrectas
                    mostrarErrorAdmin(document.getElementById('adminPassword'), 'Credenciales de administrador incorrectas');
                }
            }
        });
    }
});