// Admin Dashboard JavaScript

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el admin está logueado
    const adminSession = localStorage.getItem('admin_session');
    if (!adminSession) {
        window.location.href = 'admin-login.html';
        return;
    }

    // Inicializar dashboard
    initializeDashboard();
    loadDashboardData();
});

// Función para mostrar diferentes secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Actualizar menú activo
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    const activeMenuItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }

    // Cargar datos específicos de la sección
    loadSectionData(sectionId);
}

// Función para cerrar sesión
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('admin_session');
        window.location.href = 'admin-login.html';
    }
}

// Inicializar dashboard
function initializeDashboard() {
    // Configurar filtros de órdenes
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Aquí se implementará el filtrado cuando se conecte la BD
        });
    });

    // Configurar búsquedas
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Implementar búsqueda cuando se conecte la BD
            console.log('Buscando:', this.value);
        });
    });
}

// Cargar datos del dashboard (simulado)
function loadDashboardData() {
    // Datos simulados - se reemplazarán con datos reales de la BD
    const mockData = {
        totalClientes: 0,
        ordenesHoy: 0,
        ingresosMes: 0,
        productosVendidos: 0
    };

    // Actualizar estadísticas
    document.getElementById('total-clientes').textContent = mockData.totalClientes;
    document.getElementById('ordenes-hoy').textContent = mockData.ordenesHoy;
    document.getElementById('ingresos-mes').textContent = `S/${mockData.ingresosMes.toFixed(2)}`;
    document.getElementById('productos-vendidos').textContent = mockData.productosVendidos;
}

// Cargar datos específicos de cada sección
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'clientes':
            loadClientesData();
            break;
        case 'ordenes':
            loadOrdenesData();
            break;
        case 'historial':
            loadHistorialData();
            break;
        case 'ingresos':
            loadIngresosData();
            break;
        case 'dashboard':
            loadDashboardData();
            break;
    }
}

// Funciones para cargar datos de cada sección (simuladas)
function loadClientesData() {
    const clientesTable = document.getElementById('clientes-table');
    // Por ahora mostrar mensaje de no datos
    clientesTable.innerHTML = '<tr><td colspan="6" class="no-data">No hay clientes registrados aún. Los datos se cargarán cuando se conecte la base de datos.</td></tr>';
}

function loadOrdenesData() {
    const ordenesTable = document.getElementById('ordenes-table');
    // Por ahora mostrar mensaje de no datos
    ordenesTable.innerHTML = '<tr><td colspan="7" class="no-data">No hay órdenes registradas aún. Los datos se cargarán cuando se conecte la base de datos.</td></tr>';
}

function loadHistorialData() {
    // Los datos de historial ya están en el HTML como ejemplo
    console.log('Historial cargado');
}

function loadIngresosData() {
    // Actualizar datos de ingresos (simulados)
    const revenueAmounts = document.querySelectorAll('.revenue-amount');
    revenueAmounts.forEach(amount => {
        amount.textContent = 'S/0.00';
    });
    
    const revenueChanges = document.querySelectorAll('.revenue-change');
    revenueChanges.forEach(change => {
        change.textContent = '+0% vs período anterior';
    });
}

// Función para formatear números como moneda
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

// Función para formatear fechas
function formatDate(date) {
    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// Funciones que se implementarán cuando se conecte la base de datos
function addCliente() {
    alert('Función para agregar cliente - Se implementará con la base de datos');
}

function editCliente(id) {
    alert(`Función para editar cliente ${id} - Se implementará con la base de datos`);
}

function deleteCliente(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
        alert(`Función para eliminar cliente ${id} - Se implementará con la base de datos`);
    }
}

function viewOrden(id) {
    alert(`Función para ver orden ${id} - Se implementará con la base de datos`);
}

function updateOrdenStatus(id, status) {
    alert(`Función para actualizar orden ${id} a estado ${status} - Se implementará con la base de datos`);
}