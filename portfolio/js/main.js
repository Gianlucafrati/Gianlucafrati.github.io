// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FILTRO DE PROYECTOS
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const tarjetasProyectos = document.querySelectorAll('.proyecto');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // A) Quitar la clase 'activo' de todos los botones y ponérsela al clickeado
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            boton.classList.add('activo');

            // B) Obtener la categoría elegida
            const categoriaSeleccionada = boton.dataset.filtro;

            // C) Mostrar u ocultar las tarjetas según corresponda
            tarjetasProyectos.forEach(tarjeta => {
                const categoriaTarjeta = tarjeta.dataset.category;

                if (categoriaSeleccionada === 'todos' || categoriaTarjeta === categoriaSeleccionada) {
                    tarjeta.style.display = 'flex'; // Vuelve a mostrarla con flexbox
                } else {
                    tarjeta.style.display = 'none'; // La oculta
                }
            });
        });
    });

});

// Efecto de red de partículas (Canvas)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particulas = [];
    const cantidad = 45; // Número de partículas (no muy alto para que no distraiga)

    for (let i = 0; i < cantidad; i++) {
        particulas.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6, // Velocidad lenta y elegante
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
        });
    }

    function animar() {
        ctx.clearRect(0, 0, width, height);

        // Dibujar y mover partículas
        particulas.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebote en bordes
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Dibujar punto
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(20, 184, 166, 0.4)'; // Color teal
            ctx.fill();

            // Dibujar líneas entre partículas cercanas
            for (let j = index + 1; j < particulas.length; j++) {
                const p2 = particulas[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(20, 184, 166, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animar);
    }

    animar();
}