# 🎥 Guía para Agregar Videos de YouTube al Portafolio

## 📋 Descripción General

Tu portafolio ahora soporta videos de YouTube para mostrar demos de tus proyectos. Los videos se integran automáticamente tanto en las tarjetas de proyectos como en las páginas de detalle.

## 🚀 Cómo Agregar Videos

### 1. Sube tu video a YouTube

1. **Sube el video a YouTube** (puede ser público o no listado)
2. **Obtén el ID del video**:
   - URL completa: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID del video: `dQw4w9WgXcQ` (lo que viene después de `v=`)

### 2. Actualiza los datos del proyecto

Hay **2 archivos** que necesitas actualizar:

#### A. `frontend/src/components/ProjectsSection.jsx`
```javascript
const projects = [
  {
    id: 'sapitos',
    title: 'SAPitos 2.0',
    // ... otros datos
    videoId: 'dQw4w9WgXcQ', // ← Cambia null por tu ID de video
    // ... resto de datos
  },
  // ... otros proyectos
];
```

#### B. `frontend/src/pages/ProjectDetail.jsx`
```javascript
const projectData = {
  'sapitos': {
    title: 'SAPitos 2.0',
    // ... otros datos
    videoId: 'dQw4w9WgXcQ', // ← Cambia null por tu ID de video
    // ... resto de datos
  },
  // ... otros proyectos
};
```

## 🎨 Características de los Videos

### En las Tarjetas de Proyectos:
- **Autoplay**: Deshabilitado (mejora la experiencia)
- **Controles**: Deshabilitados inicialmente
- **Indicador**: Muestra "▶️ Video Demo" cuando hay video
- **Responsive**: Se adapta a móviles

### En las Páginas de Detalle:
- **Autoplay**: Deshabilitado
- **Controles**: Habilitados para interacción completa
- **Tamaño**: Ocupa toda la sección media
- **Responsive**: Mantiene aspect ratio 16:9

## 📝 Formatos Soportados

El sistema acepta múltiples formatos:
- **ID solamente**: `dQw4w9WgXcQ`
- **URL completa**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- **URL corta**: `https://youtu.be/dQw4w9WgXcQ`
- **URL embed**: `https://www.youtube.com/embed/dQw4w9WgXcQ`

## 🔧 Configuración Avanzada

Si necesitas personalizar el comportamiento, puedes editar el componente `YouTubeVideo.jsx`:

```javascript
// Ejemplo de personalización
<YouTubeVideo 
  videoId="tu-video-id"
  title="Título personalizado"
  autoplay={false}          // true/false
  showControls={true}       // true/false
  aspectRatio="16:9"        // "16:9", "4:3", etc.
/>
```

## 🎯 Recomendaciones

### Para Mejores Resultados:
1. **Duración**: Videos de 1-3 minutos para demos
2. **Calidad**: Mínimo 1080p para verse bien
3. **Contenido**: Muestra las funcionalidades principales
4. **Audio**: Incluye narración o música de fondo

### Para SEO y Carga:
1. **Título del video**: Descriptivo y con palabras clave
2. **Descripción**: Incluye links a tu portafolio
3. **Miniatura**: Atractiva y representativa
4. **Visibilidad**: "No listado" si no quieres que aparezca en búsquedas

## 🔍 Ejemplos de Uso

### Proyecto con Video:
```javascript
{
  id: 'mi-proyecto',
  title: 'Mi Proyecto Increíble',
  videoId: 'abc123def456', // ← Tu ID de video
  // ... otros datos
}
```

### Proyecto sin Video:
```javascript
{
  id: 'mi-proyecto',
  title: 'Mi Proyecto Increíble',
  videoId: null, // ← Se mostrará imagen por defecto
  // ... otros datos
}
```

## 🚨 Solución de Problemas

### Video no carga:
1. ✅ Verifica que el ID sea correcto
2. ✅ Asegúrate de que el video sea público o no listado
3. ✅ Comprueba que el video no tenga restricciones de embebido

### Video se ve mal en móvil:
1. ✅ El sistema ya es responsive
2. ✅ Asegúrate de que el video tenga buena calidad
3. ✅ Verifica que el aspect ratio sea 16:9

### Error de carga:
1. ✅ Revisa la consola del navegador
2. ✅ Intenta con otro video para probar
3. ✅ Verifica la conexión a internet

## 🎉 ¡Listo para Usar!

Tu portafolio ahora está equipado con soporte completo para videos de YouTube. ¡Solo necesitas subir tus videos y actualizar los IDs!

---

**💡 Tip**: Mantén una lista de tus videos y sus IDs para facilitar futuras actualizaciones. 