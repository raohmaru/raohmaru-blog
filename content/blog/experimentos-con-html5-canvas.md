---
title: Experimentos con HTML5 Canvas
description: Experimentos con el API HTML5 Canvas 2D en JavaScript.
date: 2016-05-29
tags: ["JavaScript"]
language: es
---

Todos, en algún momento, deberíamos trabajar en algún proyecto paralelo. Artículos como [A Guide To Personal Side Projects](https://www.smashingmagazine.com/2016/05/a-guide-to-personal-side-projects/) (publicado en Smashing Magazine) nos recuerdan sus beneficios, tanto personales como para nuestra carrera profesional. En el caso de un programador web, estos proyectos representan una oportunidad para estudiar y practicar con nuevas tecnologías, oportunidades que no suelen presentarse en nuestro trabajo diario.

En mi caso decidí experimentar con [Canvas 2D](https://www.w3.org/TR/2dcontext/). El resultado final se puede ver en ~~http://raohmaru.com/lab/js/erdt~~.

El elemento Canvas es una zona dentro de nuestra página HTML que renderiza en un [mapa de bits](https://es.wikipedia.org/wiki/Imagen_de_mapa_de_bits), y que con APIs de JavaScript podemos dibujar en él (como las APIs Canvas 2D o [WebGL](https://developer.mozilla.org/en-US/docs/Glossary/WebGL)). El objetivo original del experimento era aprender la [API de Canvas 2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) y empezar a dibujar cuadrados, círculos e imágenes, y finalmente acabó en un proyecto de arte efímero donde el usuario puede crear dibujos únicos que jamás podrá volver a repetir con exactitud.

![Chromatic Big Bang](/img/chromatic-big-bang.jpg)

_Un colorido Big Bang creado con ERDT._

No voy a poner mucho detalle en cómo he desarrollado el proyecto; hay multitud de tutoriales sobre como trabajar con Canvas 2D, baste decir que todos empiezan con

```js
var canvas = document.getElementById('mycanvas'),  
ctx;  
if(canvas.getContext){  
ctx = canvas.getContext('2d');  
    // Let the magic begin  
} else {  
    // canvas-unsupported code here  
}  
```

(Para los curiosos el código de la aplicación se encuentra en [mi repositorio público de GitHub](https://github.com/raohmaru/Ephemeral-Random-Drawing-Tool).)

## Objetivos adicionales

O escrito de otra manera, ¿qué me ha permitido poner en práctica el proyecto?

### Gulp

Soy bastante fan de [Grunt](http://gruntjs.com/) como automatizador de tareas (concatenar archivos, comprimir, analizar código, etc.), pero esta vez quería dar una oportunidad a [Gulp](http://gulpjs.com/). Las dos diferencias principales con Grunt son que Gulp utiliza _streams_ de Node.js, con lo que el flujo de datos se manipula en memoria y solo se guarda en disco una vez (con lo que se consigue más velocidad de proceso).

La segunda diferencia es que se escribe más código (frente al objeto de configuración de Grunt).

```js
var gulp = require('gulp'),  
    jshint = require('gulp-jshint');

gulp.task('jshint', function() {  
gulp.src('js/\*\*/\*.js')  
    .pipe(jshint());  
});

gulp.task('default', ['jshint']);  
```

```js
module.exports = function(grunt) {

grunt.initConfig({  
    jshint: {  
        all: ['js/\*\*/\*.js']  
    }  
});

grunt.loadNpmTasks('grunt-contrib-jshint');  
grunt.registerTask('default', ['jshint']);

};  
```

Sin querer empezar un debate, me siento mucho más cómodo con la sencillez y claridad del archivo de configuración de Grunt que con las funciones enlazadas de Gulp.

### No frameworks JavaScript

Una de las restricciones auto-impuestas fue la de no poder utililizar ninguna librería o framework JavaScript. No jQuery, no Angular, Backbone, Ember, XYZ.js…

Lo anterior enumerado ha supuesto un gran avance para el desarrollo web en cuestión, y para JavaScript en particular. Pero también nos hacen olvidar las bases de JavaScript y como resolver problemas de manera «nativa» (en contraposición al uso de librerías y frameworks). Si sirve de comparación, es como ir a una casa rural perdida en el monte, sin cobertura móvil, conexión a internet o TV. ¿Eso de allá con cubiertas y hojas se llama libro?

### Compatibilidad

Cuando se empieza un proyecto web (ya sea un website o una webapp), la primera pregunta que debemos hacernos es: ¿qué navegadores queremos dar soporte?. Aunque en realidad la pregunta subyacente es: _¿a qué versiones de Internet Explorer queremos dar soporte?_

A principios de 2016 vimos como [Microsoft cesaba el soporte a Internet Explorer 8, 9 y 10](https://www.microsoft.com/es-es/WindowsForBusiness/End-of-IE-support). Pero esto no quiso decir que los clientes y usuarios dejarán de utilizarlos de súbito. Y menos los clientes de **tú** proyecto.

Por ese motivo, siendo un proyecto personal, me he dado el gustazo de preocuparme sólo de IE11 y siguientes (bienvenidos [flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout/Usando_las_cajas_flexibles_CSS), [@keyframes](https://developer.mozilla.org/es/docs/Web/CSS/@keyframes), [strict mode](http://raohmaru.com/blog/javascript/use-strict/)…).  
(La compatibilidad con Firefox, Chrome, Safari, Opera va implícita.)

## Conclusiones

Empezar un proyecto personal requiere esfuerzo y tiempo, pero la experiencia merece la pena. Espero que este sea el primero de muchos proyectos o experimentos personales que consiga llevar a cabo

Por otra parte animo al que esté leyendo estas líneas a que empiece ese proyecto que le ronda por la cabeza, que en el proceso intente cosas nuevas y se ponga objetivos asumibles.

Happy coding!

## Enlaces

+ ~~http://raohmaru.com/lab/js/erdt~~
+ [https://github.com/raohmaru/Ephemeral-Random-Drawing-Tool](https://github.com/raohmaru/Ephemeral-Random-Drawing-Tool)
