fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        const culturaData = data.cultura;
        const acordeon = document.getElementById('accordionCultura');
        if (acordeon) {
            acordeon.innerHTML = '';
            culturaData.forEach((item, index) => {
                const accordionItem = `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">${item.titulo}</button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#accordionCultura">
                            <div class="accordion-body">${item.contenido}</div>
                        </div>
                    </div>
                `;
                acordeon.insertAdjacentHTML('beforeend', accordionItem);
            });
        }
    })
    .catch(error => console.error('Error cargando cultura:', error));
