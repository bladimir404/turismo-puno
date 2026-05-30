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
        const mapa = L.map('mapa').setView([-15.84, -69.95], 9);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OSM'
        }).addTo(mapa);

        const puntos = [
            { nombre: "Lago Titicaca", coords: [-15.8251, -69.6517] },
            { nombre: "Islas Uros", coords: [-15.8237, -69.7132] },
            { nombre: "Sillustani", coords: [-15.6942, -70.0976] },
            { nombre: "Taquile", coords: [-15.7747, -69.6941] },
            { nombre: "Cutimbo", coords: [-16.0251, -69.6443] },
            { nombre: "Molloco", coords: [-15.6855, -70.0800] },
            { nombre: "Amantani", coords: [-15.6533, -69.7064] },
            { nombre: "Pucará", coords: [-15.5569, -70.3751] },
            { nombre: "Lampa", coords: [-15.3644, -70.3663] }
        ];

        puntos.forEach(p => {
            L.marker(p.coords).addTo(mapa)
                .bindPopup(`<b>${p.nombre}</b>`)
                .bindTooltip(p.nombre);
        });

        const ayuda = document.querySelector('.text-muted.small');
        if (ayuda) {
            ayuda.innerHTML = 'Marcadores: Lago Titicaca, Uros, Sillustani, Taquile, Cutimbo, Molloco, Amantani, Pucará, Lampa';
        }
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
        const planes = {
            "Titicaca": "Día 1: Llegada a Puno y paseo por el malecón. Día 2: Navegación a islas del Sol y la Luna. Día 3: Comunidades locales.",
            "Uros": "Día 1: Islas flotantes. Día 2: Taller de artesanía. Día 3: Intercambio cultural.",
            "Sillustani": "Día 1: Chullpas y laguna Umayo. Día 2: Miradores. Día 3: Senderismo.",
            "Taquile": "Día 1: Senderismo y tejidos. Día 2: Tradiciones. Día 3: Convivencia.",
            "Cutimbo": "Día 1: Chullpas pintadas. Día 2: Mirador del altiplano. Día 3: Exploración.",
            "Amantani": "Día 1: Llegada y noche familiar. Día 2: Templos Pachatata/Pachamama. Día 3: Despedida.",
            "Molloco": "Día 1: Chullpas circulares. Día 2: Fotografía. Día 3: Museo.",
            "Pucará": "Día 1: Pirámide y museo lítico. Día 2: Cerámica. Día 3: Pueblo.",
            "Lampa": "Día 1: Templo Santiago Apóstol. Día 2: Capilla Sixtina. Día 3: Recorrido cultural."
        };
        let clave = Object.keys(planes).find(k => destinoNombre.includes(k));
        let plan = clave ? planes[clave] : "Día 1: Recorrido por el destino. Día 2: Tiempo libre. Día 3: Actividades culturales.";
        if (dias === 1) return plan.split('.')[0] + '.';
        if (dias === 2) return plan.split('.')[0] + '.' + plan.split('.')[1] + '.';
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