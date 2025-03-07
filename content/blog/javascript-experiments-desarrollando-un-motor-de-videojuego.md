---
title: "Desarrollando un motor de videojuego en JavaScript"
description: Motor de videojuego en JavaScript.
date: 2018-04-16
tags: ["JavaScript", "Game Dev"]
language: es
---

Continuando con los experimentos con tecnologías web, y después de haber [jugado un poco con Canvas 2D](https://raohmaru.com/blog/javascript/experimentos-con-html5-canvas/), toca el turno a investigar cómo construir un [motor de videojuego](https://en.wikipedia.org/wiki/Game_engine) en HTML5 y JavaScript.

Hace tiempo que había experimentado con la idea, [desarrollando un concepto](https://github.com/raohmaru/as3-platform-game-engine) en Flash ActionScript 3 (si tienes el plugin de Flash instalado [puedes jugar aquí](https://raohmaru.com/lab/game/platform-game-egine/) hasta finales de [2020](http://time.com/4874334/adobe-flash-2020/)), y ahora que los navegadores están más que preparados para ser una plataforma de videojuegos (y lo demuestra la gran cantidad de [motores HTML5](https://github.com/bebraw/jswiki/wiki/Game-Engines) u juegos que hay disponibles) me decidí a programar el mío propio; no con afán comercial, si no por el placer del aprendizaje.

**El resultado está aquí disponible:** [https://github.com/raohmaru/sge](https://github.com/raohmaru/sge).  
Y un ejemplo de algo parecido a un juego: [https://raohmaru.github.io/sge/demo/selfish-gene/index.html](https://raohmaru.github.io/sge/demo/selfish-gene/index.html).

El concepto del motor es sencillo: consta de una vista (por ahora sólo Canvas 2D es soportado) donde se renderiza el juego cada _frame_, la animación es controlada con [`window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) para poder llegar a los [60 fps](http://es.ign.com/frame-rate/88277/feature/entendiendo-el-frame-rate-y-su-importancia), utiliza el concepto de [_sprites_](https://en.wikipedia.org/wiki/Sprite_%28computer_graphics%29) para manipular los elementos del juego, y tiene un sistema de detección de colisiones simplicísimo.

```js
// get the Canvas lement from the DOM  
var canvas = document.getElementById(‘maincanvas’);

// New instance of the game  
var game = new sge.Game(canvas, {  
    // Game settings  
    renderer: ‘2D’, // Use Canvas2D  
    size: sge.cnst.FILL_WINDOW,  
    width: ‘100%’,  
    height: ‘100%’,  
    canvasColor: ‘#c2dcfc’,  
    fps: 60  
});

// Create a sprite  
var sp = new sge.sys.Sprite({  
    x : 200,  
    y : 200,  
    width : 32,  
    height: 32  
});  
// Init the sprite’s view  
sp.createView();  
// Fill the sprite with color black  
sp.getView().drawRect(0, 0, sp.width, sp.height, ‘#000’);  
// Add the sprite to the game  
game.spriteMgr.add(sp);

// Add on frame update listener  
game.on(sge.event.FRAME, function(){  
    // Moves the sprite in circles  
    sp.x += Math.sin(sp.age/10) \* 10 | 0;  
    sp.y += Math.cos(sp.age/10) \* 10 | 0;  
});

// Start the game  
game.start();  
```

### El renderizador

En un navegador web podemos utilizar diferentes métodos para presentar gráficos: el mismo [DOM](https://en.wikipedia.org/wiki/Document_Object_Model), imágenes [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics), manipulando los píxeles de un Canvas 2D, o con [WebGL](https://es.wikipedia.org/wiki/WebGL). Cuando un nuevo motor SGE se inicia, el usuario puede seleccionar que tipo de renderizador utilizar, el cuál actúa como una pieza desacoplada: a través de una interfaz agnóstica, el motor del juego pasa instrucciones al renderizador seleccionado para que se actualice cada fotograma.

### Entity-Component-System

Cada elemento que se puede añadir al juego se considera una entidad (_entity_ en inglés), al cuál se le pueden añadir rasgos (o «componentes») que añaden nuevas características o comportamientos a la entidad. Finalmente, un sistema se encarga de la lógica detrás de cada rasgo (como mover una entidad que tiene el rasgo _Movable_, o comprobar los puntos de vida del rasgo __Destroyable__).

```js
// Create a new Entity  
var hero = new sge.sys.Entity({  
    // Properties for the trait Renderable  
    x : 200,  
    y : 200,  
    width : 32,  
    height: 32,  
    // Properties for the trait Movable  
    speed: 4,  
    // Properties for the trait Destroyable  
    hp: 8  
});  
// Add some traits  
hero.addTrait(‘Renderable’, sge.sys.trait.Renderable);  
hero.addTrait(‘Movable’, sge.sys.trait.Movable);  
hero.addTrait(‘Destroyable’, sge.sys.trait.Destroyable);  
```

Este patrón de arquitectura se conoce como [Entity-Component-System](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system), y es el más utilizado en el desarrollo de videojuegos. Una de las ventajas que ofrece es que permite crear nuevos objetos por composición (nuestra entidad Hero tiene los rasgos Renderable, Movable y Health), en contraste con la creación de objetos por [herencia](https://es.wikipedia.org/wiki/Herencia_(inform%C3%A1tica)) (en este caso nuestro entidad Hero tendría una larga cadena de herencias: Hero &lt;&lt; LivingEntity &lt;&lt; MovableEntity &lt;&lt; Entity).

> Puedes encontrar más información sobre este patrón en
> + [https://spin.atomicobject.com/2016/04/22/entity-component-systems/](https://spin.atomicobject.com/2016/04/22/entity-component-systems/)
> + [http://www.vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript](http://www.vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript)

### Colisiones

Todo motor de videojuegos que se precie debe gestionar las colisiones entre los elementos, es decir, cuando un sprite se superpone a otro sprite. Con el _trait_ Solid se añade esta propiedad, permitiendo al sprite chocar con cualquier otro sprite solido en la escena

¿Pero qué ocurre si hay miles de sprites en pantalla? Por cada sprite se debe comprobar si éste colisiona con cualquiera del resto, en un bucle que recorre todos los sprites disponibles tantas veces como sprites haya en pantalla, sesenta veces por segundos. Es un método poco eficiente, y el motor intenta dar una solución más optima a este problema.

[![SGE Atlas de sprites](/img/sge-atlas.png), reduciendo así el número operaciones a realizar.

### Conclusiones

Si bien construir un motor de videojuego moderno, eficiente y competitivo es una tarea descomunal, es un ejercicio interesante para entender la arquitectura y los retos que presenta este tipo de software. Sin duda rendimiento y facilidad de uso son sus factores más importantes. JavaScript y el elemento Canvas permiten crear motores que cumplan con estas expectativas, convirtiendo a la Web en la plataforma perfecta para disfrutar de videojuegos en el navegador.
