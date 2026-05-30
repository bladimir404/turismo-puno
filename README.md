# Turismo Puno

Sitio web para promover el turismo, la cultura y la gastronomía de la región Puno, Perú.

## Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, variables, media queries)
- Bootstrap 5.3
- JavaScript (DOM, eventos, fetch, localStorage)
- Leaflet.js
- JSON local

## Estructura del proyecto

- `index.html` - Inicio con carrusel y geografía
- `destinos.html` - Galería de destinos con filtros y badges
- `cultura.html` - Acordeón con tradiciones (Candelaria, danzas, textilería)
- `gastronomia.html` - Cards de platos típicos con recetas en modal
- `itinerario.html` - Formulario, cálculo de presupuesto, mapa interactivo e itinerario personalizado
- `css/estilo.css` - Estilos personalizados (modo oscuro, grid, animaciones)
- `js/` - Archivos JavaScript para cada página y componentes comunes
- `data/datos.json` - Base de datos de destinos, cultura y gastronomía
- `images/` - Imágenes locales utilizadas en el sitio

## Funcionalidades principales

- Diseño responsivo (mobile-first)
- Modo oscuro/claro con persistencia en localStorage
- Filtros dinámicos por categoría: lago, islas, arqueología, pueblo
- Badges de colores según categoría
- Mapa con 9 marcadores de lugares turísticos
- Formulario con validación en tiempo real (nombre, correo, días, presupuesto)
- Generación de itinerario personalizado (actividades por día según destino)
- Acordeón y modales de Bootstrap
- Sección de geografía (altiplano, cordilleras Carabaya y Apolobamba)

## Cómo ver el proyecto

### Local (recomendado Live Server)
1. Abre la carpeta con Visual Studio Code.
2. Instala la extensión Live Server.
3. Haz clic derecho en `index.html` → Open with Live Server.

### Despliegue online
El sitio está publicado en GitHub Pages:  
[https://bladimir404.github.io/turismo-puno/](https://bladimir404.github.io/turismo-puno/)

## Notas

- Los datos de destinos, cultura y gastronomía se cargan desde `data/datos.json` mediante `fetch`.
- Las imágenes utilizadas son locales (carpeta `images/`).
- El proyecto cumple con los requisitos de la guía: 5 páginas interconectadas, Bootstrap, JS, JSON, mapa Leaflet, modo oscuro, etc.

## Autor
Bladimir Alex Caceres Flores
Proyecto académico - Desarrollo de Plataformas Web