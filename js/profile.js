// Verificar si el usuario está logueado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (!estaLogueado()) {
        window.location.href = '/login.html';
        return;
    }
    
    cargarDatosUsuario();
});

// Función para cargar los datos del usuario
function cargarDatosUsuario() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        // Actualizar nombre de usuario
        document.getElementById('userName').textContent = extraerNombreDeEmail(usuario.email);
        document.getElementById('userNameBilling').textContent = extraerNombreDeEmail(usuario.email);
        
        // Actualizar email
        document.getElementById('userEmail').textContent = usuario.email;
        
        // Actualizar campos de configuración
        document.getElementById('settingsEmail').value = usuario.email;
        document.getElementById('settingsName').value = extraerNombreDeEmail(usuario.email);
        
        // Datos de ejemplo (en una aplicación real vendrían de la base de datos)
        document.getElementById('userAddress').textContent = '4140 Parker Rd. Allentown, New Mexico 31134';
        document.getElementById('userPhone').textContent = '(671) 555-0110';
        document.getElementById('settingsPhone').value = '(671) 555-0110';
        document.getElementById('settingsAddress').value = '4140 Parker Rd. Allentown, New Mexico 31134';
    }
}

// Función para extraer nombre del email
function extraerNombreDeEmail(email) {
    const nombre = email.split('@')[0];
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

// Función para mostrar secciones
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(s => s.classList.remove('active'));
    
    // Remover clase active de todos los nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    document.getElementById(seccion + '-section').classList.add('active');
    
    // Agregar clase active al nav item correspondiente
    event.target.classList.add('active');
}

// Función para editar perfil
function editarPerfil() {
    mostrarSeccion('settings');
    // Actualizar navegación
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('[onclick="mostrarSeccion(\'settings\')"]').classList.add('active');
}

// Función para editar dirección
function editarDireccion() {
    mostrarSeccion('settings');
    // Actualizar navegación
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('[onclick="mostrarSeccion(\'settings\')"]').classList.add('active');
    
    // Enfocar el campo de dirección
    setTimeout(() => {
        document.getElementById('settingsAddress').focus();
    }, 100);
}

// Función para ir a Mi Cuenta (para usar en index.html)
function irAMiCuenta() {
    if (estaLogueado()) {
        window.location.href = '/profile.html';
    } else {
        window.location.href = '/login.html';
    }
}

// Manejar formulario de configuración
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí guardarías los cambios en la base de datos
            // Por ahora solo mostramos un mensaje
            alert('Configuración guardada exitosamente');
            
            // Actualizar los datos mostrados
            cargarDatosUsuario();
        });
    }
});