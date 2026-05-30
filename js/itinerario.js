document.addEventListener('DOMContentLoaded', () => {
    const destinoSelect = document.getElementById('destinoSelect');

    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            const destinos = data.destinos;
            destinoSelect.innerHTML = '<option value="">Seleccione un destino</option>';
            destinos.forEach(destino => {
                const option = document.createElement('option');
                option.value = destino.nombre;
                option.textContent = destino.nombre;
                destinoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error cargando destinos:', error);
            destinoSelect.innerHTML = '<option value="">Error al cargar destinos</option>';
        });

    if (document.getElementById('mapa')) {
        const mapa = L.map('mapa').setView([-15.8402, -69.9562], 9);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OSM'
        }).addTo(mapa);

        L.marker([-15.8251, -69.6517]).addTo(mapa).bindPopup("Lago Titicaca");
        L.marker([-15.8237, -69.7132]).addTo(mapa).bindPopup("Islas Uros");
        L.marker([-15.6942, -70.0976]).addTo(mapa).bindPopup("Sillustani");
        L.marker([-15.7747, -69.6941]).addTo(mapa).bindPopup("Taquile");
        L.marker([-16.0251, -69.6443]).addTo(mapa).bindPopup("Cutimbo");
        L.marker([-15.8581, -70.0026]).addTo(mapa).bindPopup("Molloco");
        L.marker([-15.6583, -69.7274]).addTo(mapa).bindPopup("Amantani");
        L.marker([-15.8126, -70.1213]).addTo(mapa).bindPopup("Pucará");
        L.marker([-15.3644, -70.3663]).addTo(mapa).bindPopup("Lampa");
    }

    const form = document.getElementById('formItinerario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const diasInput = document.getElementById('dias');
    const presupuestoInput = document.getElementById('presupuesto');

    function validarCampo(input, condicion, mensaje) {
        if (condicion) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.innerText = mensaje;
            }
            return false;
        }
    }

    function validarFormulario() {
        let valido = true;
        valido &= validarCampo(nombreInput, nombreInput.value.trim().length >= 3, 'Mínimo 3 letras');
        valido &= validarCampo(emailInput, emailInput.value.includes('@') && emailInput.value.includes('.'), 'Correo válido requerido');
        valido &= validarCampo(diasInput, parseInt(diasInput.value) >= 1 && parseInt(diasInput.value) <= 15, 'Días entre 1 y 15');
        valido &= validarCampo(presupuestoInput, parseInt(presupuestoInput.value) >= 50, 'Mínimo S/ 50 por día');
        valido &= validarCampo(destinoSelect, destinoSelect.value !== '', 'Seleccione un destino');
        return valido;
    }

    function generarItinerario(destinoNombre, dias) {
    const planesBase = {
        "Titicaca": ["Llegada y paseo en bote", "Visita a islas del Sol y Luna", "Comunidades locales y regreso"],
        "Uros": ["Recorrido por islas flotantes", "Taller de artesanía en totora", "Navegación en balsa"],
        "Sillustani": ["Visita a las chullpas", "Caminata por laguna Umayo", "Miradores y fotografía"],
        "Taquile": ["Navegación y senderismo", "Conoce los tejidos tradicionales", "Encuentro con la comunidad"],
        "Cutimbo": ["Visita a las chullpas pintadas", "Mirador del altiplano", "Senderismo y picnic"],
        "Amantani": ["Llegada y noche con familia local", "Subida a templos Pachatata", "Convivencia y despedida"],
        "Molloco": ["Recorrido por las chullpas circulares", "Fotografía y naturaleza", "Visita a museo local"],
        "Pucará": ["Visita a la pirámide y museo lítico", "Talleres de cerámica", "Recorrido por el pueblo"],
        "Lampa": ["Visita al templo Santiago Apóstol", "Réplica de la Capilla Sixtina", "Recorrido cultural"]
    };
    let clave = Object.keys(planesBase).find(k => destinoNombre.includes(k));
    let actividades = clave ? planesBase[clave] : ["Recorrido por el destino", "Tiempo libre", "Actividades culturales"];
    let plan = "";
    for (let i = 0; i < dias; i++) {
        let actividad = actividades[i % actividades.length];
        plan += `Día ${i+1}: ${actividad}. `;
    }
    return plan;
}

    nombreInput.addEventListener('input', validarFormulario);
    emailInput.addEventListener('input', validarFormulario);
    diasInput.addEventListener('input', validarFormulario);
    presupuestoInput.addEventListener('input', validarFormulario);
    destinoSelect.addEventListener('change', validarFormulario);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validarFormulario()) {
                alert('Corrige los campos marcados en rojo');
                return;
            }
            const total = parseInt(diasInput.value) * parseInt(presupuestoInput.value);
            const itinerario = generarItinerario(destinoSelect.value, parseInt(diasInput.value));
            const resultado = document.getElementById('resultado');
            resultado.classList.remove('d-none');
            resultado.innerHTML = `${nombreInput.value.trim()}, presupuesto total para ${diasInput.value} días: S/ ${total}. Itinerario sugerido: ${itinerario}`;
        });
    }
});