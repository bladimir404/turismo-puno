document.addEventListener('DOMContentLoaded', () => {
    const destinoSelect = document.getElementById('destinoSelect');
    console.log("Inicializando itinerario...");

    // INTENTA PRIMERO UNA RUTA, SI FALLA USA LA OTRA
    fetch('datos.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("JSON cargado correctamente desde raíz");
            cargarDestinos(data.destinos);
        })
        .catch(error => {
            console.error("Fallo en raíz, intentando en data/datos.json", error);
            fetch('data/datos.json')
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    console.log("JSON cargado desde data/");
                    cargarDestinos(data.destinos);
                })
                .catch(err => {
                    console.error("No se pudo cargar el JSON en ninguna ruta", err);
                    destinoSelect.innerHTML = '<option value="">Error al cargar destinos</option>';
                });
        });

    function cargarDestinos(destinos) {
        destinoSelect.innerHTML = '<option value="">Seleccione un destino</option>';
        destinos.forEach(destino => {
            const option = document.createElement('option');
            option.value = destino.nombre;
            option.textContent = destino.nombre;
            destinoSelect.appendChild(option);
        });
    }

    // MAPA: solo si existe el div, con coordenadas seguras
    const mapDiv = document.getElementById('mapa');
    if (mapDiv) {
        try {
            const mapa = L.map('mapa').setView([-15.8402, -69.9562], 9);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '© OSM'
            }).addTo(mapa);

            const lugares = [
                { nombre: "Lago Titicaca", coords: [-15.8251, -69.6517] },
                { nombre: "Islas Uros", coords: [-15.8237, -69.7132] },
                { nombre: "Sillustani", coords: [-15.6942, -70.0976] },
                { nombre: "Taquile", coords: [-15.7747, -69.6941] },
                { nombre: "Cutimbo", coords: [-16.0251, -69.6443] },
                { nombre: "Molloco", coords: [-15.8581, -70.0026] },
                { nombre: "Amantani", coords: [-15.6583, -69.7274] },
                { nombre: "Pucará", coords: [-15.8126, -70.1213] },
                { nombre: "Lampa", coords: [-15.3644, -70.3663] }
            ];

            lugares.forEach(lugar => {
                L.marker(lugar.coords).addTo(mapa)
                    .bindPopup(`<b>${lugar.nombre}</b>`)
                    .bindTooltip(lugar.nombre);
            });
            console.log("Mapa cargado con", lugares.length, "marcadores");
        } catch (e) {
            console.error("Error al cargar el mapa:", e);
        }
    } else {
        console.warn("No se encontró el div #mapa");
    }

    // Validación y formulario
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
        if (destinoSelect) {
            valido &= validarCampo(destinoSelect, destinoSelect.value !== '', 'Seleccione un destino');
        }
        return valido;
    }

    function generarItinerario(destinoNombre, dias) {
        const planes = {
            "Titicaca": "Día 1: Llegada y paseo en bote. Día 2: Islas del Sol y Luna. Día 3: Comunidades locales.",
            "Uros": "Día 1: Islas flotantes. Día 2: Taller de artesanía. Día 3: Navegación.",
            "Sillustani": "Día 1: Chullpas. Día 2: Laguna Umayo. Día 3: Miradores.",
            "Taquile": "Día 1: Senderismo. Día 2: Tejidos. Día 3: Comunidad.",
            "Cutimbo": "Día 1: Chullpas pintadas. Día 2: Mirador. Día 3: Senderismo.",
            "Molloco": "Día 1: Chullpas circulares. Día 2: Naturaleza. Día 3: Museo.",
            "Amantani": "Día 1: Llegada. Día 2: Templos. Día 3: Convivencia.",
            "Pucará": "Día 1: Pirámide. Día 2: Cerámica. Día 3: Pueblo.",
            "Lampa": "Día 1: Templo. Día 2: Capilla Sixtina. Día 3: Cultura."
        };
        let clave = Object.keys(planes).find(k => destinoNombre.includes(k));
        let plan = clave ? planes[clave] : "Día 1: Recorrido. Día 2: Tiempo libre. Día 3: Actividades.";
        if (dias === 1) return plan.split('.')[0] + '.';
        if (dias === 2) return plan.split('.')[0] + '.' + plan.split('.')[1] + '.';
        return plan;
    }

    if (nombreInput) nombreInput.addEventListener('input', validarFormulario);
    if (emailInput) emailInput.addEventListener('input', validarFormulario);
    if (diasInput) diasInput.addEventListener('input', validarFormulario);
    if (presupuestoInput) presupuestoInput.addEventListener('input', validarFormulario);
    if (destinoSelect) destinoSelect.addEventListener('change', validarFormulario);

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