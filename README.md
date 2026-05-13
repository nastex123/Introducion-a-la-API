# NEXUS
Una aplicación web tipo Single-Page Application (SPA) construida enteramente con Vanilla JavaScript (POO), CSS Puro (Glassmorphism) y consumiendo la API gratuita de DummyJSON.

Diseñada con una estética oscura, degradados rojo/negro y transparencias, demostrando que no se necesitan frameworks para crear interfaces modernas, reactivas y escalables.

---

## Características Actuales
- Navegación SPA: Cambio de secciones (Productos, Usuarios, Posts, Citas) sin recargar la página.

- Consumo de API Asíncrono: Fetch a los endpoints de DummyJSON usando async / await y manejo de errores.

- Paginación Real: Conexión directa con la paginación de la API (?limit=&skip=), evitando sobrecargar el DOM.

- Arquitectura Modular (POO): Código estructurado en Clases (Router, ProductManager, App) con encapsulamiento y responsabilidad única.

- Event Delegation: Escucha eficiente de eventos en el DOM sin depender de onclick inline en el HTML.

- Diseño Glassmorphism: Interfaz con transparencias, desenfoque (backdrop-filter) y degradados rojos/negros.

- CSS Puro: Uso de Variables CSS (Custom Properties), Grid y Flexbox sin dependencias externas (excepto iconos).
---
## Tecnologías Utilizadas
- HTML5: Estructura semántica.
- CSS:
  - Custom Properties (Variables CSS).
  - CSS Grid & Flexbox para layouts responsivos.
  - Efecto Glassmorphism (backdrop-filter, rgba).
  - Animaciones y transiciones (@keyframes).

- JavaScript (ES6+):
  - Programación Orientada a Objetos (Clases, propiedades privadas implícitas).
  - Asincronía (Promesas, async/await).
  - Delegación de Eventos.
  - Patrón Módulo/Orquestador.
- API: DummyJSON (Datos fake para prototipado).
- Iconos: Bootstrap Icons (vía CDN).

---
## Estructura del Proyecto
El proyecto mantiene una estructura limpia y separada de responsabilidades:
```
├── index.html      # Estructura semántica y enlaces a assets
├── styles.css      # Diseño visual, variables CSS y Glassmorphism
├── app.js          # Lógica de negocio, Clases y consumo de API
└── README.md       # Documentación del proyecto
```
## Cómo Ejecutarlo
Al ser un proyecto basado en Vanilla Web, no requiere instaladores, dependencias (node_modules) ni procesos de compilación (build).

- Clona o descarga este repositorio en tu computadora.

- Navega a la carpeta del proyecto.
- Haz doble clic en el archivo index.html para abrirlo en tu navegador predeterminado.
- ¡Listo! La aplicación se cargará y consumirá los datos de la API automáticamente.
(Opcional: Si prefieres usar un servidor local para evitar políticas CORS en el futuro, puedes usar la extensión Live Server de VS Code).

## Arquitectura de Clases (app.js)
Para mantener el código escalable y evitar la contaminación del ámbito global, la aplicación está dividida en las siguientes clases:

- Router: Gestiona la navegación entre las diferentes secciones de la SPA.

- ProductManager: Se encarga de todo el ciclo de vida de los productos (fetch, renderizado, paginación y manejo del carrito).
- App: Clase orquestadora principal que inicializa los demás módulos cuando el DOM está listo.

# Roadmap del Proyecto

Este proyecto se está construyendo paso a paso. Fases completadas y pendientes:

- Fase 1: Esqueleto HTML y Diseño Base (Variables CSS, Layout). - Completado 

- Fase 2: Navegación SPA con Vanilla JS. - Completado 
- Fase 3: Consumo de API y Renderizado Dinámico de Productos. - Completado 
- Fase 3.5: Implementación de Paginación real de la API. - Completado 
- Refactorización: Arquitectura de Clases (POO) y Event Delegation. - Completado 
- Fase 4: Búsqueda en tiempo real y Filtros por Categoría. - Pendiente
- Fase 5: Lógica completa del Carrito de Compras (Añadir, eliminar, total, modal). - Pendiente
- Fase 6: Integración de endpoints de Usuarios, Posts y Citas. - Pendiente
- Fase 7: Autenticación Fake (Login con DummyJSON Auth) y Toast de notificaciones.    - Pendiente

# COLABORADORES
 ## Brandon Carranza & Juan Muñoz

# URL: [https://github.com/nastex123/API-I.git](https://github.com/nastex123/Introducion-a-la-API.git)
