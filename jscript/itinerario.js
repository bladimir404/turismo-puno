document.addEventListener('DOMContentLoaded', () => {
    // Mapa
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

    // Elementos del formulario
    const form = document.getElementById('formItinerario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const diasInput = document.getElementById('dias');
    const presupuestoInput = document.getElementById('presupuesto');
    const destinoSelect = document.getElementById('destinoSelect');

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

    // Generar itinerario personalizado
    function generarItinerario(destino, dias) {
        const planes = {
            "Lago Titicaca": "Día 1: Llegada y paseo en bote. Día 2: Visita a islas del Sol y Luna. Día 3: Comunidades locales.",
            "Islas Uros": "Día 1: Recorrido por islas flotantes. Día 2: Taller de artesanía. Día 3: Navegación en balsa.",
            "Sillustani": "Día 1: Visita a chullpas. Día 2: Caminata por laguna Umayo. Día 3: Miradores.",
            "Taquile": "Día 1: Navegación y senderismo. Día 2: Tejidos tradicionales. Día 3: Encuentro con comunidades.",
            "Molloco": "Día 1: Recorrido por chullpas. Día 2: Fotografía y naturaleza. Día 3: Excursión cultural.",
            "Amantani": "Día 1: Llegada y noche con familia. Día 2: Subida a templos Pachatata. Día 3: Convivencia.",
            "Pucará": "Día 1: Pirámide y museo lítico. Día 2: Talleres de cerámica. Día 3: Visita a talleres.",
            "Cutimbo": "Día 1: Chullpas pintadas. Día 2: Mirador del altiplano. Día 3: Senderismo.",
            "Lampa": "Día 1: Templo Santiago Apóstol. Día 2: Capilla Sixtina puneña. Día 3: Recorrido urbano."
        };
        let plan = planes[destino] || "Día 1: Recorrido por el destino. Día 2: Tiempo libre. Día 3: Actividades culturales.";
        if (dias <= 2) return plan.split('.')[0] + '.';
        if (dias >= 4) plan += " Día adicional: Explora otros atractivos cercanos.";
        return plan;
    }

    // Eventos en tiempo real
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
            const total = parseInt(diasInput.value) * parseInt(presupuestoInput.value);
            const itinerario = generarItinerario(destinoSelect.value, parseInt(diasInput.value));
            const resultado = document.getElementById('resultado');
            resultado.classList.remove('d-none');
            resultado.innerHTML = `${nombreInput.value.trim()}, presupuesto total para ${diasInput.value} días: S/ ${total}. Itinerario sugerido: ${itinerario}`;
        });
    }
});
