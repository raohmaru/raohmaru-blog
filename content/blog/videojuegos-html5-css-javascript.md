---
title: Videojuegos en HTML5 con CSS y JavaScript
description: Desarrollando videojuegos en HTML5, CSS y JavaScript.
date: 2019-09-01
tags: ["JavaScript", "Game Dev"]
language: es
---

Siguiendo con la serie de desarrollo de videojuegos para la web, tras haber probado la [API de Canvas 2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) (si te interesa puede ver el post sobre [experimiento de visualización](./experimentos-con-html5-canvas.md) o el de [motor videojuego con Canvas 2D](javascript-experiments-desarrollando-un-motor-de-videojuego.md)), y antes de dar el salto a [WebGL](https://www.khronos.org/webgl/) (la mayoría de motores de videojuego en JavaScript utilizan WebGL para el renderizado) quería probar el rendimiento del navegador desarrollando un juego muy simple que manipulase el [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) para mostrar los gráficos.

**(Si quieres ir al juego directamente** [**puedes hacerlo clicando aquí 🎾**](https://raohmaru.github.io/DOM-Tennis/src/)**.  
O [clica aquí](https://github.com/raohmaru/DOM-Tennis) para investigar el código fuente.)**

> DOM (Document Object Model) representa una página web como un árbol, dónde los elementos de la página son nodos. A este representación se puede acceder y manipular con lenguajes de programación como JavaScript.

El problema de manipular el DOM es que es lento. Cada vez que un elemento de la página cambia (al insertar o eliminar nodos, modificar estilos, cambiar el contenido de la página) se provoca un _reflow_: el navegador vuelve a calcular las posiciones y formas de los elementos con el objetivo de volver a renderizarlos de forma total o parcial. Esto es un proceso costoso que puede reducir el rendimiento de la página, y como regla general se debería evitar en la medida de lo posible.

**_Entonces, ¿se pueden hacer juegos que manipulen DOM y que vayan a un framerate aceptable?_**

La respuesta es sí, siempre que se sigan algunas técnicas para no afectar demasiado el rendimiento del navegador.

Durante el desarrollo del juego me documenté y experimenté con las técnicas más comunes para optimizar sitios webs ([como en este artículo](https://developers.google.com/speed/docs/insights/browser-reflow) de nuestros amigos de Google), además de seguir algunos consejos útiles al programar videojuegos para el navegador.

## Ideas para optimizar un juego basado en CSS y JavaScript

### window.requestAnimationFrame

La parte más importante de tu juego será el _main loop_, la función que se repetirá 60 veces por segundo para conseguir una animación fluida. Y la mejor manera de conseguir este bucle es utilizando [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), un método que se ejecuta en la frequencia antes mencionada y que nos permite actualizar el estado y las animaciones de nuestro juego antes del repintado de la ventana.

Ejemplo de clase con un método que se invoca con `requestAnimationFrame()`.

```js
export default class {
    constructor(fps, cb) {
        this._fps = fps;
        this._cb = cb;
        
        this._fpsInterval = 1000 / fps;
        this._frameCount = 0;
        this._currentTime = 0;
        this._prevTime = 0;
    }
    
    get currentFps() {
        return 1000 / (this._currentTime - this._prevTime);
    }

    start() {
        let me = this;
        
        this._startTime = window.performance.now();
        this._then = this._startTime;
        this._onFrame = (currentTime) => me.frame(currentTime);
        this.frame();
    }

    stop() {
        window.cancelAnimationFrame(this._timerID);
        this._cb = null;
        this._onFrame = null;
    }

    frame(currentTime) {
        // calc elapsed time since last loop
        let elapsed = currentTime - this._then;
        this._currentTime = currentTime;
        // if enough time has elapsed, draw the next frame
        if (elapsed > this._fpsInterval) {
            // Get ready for next frame by setting then=currentTime, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this._then = currentTime - (elapsed % this._fpsInterval);
            this._cb(currentTime);
            
            this._frameCount++;
            this._prevTime = currentTime;
        }
        
        this._timerID = window.requestAnimationFrame(this._onFrame);
    }
};
```
  
En el anterior ejemplo nuestra clase intenta llamar al método `frame()` cada 1/60 segundos, y en el caso que disminuya el rendimiento y bajen los fps intentará ajustar esta merma para que el juego siga fluido.

### CSS 3D Transforms

Ya hemos visto que mover elementos dentro del flujo de la página es caro (para el navegador), ya que provoca _reflows_. Para evitar esto efecto negativo, debemos sacar los elementos del flujo de la página cambiando su posicionamiento a «absolute» (`position: absolute`) y utilizar las propiedades `top` y `left` para moverlo.

También podemos sacar provecho de la GPU utilizando un «truco» que lleva rondando por internet desde que aparecieron las especificaciones de [CSS 3D Transforms](https://drafts.csswg.org/css-transforms-2/#three-d-transform-functions):
```css
transform: translateZ(0);
```

El truco consiste en que el navegador crea un nuevo contexto, una nueva capa para ese elemento y es la GPU quién se encarga de componerla y dibujarla, liberando a la CPU de esta tarea. Con esto es posible arañar unos cuantos frames y hacer más fluida la animación.

Como punto negativo hay que tener en cuenta que el procesamiento de CSS 3D no es tan potente como una aplicación 3D real con WebGL, y que muchas elementos utilizando aceleración por hardware pueden tener el efecto contrario y ralentizar el juego (cada capa compuesta por la GPU consume memoria adicional, por ejemplo).

### Filtros CSS

Evita los filtros como `box-shadow`, `border-radius` o la propiedad [`filter`](https://developer.mozilla.org/es/docs/Web/CSS/filter). Cuando se aplica un filtro a un elemento, el navegador lo convierte en una [imagen mapa de bits](https://es.wikipedia.org/wiki/Imagen_de_mapa_de_bits) y entonces aplica el filtro a cada píxel de esta imagen. Este proceso se hace en la CPU (aunque algunos navegadores pueden enviarlo a la GPU) con lo que nos quita tiempo de proceso para nuestro juego. Sobretodo se nota si los filtros se aplican a elementos que se animan y se actualizan a cada _frame_ del juego.

### Anima el menor número de elementos posible

Con todo lo anterior comentado, ya nos ha quedado un poco claro que no podemos abusar del DOM y animar tantos elementos como haríamos en un juego utilizando Canvas 2D o WebGL. Mantener una estructura poco profunda de nodos también ayuda, ya que una modificación en el nodo padre provoca un redibujado de los nodos descendientes.

### El inspector de rendimiento es tu amigo

En los navegadores tenemos una herramienta pontentísima para revisar el rendimiento de nuestro juego. Con el [inspector de rendimiento](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/) podemos analizar el tiempo de proceso de cada fotograma y encontrar posibles los momentos en que los frames bajen a menos de 60 y la animación deje de ser fluida.

## El juego: DOM Tennis 🎾

Teniendo en cuenta lo anteriormente expuesto, he intentado mantener al mínimo los elementos con una mecánica de juego muy sencilla: golpear una bola con el cursor sin que toque el suelo. En el _main loop_ ocurre lo siguiente:

*   Se ejecuta el motor de físicas.
*   Actualizar la posición de la bola.
*   Actualizar la posición del cursor.
*   Animar la puntuación.

Cada elemento es compuesto en la GPU, y su posición CSS cambía sólo cuando es necesario. Tanto en ordenador como en móviles el rendimiento llega a los 60 fps; tuve más problemas con el [audio generado](https://raohmaru.com/blog/javascript/experimentos-con-la-web-audio-api-de-javascript/) en dispositivos móvile que no con los gráficos.

[**Jugar 🎾**](https://raohmaru.github.io/DOM-Tennis/src/)  
[**Código fuente**](https://github.com/raohmaru/DOM-Tennis)

## Notas

1.  Se considera un framerate aceptable para videojuegos entre el rango de 30 y 60 fotogramas por segundo.

## Referencias

*   [What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
*   [Anatomy of a video game](https://developer.mozilla.org/en-US/docs/Games/Anatomy)
*   [On translate3d and layer creation hacks](https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)
*   [CSS GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
