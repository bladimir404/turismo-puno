fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        const gastronomiaData = data.gastronomia;
        const contenedor = document.getElementById('contenedorGastronomia');
        if (contenedor) {
            gastronomiaData.forEach(plato => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card h-100">
                        <img src="${plato.imagen}" class="card-img-top" alt="${plato.nombre}" style="height:180px; object-fit:cover;">
                        <div class="card-body">
                            <h5 class="card-title">${plato.nombre}</h5>
                            <p class="card-text">${plato.descripcion}</p>
                            <button class="btn btn-warning ver-receta" data-nombre="${plato.nombre}" data-receta="${plato.receta}">Ver receta</button>
                        </div>
                    </div>
                `;
                contenedor.appendChild(col);
            });
            document.querySelectorAll('.ver-receta').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.getElementById('recetaTitulo').innerText = btn.dataset.nombre;
                    document.getElementById('recetaCuerpo').innerHTML = `<strong>Preparación:</strong> ${btn.dataset.receta}`;
                    new bootstrap.Modal(document.getElementById('modalReceta')).show();
                });
            });
        }
    })
    .catch(error => console.error('Error cargando gastronomía:', error));
