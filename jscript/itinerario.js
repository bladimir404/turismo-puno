document.addEventListener('DOMContentLoaded', () => {
    // Elementos del formulario
    const form = document.getElementById('formItinerario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const diasInput = document.getElementById('dias');
    const presupuestoInput = document.getElementById('presupuesto');
    const destinoSelect = document.getElementById('destinoSelect');

    // Cargar destinos desde el JSON (ruta correcta desde jscript/ a data/)
    fetch('../data/datos.json')
        .then(response => response.json())
        .then(data => {
            const destinos = data.destinos;
            destinoSelect.innerHTML = ''; // Limpiar opción de carga
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

    // Mapa Leaflet
    if (document.getElementById('mapa')) {
        const mapa = L.map('mapa').setView([-15.8402, -69.9562], 9);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        }).addTo(mapa);
        L.marker([-15.8251, -69.6517]).addTo(mapa).bindPopup("Lago Titicaca");
        L.marker([-15.8237, -69.7132]).addTo(mapa).bindPopup("Islas Uros");
        L.marker([-15.6942, -70.0976]).addTo(mapa).bindPopup("Sillustani");
        L.marker([-15.7747, -69.6941]).addTo(mapa).bindPopup("Taquile");
        L.marker([-16.0251, -69.6443]).addTo(mapa).bindPopup("Cutimbo");
    }

    // Validación de campos
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

    // Generar itinerario según destino y días (ampliado para todos los destinos)
    function generarItinerario(destinoNombre, dias) {
        const planes = {
            "Titicaca": "Día 1: Llegada y paseo en bote. Día 2: Visita a islas del Sol y Luna.",
            "Uros": "Día 1: Recorrido por islas flotantes. Día 2: Taller de artesanía en totora.",
            "Sillustani": "Día 1: Visita a las chullpas. Día 2: Caminata por la laguna Umayo.",
            "Taquile": "Día 1: Navegación y senderismo. Día 2: Conoce los tejidos tradicionales.",
            "Cutimbo": "Día 1: Visita a las chullpas pintadas. Día 2: Mirador del altiplano.",
            "Amantani": "Día 1: Llegada y noche con familia local. Día 2: Subida a templos Pachatata.",
            "Molloco": "Día 1: Recorrido por las chullpas. Día 2: Fotografía y naturaleza.",
            "Pucará": "Día 1: Visita a la pirámide y museo lítico. Día 2: Talleres de cerámica."
        };
        let clave = Object.keys(planes).find(k => destinoNombre.includes(k));
        let plan = clave ? planes[clave] : "Día 1: Recorrido por el destino. Día 2: Tiempo libre.";
        if (dias <= 2) return plan.split('.')[0] + '.';
        if (dias >= 4) plan += " Día adicional: Visita otros atractivos cercanos.";
        return plan;
    }

    // Eventos para validación en tiempo real
    nombreInput.addEventListener('input', validarFormulario);
    emailInput.addEventListener('input', validarFormulario);
    diasInput.addEventListener('input', validarFormulario);
    presupuestoInput.addEventListener('input', validarFormulario);
    destinoSelect.addEventListener('change', validarFormulario);

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validarFormulario()) {
                alert('Corrige los campos marcados en rojo');
                return;
            }
            const nombre = nombreInput.value.trim();
            const dias = parseInt(diasInput.value);
            const presupuesto = parseInt(presupuestoInput.value);
            const destino = destinoSelect.value;
            const total = dias * presupuesto;
            const itinerario = generarItinerario(destino, dias);
            const resultado = document.getElementById('resultado');
            resultado.classList.remove('d-none');
            resultado.innerHTML = `${nombre}, presupuesto total para ${dias} días: S/ ${total}. Itinerario sugerido: ${itinerario}`;
        });
    }
});
