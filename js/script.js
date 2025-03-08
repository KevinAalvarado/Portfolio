/**
 * Código principal para el portafolio de Kevin Alvarado
 * Incluye: menú móvil, animaciones scroll, smooth scrolling y efecto de fondo
 */
document.addEventListener('DOMContentLoaded', function () {
    // ======= CONFIGURACIÓN DEL MENÚ MÓVIL =======
    const setupMobileMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('menu');
        const overlay = document.getElementById('overlay');

        if (!hamburger || !menu || !overlay) return;

        function toggleMenu() {
            menu.classList.toggle('show');
            overlay.classList.toggle('show');
        }

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Solo cierra el menú para enlaces internos (no para el currículum)
        const menuLinks = menu.querySelectorAll('a:not([target="_blank"])');
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    };

    // ======= ANIMACIONES AL HACER SCROLL =======
    const setupScrollAnimations = () => {
        const fadeElements = document.querySelectorAll('.fade-in-section');

        // Mostrar elementos de la sección hero inmediatamente
        document.querySelectorAll('.hero .fade-in-section').forEach(element => {
            setTimeout(() => {
                element.classList.add('is-visible');
            }, 300);
        });

        function checkIfInView() {
            const windowHeight = window.innerHeight;
            const windowTopPosition = window.scrollY;
            const windowBottomPosition = windowTopPosition + windowHeight;

            fadeElements.forEach(function (element) {
                const elementHeight = element.offsetHeight;
                const elementTopPosition = element.offsetTop;
                const elementBottomPosition = elementTopPosition + elementHeight;

                if ((elementBottomPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottomPosition - 100)) {
                    element.classList.add('is-visible');
                }
            });
        }

        // Detectar elementos visibles al cargar la página
        checkIfInView();

        // Detectar elementos visibles al hacer scroll
        window.addEventListener('scroll', checkIfInView);

        // Recalcular al cambiar el tamaño de la ventana
        window.addEventListener('resize', checkIfInView);
    };

    // ======= SMOOTH SCROLLING =======
    const setupSmoothScrolling = () => {
        // Seleccionar solo enlaces internos (que apuntan a secciones con #)
        const internalLinks = document.querySelectorAll('a[href^="#"]:not([target="_blank"])');

        internalLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // Prevenir comportamiento default solo para enlaces internos
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Calcular posición de la sección
                    const offsetTop = targetSection.offsetTop;

                    // Ajustar por altura del header
                    const headerHeight = document.querySelector('header').offsetHeight;

                    // Realizar el scroll suave
                    window.scrollTo({
                        top: offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ======= EFECTO DE FONDO =======
    const setupBackgroundEffect = () => {
        // Crear el elemento de degradado
        const gradientEffect = document.createElement('div');
        gradientEffect.classList.add('background-gradient');

        // Insertar como primer elemento del body para que quede detrás de todo
        document.body.insertBefore(gradientEffect, document.body.firstChild);

        // Variables para controlar la posición
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        // Seguir el movimiento del mouse de manera muy suave
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animación suave para actualizar la posición del degradado
        const animateGradient = () => {
            // Interpolación muy suave
            const easing = 1;
            currentX += (mouseX - currentX) * easing;
            currentY += (mouseY - currentY) * easing;

            // Calcular posición en porcentaje para el radial-gradient
            const posX = (currentX / window.innerWidth) * 100;
            const posY = (currentY / window.innerHeight) * 100;

            // Actualizar posición del gradiente
            // Actualizar posición del gradiente
            gradientEffect.style.background = `
radial-gradient(
  circle at ${posX}% ${posY}%, 
  rgba(100, 255, 218, 0.07) 0%, 
  rgba(87, 203, 255, 0.07) 25%,
  rgba(17, 34, 64, 0.05) 50%,
  transparent 100%
)
`;

            requestAnimationFrame(animateGradient);
        };

        animateGradient();

        // Ajustar tamaño al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
        });
    };

    // Inicializar todas las funcionalidades
    setupMobileMenu();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupBackgroundEffect(); // Inicializar efecto de fondo
});