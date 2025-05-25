document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para las miniaturas de producto
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.product-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Cambiar la imagen principal
                const imgSrc = this.querySelector('img').src;
                mainImage.src = imgSrc;
                
                // Actualizar la clase activa
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Funcionalidad para los botones de cantidad
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
    
    // Funcionalidad para las pestañas de producto
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Actualizar botones activos
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar contenido de pestaña correspondiente
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Funcionalidad para filtros de catálogo
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catalogItems = document.querySelectorAll('.catalog-item');
    
    if (filterBtns.length > 0 && catalogItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Actualizar botones activos
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar elementos del catálogo
                catalogItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Funcionalidad para añadir al carrito
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Animación del botón
            this.classList.add('btn-pulse');
            setTimeout(() => {
                this.classList.remove('btn-pulse');
            }, 300);
            
            // Animación del icono del carrito
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.classList.add('cart-bounce');
                setTimeout(() => {
                    cartIcon.classList.remove('cart-bounce');
                }, 500);
            }
            
            // Aquí podrías añadir código para realmente añadir el producto al carrito
            alert('¡Producto añadido al carrito!');
        });
    }
    
    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.catalog-item, .suggestion-item, .product-card, .hero-content, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-in');
            }
        });
        
        // Animar el footer cuando se llega a él
        const footer = document.querySelector('footer');
        if (footer) {
            const footerPosition = footer.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (footerPosition < screenPosition) {
                footer.classList.add('footer-animate');
            }
        }
    }
    
    // Ejecutar animación al cargar la página
    animateOnScroll();
    
    // Ejecutar animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Función para manejar el menú desplegable del usuario
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar u ocultar el menú de usuario según el estado de login
    const userIcon = document.querySelector('.user-icon');
    const userDropdown = document.querySelector('.user-dropdown');
    // Si tienes un id, por ejemplo: const userDropdown = document.getElementById('userDropdown');

    // Verifica si el usuario está logeado
    const usuarioLogeado = localStorage.getItem('usuarios');

    if (userIcon && userDropdown) {
        if (usuarioLogeado) {
            // Mostrar el icono y el menú de usuario
            userIcon.style.display = 'block';
        } else {
            // Ocultar el icono y el menú de usuario
            userIcon.style.display = 'none';
        }
    }
    
    if (userIcon) {
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.querySelector('.user-dropdown');
            if (dropdown) { // <-- Añadido para evitar el error
                dropdown.classList.toggle('active');
            }
            // Cerrar el menú cuando se hace clic fuera de él
            document.addEventListener('click', function closeDropdown(event) {
                if (!userIcon.contains(event.target)) {
                    if (dropdown) { // <-- Añadido para evitar el error
                        dropdown.classList.remove('active');
                    }
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    }
    
    // Función para cerrar sesión
    const logoutLink = document.querySelector('.user-dropdown a[href="/logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Eliminar datos de sesión del localStorage
            localStorage.removeItem('usuarios');
            // Redirigir a la página de inicio o login
            window.location.href = '/login.html';
        });
    }
});