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
    const catalogGrid = document.querySelector('.catalog-grid');
    
    if (filterBtns.length > 0 && catalogItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Actualizar botones activos
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Ocultar todos los elementos primero
                catalogItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Mostrar solo los elementos filtrados
                const filteredItems = Array.from(catalogItems).filter(item => {
                    return filter === 'all' || item.getAttribute('data-category') === filter;
                });
                
                // Mostrar los elementos filtrados
                filteredItems.forEach(item => {
                    item.style.display = 'block';
                });
                
                // Reorganizar el grid para eliminar espacios vacíos
                if (filter !== 'all') {
                    // Aplicar estilos para reorganizar el grid
                    catalogGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                    catalogGrid.style.gridGap = '30px';
                    
                    // Asegurar que los elementos visibles ocupen las primeras posiciones
                    filteredItems.forEach((item, index) => {
                        // Calcular la posición en el grid
                        const row = Math.floor(index / 3);
                        const col = index % 3;
                        
                        // Aplicar posición específica
                        item.style.gridRow = row + 1;
                        item.style.gridColumn = col + 1;
                    });
                } else {
                    // Restaurar el orden original para la opción "Todos"
                    catalogItems.forEach(item => {
                        item.style.gridRow = 'auto';
                        item.style.gridColumn = 'auto';
                    });
                }
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

    function toggleDropdown() {
        const dropdown = document.getElementById("userDropdown");
        dropdown.classList.toggle("show");
    }

    // Opcional: cerrar si haces clic fuera
    window.addEventListener("click", function (e) {
        if (!e.target.closest(".user-menu-container")) {
            document.getElementById("userDropdown").classList.remove("show");
        }
    });

    function irAMiCuenta() {
        window.location.href = "/mi-cuenta"; // Ajusta la URL
    }

    // Función para manejar la visibilidad y comportamiento del menú de usuario
    document.addEventListener('DOMContentLoaded', function() {
        // Seleccionar elementos del DOM
        const userIcon = document.querySelector('.user-icon');
        const userDropdown = document.querySelector('.user-dropdown');
        const cartIcons = document.querySelector('.cart-icons');
        const loginButton = document.getElementById('loginButton');
        
        // Verificar si el usuario está logeado consultando localStorage
        const usuarioLogeado = localStorage.getItem('usuarios');
    
        if (cartIcons && userIcon && userDropdown) {
            if (usuarioLogeado) {
                // Si hay un usuario logeado, mostrar el icono y permitir el menú desplegable
                userIcon.style.display = 'block';
                // Añadir clase para permitir el hover
                cartIcons.classList.add('logged-in');
                // Ocultar el botón de inicio de sesión
                if (loginButton) loginButton.style.display = 'none';
            } else {
                // Si no hay usuario logeado, ocultar el icono y el menú desplegable
                userIcon.style.display = 'none';
                userDropdown.style.display = 'none';
                // Remover clase para desactivar el hover
                cartIcons.classList.remove('logged-in');
                // Mostrar el botón de inicio de sesión
                if (loginButton) loginButton.style.display = 'block';
            }
        }
        
        // Función para cerrar sesión
        const logoutLink = document.querySelector('.user-dropdown a[onclick="logout()"]');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                // Eliminar información del usuario del localStorage
                localStorage.removeItem('usuarios');
                // Redirigir a la página de login
                window.location.href = "/login.html";
            });
        }
    });

    // Función para cerrar sesión (accesible globalmente)
    function logout() {
        // Eliminar información del usuario del localStorage
        localStorage.removeItem('usuarios');
        // Redirigir a la página de login
        window.location.href = "/login.html";
    }