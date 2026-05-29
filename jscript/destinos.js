let todosDestinos = [];

fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        todosDestinos = data.destinos;
        mostrarDestinos(todosDestinos);
    })
    .catch(error => console.error('Error cargando destinos:', error));

function mostrarDestinos(lista) {
    const contenedor = document.getElementById('galeriaDestinos');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    lista.forEach(destino => {
        const card = document.createElement('div');
        card.className = 'card card-destino h-100';
        card.innerHTML = `
            <img src="${destino.imagen}" class="card-img-top" alt="${destino.nombre}" style="height:200px; object-fit:cover;">
            <div class="card-body">
                <h5 class="card-title">${destino.nombre}</h5>
                <p class="card-text">${destino.descripcion}</p>
                <button class="btn btn-primary ver-mas" data-nombre="${destino.nombre}" data-detalle="${destino.detalle}">Ver más</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
    document.querySelectorAll('.ver-mas').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalTitulo').innerText = btn.dataset.nombre;
            document.getElementById('modalCuerpo').innerText = btn.dataset.detalle;
            new bootstrap.Modal(document.getElementById('modalDestino')).show();
        });
    });
}

function filtrarDestinos(categoria) {
    if (categoria === 'todos') {
        mostrarDestinos(todosDestinos);
    } else {
        const filtrados = todosDestinos.filter(d => d.categoria === categoria);
        mostrarDestinos(filtrados);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filtro-btn')) {
        const categoria = e.target.getAttribute('data-cat');
        filtrarDestinos(categoria);
    }
});
