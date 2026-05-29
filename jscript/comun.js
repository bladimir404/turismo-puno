document.addEventListener('DOMContentLoaded', () => {
    const navbarHtml = `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html"><i class="bi bi-mountain"></i> Qhipa Inkapa Purinan</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav ms-auto mb-2 mb-md-0">
                    <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="destinos.html">Destinos</a></li>
                    <li class="nav-item"><a class="nav-link" href="cultura.html">Cultura</a></li>
                    <li class="nav-item"><a class="nav-link" href="gastronomia.html">Gastronomía</a></li>
                    <li class="nav-item"><a class="nav-link" href="itinerario.html">Itinerario</a></li>
                    <li class="nav-item"><a class="nav-link btn-modo" id="modoOscuroBtn"><i class="bi bi-moon-stars"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML('afterbegin', navbarHtml);

    const footerHtml = `
    <footer class="bg-dark text-white text-center py-4 mt-4">
        <div class="container">
            <p class="mb-1">📧 QIPunoTurismo@gmail.com | 📞 +51 928 239 912</p>
            <small>© 2026 Turismo Puno - Paqarina kawsayta qaway, Altiplanota amachay</small>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHtml);

    const modoBtn = document.getElementById('modoOscuroBtn');
    if (modoBtn) {
        modoBtn.addEventListener('click', () => {
            document.body.classList.toggle('modo-oscuro');
            const icono = modoBtn.querySelector('i');
            if (document.body.classList.contains('modo-oscuro')) {
                icono.classList.remove('bi-moon-stars');
                icono.classList.add('bi-sun');
            } else {
                icono.classList.remove('bi-sun');
                icono.classList.add('bi-moon-stars');
            }
            localStorage.setItem('modoOscuro', document.body.classList.contains('modo-oscuro'));
        });
        if (localStorage.getItem('modoOscuro') === 'true') {
            document.body.classList.add('modo-oscuro');
            const icono = modoBtn.querySelector('i');
            icono.classList.replace('bi-moon-stars', 'bi-sun');
        }
    }
});