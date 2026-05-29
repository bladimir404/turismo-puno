document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mapa')) {
        const mapa = L.map('mapa').setView([-15.8402, -69.9562], 9);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        }).addTo(mapa);
        L.marker([-15.8251, -69.6517]).addTo(mapa).bindPopup("<b>Lago Titicaca</b>");
        L.marker([-15.8237, -69.7132]).addTo(mapa).bindPopup("<b>Islas Uros</b>");
        L.marker([-15.6942, -70.0976]).addTo(mapa).bindPopup("<b>Sillustani</b>");
        L.marker([-15.7747, -69.6941]).addTo(mapa).bindPopup("<b>Taquile</b>");
        L.marker([-16.0251, -69.6443]).addTo(mapa).bindPopup("<b>Cutimbo</b>");
    }

    const form = document.getElementById('formItinerario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const diasInput = document.getElementById('dias');
    const presupuestoInput = document.getElementById('presupuesto');
    const destinoSelect = document.getElementById('destinoSelect');

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
        valido &= validarCampo(nombreInput, nombreInput.value.trim().length >= 3, 'Minimo 3 letras');
        valido &= validarCampo(emailInput, emailInput.value.includes('@') && emailInput.value.includes('.'), 'Correo valido requerido');
        valido &= validarCampo(diasInput, parseInt(diasInput.value) >= 1 && parseInt(diasInput.value) <= 15, 'Dias entre 1 y 15');
        valido &= validarCampo(presupuestoInput, parseInt(presupuestoInput.value) >= 50, 'Minimo S/ 50 por dia');
        return valido;
    }

    function generarItinerario(destino, dias) {
        let plan = '';
        if (destino === 'Lago Titicaca') {
            plan = 'Dia 1: Llegada a Puno y paseo por el malecón. Dia 2: Navegacion a las islas del Sol y la Luna. Dia 3: Visita a comunidades locales.';
        } else if (destino === 'Islas Uros') {
            plan = 'Dia 1: Recorrido por las islas flotantes de totora. Dia 2: Taller de artesania Uros y navegacion en balsa.';
        } else if (destino === 'Sillustani') {
            plan = 'Dia 1: Visita a las chullpas y laguna Umayo. Dia 2: Excursion a los miradores cercanos.';
        } else {
            plan = 'Dia 1: Recorrido por el destino principal. Dia 2: Tiempo libre y actividades culturales.';
        }
        // Ajustar número de días si es mayor o menor
        if (dias <= 2) {
            return plan.split('.')[0] + '.';
        } else if (dias >= 4) {
            plan += ' Dia adicional: Explora otros atractivos cercanos.';
        }
        return plan;
    }

    nombreInput.addEventListener('input', validarFormulario);
    emailInput.addEventListener('input', validarFormulario);
    diasInput.addEventListener('input', validarFormulario);
    presupuestoInput.addEventListener('input', validarFormulario);

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
            resultado.innerHTML = `${nombre}, presupuesto total para ${dias} dias: S/ ${total}. Itinerario sugerido: ${itinerario}`;
        });
    }
});
