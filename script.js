document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const carousel = new bootstrap.Carousel(document.getElementById('fullscreenCarousel'), {
        interval: 5000, // 5 segundos entre transiciones
        pause: 'hover', // Pausa al hacer hover
        wrap: true, // Ciclo infinito
        keyboard: true, // Navegación con teclado
        touch: true // Soporte táctil
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            carousel.next();
        } else if (e.key === 'ArrowLeft') {
            carousel.prev();
        }
    });

    // Ajustar altura en dispositivos móviles
    function adjustHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', adjustHeight);
    adjustHeight();
});

document.addEventListener('DOMContentLoaded', async () => {
    // Lista de slides disponibles
    const slides = [
        'slides/slide1.html',
        'slides/slide2.html',
        'slides/slide3.html'
        // Añade más slides según necesites
    ];

    const slidesContainer = document.getElementById('slidesContainer');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    // Cargar cada slide y añadirlo al carrusel
    for (let i = 0; i < slides.length; i++) {
        // Cargar el contenido del slide
        const response = await fetch(slides[i]);
        const slideContent = await response.text();
        
        // Crear elemento slide
        const slideElement = document.createElement('div');
        slideElement.innerHTML = slideContent;
        
        // Marcar el primer slide como activo
        if (i === 0) {
            slideElement.firstElementChild.classList.add('active');
        }
        
        // Añadir slide al contenedor
        slidesContainer.appendChild(slideElement.firstElementChild);

        // Crear indicador para este slide
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = '#fullscreenCarousel';
        indicator.dataset.bsSlideTo = i;
        indicator.ariaLabel = `Slide ${i + 1}`;
        if (i === 0) indicator.classList.add('active');
        
        indicatorsContainer.appendChild(indicator);
    }

    // Inicializar el carrusel
    const carousel = new bootstrap.Carousel('#fullscreenCarousel', {
        interval: 5000,
        wrap: true,
        keyboard: true,
        touch: true
    });

    // Bloquear scroll
    document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
});