# 🚀 Angular Material Dashboard Pro

Este proyecto es una aplicación de tipo **Single Page Application (SPA)** construida con **Angular 18+** (Standalone Components) y **Angular Material**.

Representa un **Panel de Administración Completo** que simula un entorno real de gestión empresarial, incluyendo autenticación simulada, gestión de usuarios (CRUD), visualización de métricas y personalización de interfaz con un sistema robusto de **Modo Oscuro**.

---

## 📋 Características y Funcionalidad

### 1. 🎨 Interfaz y UX (User Experience)
* **Diseño Responsive:** Layout adaptable con menú lateral (`MatSidenav`) que funciona en escritorio y móvil.
* **Barra de Navegación Sticky:** La cabecera siempre visible con acceso rápido a notificaciones y perfil.
* **Feedback al Usuario:** Uso intensivo de `MatSnackBar` para confirmar acciones (guardado, borrado, errores).

### 2. 👥 Módulo de Usuarios (CRUD Avanzado)
Una tabla interactiva construida sobre `MatTable` con lógica en memoria:
* **Creación:** Generación automática de IDs secuenciales y solicitud de datos mediante `prompt`.
* **Lectura:** Listado paginado visualmente con "Badges" (etiquetas) de colores para el estado (Activo, Inactivo, Pendiente).
* **Edición:** Modificación de datos en tiempo real sin recargar la página.
* **Eliminado:** Confirmación de seguridad antes de borrar registros.
* **Buscador Inteligente:** Filtrado en tiempo real por cualquier campo de la tabla.

### 3. ⚙️ Configuración y Persistencia
* **Modo Oscuro Global:** Un sistema de temas que invierte completamente la paleta de colores de la aplicación.
* **Persistencia de Datos:** Uso de `localStorage` para recordar las preferencias del usuario (si dejó el modo oscuro activado, se mantiene al volver).

### 4. 📊 Dashboard (Home)
* **KPIs Interactivos:** Tarjetas de métricas que simulan datos financieros y operativos.
* **Simulación de Real-Time:** Botón de "Actualizar" que modifica aleatoriamente los valores para simular entrada de datos en vivo.

---

## 🛠️ Stack Tecnológico

* **Core:** Angular 18 (Standalone Components - Sin NgModules).
* **UI Framework:** Angular Material & CDK.
* **Estilos:** CSS3 Nativo con Variables CSS (`var(--nombre-variable)`).
* **Iconos:** Google Material Icons.
* **Estrategia de Renderizado:** SSR (Server-Side Rendering) Híbrido.

---

## 🔧 Instalación y Despliegue

Sigue estos pasos para probar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd First-Angular-Proyect
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener Node.js instalado.
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor:**
    ```bash
    ng serve --open
    ```

---

## 💡 Desafíos Técnicos y Soluciones Implementadas

Durante el desarrollo de esta aplicación, nos enfrentamos a retos específicos de las versiones modernas de Angular y la personalización de Material Design.

### 🔴 Problema 1: Incompatibilidad de `localStorage` con SSR
**El Error:** Al intentar guardar la configuración del "Modo Oscuro", la consola arrojaba: `ReferenceError: localStorage is not defined`.
**La Causa:** Angular 17/18 activa por defecto el **Server-Side Rendering (SSR)**. El código se ejecuta primero en el servidor (Node.js) para generar el HTML inicial. En el servidor no existe el objeto `window` ni `localStorage`.
**La Solución:**
Implementamos una inyección de dependencias para detectar la plataforma:
```typescript
// settings.service.ts
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

constructor(@Inject(PLATFORM_ID) private platformId: Object) { ... }

// Solo accedemos al storage si estamos en el navegador
if (isPlatformBrowser(this.platformId)) {
   localStorage.setItem(...)
}