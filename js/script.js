document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Configuración básica del carrusel
    const carousel = new bootstrap.Carousel("#fullscreenCarousel", {
      interval: 50000000,
      pause: "hover",
      wrap: true,
      keyboard: true,
      touch: true,
    });

    // 2. Navegación con teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") carousel.next();
      if (e.key === "ArrowLeft") carousel.prev();
    });

    // 3. Ajuste de altura para móviles
    const adjustHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    window.addEventListener("resize", adjustHeight);
    adjustHeight();

    // 4. Carga dinámica de slides
    const slides = [
      "slides/slide1.html",
      "slides/slide2.html",
      "slides/slide3.html",
      "slides/slide4.html",
      "slides/slide5.html",
      "slides/slide6.html",
      "slides/slide7.html",
      // 'slides/slide8.html'
    ];

    const container = document.getElementById("slidesContainer");
    const indicators = document.getElementById("carouselIndicators");

    for (let i = 0; i < slides.length; i++) {
      const response = await fetch(slides[i]);
      if (!response.ok) throw new Error(`Error cargando ${slides[i]}`);

      const content = await response.text();
      const element = document.createElement("div");
      element.innerHTML = content;

      const slide = element.firstElementChild;
      slide.classList.add("carousel-item");
      if (i === 0) slide.classList.add("active");

      container.appendChild(slide);

      // Crear indicador
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.dataset.bsTarget = "#fullscreenCarousel";
      indicator.dataset.bsSlideTo = i;
      indicator.ariaLabel = `Slide ${i + 1}`;
      if (i === 0) {
        indicator.classList.add("active");
        indicator.setAttribute("aria-current", "true");
      }
      indicators.appendChild(indicator);
    }

    // 5. Bloqueo de scroll táctil (mejorado)
    document.body.addEventListener(
      "touchmove",
      (e) => {
        if (e.target.closest(".carousel")) e.preventDefault();
      },
      { passive: false }
    );
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("slidesContainer").innerHTML = `
            <div class="carousel-item active h-100 d-flex align-items-center justify-content-center bg-danger text-white">
                <h2>Error cargando el contenido</h2>
            </div>
        `;
  }
});
