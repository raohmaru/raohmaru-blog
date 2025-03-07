---
title: Imágenes que no dicen onLoad
description: Solucionar problemas relacionado con la carga de imágnes en JavaScript.
date: 2012-06-22
tags: ["JavaScript"]
language: es
---

JavaScript y la etiqueta [<img>](http://www.w3schools.com/tags/tag_img.asp) siempre han sido buenos amigos, desde aquellos días que  gracias a un pequeño _script_ se precargaban todas las imágenes de una página, como por ejemplo los _rollovers_ de ciertos botones.

```js
var preload_imgs = ["image1.jpg", "image2.gif", "image3.jpg"];  
for(var i=0; i<preload_imgs.length; i++)  
{  
    var img = new Image();  
    img.src = preload_imgs[i];  
}  
```

¿Pero que ocurre cuando se crean o se tratan imágenes dinámicamente, y se quiere controlar el preciso momento en que están son (des)cargadas?

La respuesta parece sencilla: registrar el evento `load` de la imagen según el navegador del usuario ([`addEventListener`](https://developer.mozilla.org/en/DOM/element.addEventListener) para clientes modernos, [`attachEvent`](http://msdn.microsoft.com/en-us/library/ie/ms536343(v=vs.85).aspx) para IE arcanos y `onload` para el resto) y esperamos a que se dispare. El contrapunto es que esto último no siempre ocurre, y las causas pueden ser muy variadas.

Tomemos el siguiente código de ejemplo:

```js
var loadHandler = function()  
{  
    document.getElementById(‘container’).appendChild( this );  
}

var img = new Image();  
img.src = "carcharoth.jpg";  
// Se evita deliberadamente la lógica de descubrir el registrador  
// correcto por navegador para ahorrarnos código  
img.onload = loadHandler;  
```

La primera sensación es que debería funcionar: se añade al documento la imagen una vez cargada; y en efecto lo hace en la mayoría de navegadores de escritorio. Menos en Internet Explorer, versiones 8 e inferiores. El porqué se debe a que se registra el evento `onload` después de asignar un nuevo origen a la imagen (`img.src = "carcharoth.jpg"`), y en el caso que la imagen esté en la caché del navegador (ya se ha descargado previamente), IE ejecutará el evento `load` inmediatamente después de la asignación sin dar tiempo a que se registre.

Para corregirlo, simplemente se ha de colocar el registrador de eventos antes de cambiar la URL de la imagen:

```js highlight=»7″ firstline=»6″
var img = new Image();  
img.onload = loadHandler;  
img.src = "carcharoth.jpg";  
```

O comprobar si la imagen se ha «completado» ([`img.complete`](http://www.w3schools.com/jsref/prop_img_complete.asp)) y en consecuencia invocar a pelo el método registrado:

```js highlight=»8,9″ firstline=»6″
var img = new Image();  
img.onload = loadHandler;  
if( img.complete ) {  
    img.onload();  
}
```

Otra situación: tenemos una imagen en el documento, y cambiamos su origen URL a ese mismo origen vía JavaScript. ¿Debería lanzar un evento `load`? Así es y así se hace en todos los navegadores a excepción de Chrome; el navegador de Google tiene un pequeño _bug_ que impide lanzar el evento cuando se carga el mismo origen para una imagen.

Para solucionarlo, como explican en [éste hilo](http://code.google.com/p/chromium/issues/detail?id=7731), se ha de “vaciar” el origen URL de la imagen antes de asignarle el mismo.

```js
// La URL de la imagen es "shenglong.jpg"  
var img = document.getElementById(‘myimg’);  
    img.src = "";  
    img.addEventListener("load", loadHandler, false);  
    img.src = "shenglong.jpg";  
```

Una manera efectiva de evitar estos comportamientos es utilizar algún tipo de _framework_ que vigile por la buena salud de nuestras imágenes. [jQuery](http://jquery.com/), como no, hace un buen trabajo gracias al método `.load()`, aunque en la [página de la referencia](http://api.jquery.com/load-event/) avisan que tampoco es perfecto.

Por suerte, un buen samaritano en los comentarios de esa página ofrece un truquillo para que funcione en la mayoría de escenarios:

```js
// Crea una imagen vacía  
var $img = $(‘<img>’);  
// Registra el evento load  
$img.load( loadHandler );  
// Asigna la URL de la imagen para que el evento load  
// sea correctamente capturado  
$img.attr( ‘src’, ‘mventris.jpg’ );  
```

Y si todo falla, y no hay manera que esas jodidas imágenes de la galería alerten cuando se han cargado completamente, explorando en GitHub encontramos el _plugin_ para jQuery [imagesLoaded](https://github.com/desandro/imagesloaded), creado por Paul Irish (el tío ese que parece que está desarrollando HTML5 el solito). Partiendo de un contenedor, el plugin es capaz de detectar cuándo las imágenes que contiene se han cargado y cuántos errores han ocurrido. Y por las pruebas parece que es muy eficaz.

```js
var $container = $(‘#container’);  
var preload_imgs = ["image1.jpg", "image2.gif", "image3.jpg"];

for(var i=0; i<preload_imgs.length; i++)  
{  
    // Crea las imágenes y las añade al contenedor  
    var $img = $(‘<img>’);  
    $img.attr( ‘src’, preload_imgs[i] );  
    $container.append( $img );  
}

// Se invocará una vez todas las imágenes del contenedor  
// se hayan cargado con o sin error  
$container.imagesLoaded( function( $images, $proper, $broken )  
{  
    $container.append(  
    ‘<p>’ + $proper.length + ‘ images loaded of ‘ + $images.length  
    + ‘<br>Errors: ‘ + $broken.length + ‘</p>’ );  
});  
```

¿Conoces más formas de detectar vía JavaScript cuando una imagen se ha cargado?
