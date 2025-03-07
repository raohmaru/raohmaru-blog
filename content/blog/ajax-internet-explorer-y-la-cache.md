---
title: Ajax, Internet Explorer y la caché
description: Resolver problemas con la memoria caché en las peticiones AJAX con Internet Explorer.
date: 2016-04-28
tags: ["JavaScript", "HTTP"]
language: es
---

Si desarrollas sitios web, en algún momento de tu vida te has enfrentado a problemas derivados de la [compatibilidad entre navegadores](https://en.wikipedia.org/wiki/Cross-browser). Y si tuviera que preguntar por el navegador más problematico, sin duda la respuesta sería unánime: Internet Explorer. Cuándo creemos que con la siguiente versión del navegador de Microsoft olvidaremos todas las miserias que hemos sufrido con él, nos sorprende con nuevos obstáculos.

El último problema que me he encontrado con Internet Explorer no es nuevo, pero merece la pena mencionarlo. Por lo menos está presente desde la versión 8, y está relacionado en cómo cachea las peticiones [Ajax](https://developer.mozilla.org/es/docs/AJAX) con el método GET.

Al visitar un sitio web, el navegador [guarda en caché](https://es.wikipedia.org/wiki/Cach%C3%A9_web) los recursos estáticos (imágenes, archivos JavaScript y CSS) para ahorrar ancho de banda en sucesivas visitas y así disminuir el tiempo de carga. Con el contenido dinámico ocurre lo mismo: una petición [GET](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol#GET) Ajax es almacenada en caché de igual manera que un recurso estático. El navegador obtendrá ese contenido dinámico de la caché hasta que el servidor notifique que ha caducado y se necesite descargar de nuevo.

![Cabeceras HTTP](/img/http-headers.png)

Pero Internet Explorer, por supuesto, no sigue estas reglas.

Internet Explorer guarda en caché una petición GET Ajax todo el tiempo necesario y más. Si el servidor no devuelve las cabeceras HTTP de caché correctas, ese tiempo es incierto. Si la cabecera _Expires_ es enviada, IE no actualizará el contenido hasta que éste haya expirado, incluso [si se fuerza el refresco de la página con Ctrl+F5](http://stackoverflow.com/questions/385367/what-requests-do-browsers-f5-and-ctrl-f5-refreshes-generate).

## Las soluciones

Si tenemos control sobre el servidor que suministra los recursos dinámicos, [establecer las cabeceras HTTP que permitan cachear las peticiones](https://blog.httpwatch.com/2009/08/07/ajax-caching-two-important-facts/) (como añadir `Cache-Control: no-cache`) será de gran ayuda.

Si no podemos modificar las cabeceras que envía el servidor con el contenido dinámico (como añadir `Cache-Control: no-cache`), tenemos estas soluciones en la parte del cliente:

### Peticiones POST

Las peticiones POST no son cacheadas por el navegador, a no ser que la respuesta incluya las cabeceras `Cache-Control` or `Expires`. **Pero utilizar este método en lugar de GET para evitar la caché es una mala práctica:** él método POST es para peticiones que modifican el estado del servidor y no para únicamente obtener datos.

### Cache Buster

La técnica _cache buster_ (o _cache breaker_) consite en añadir a la URL de la petición un parámetro adicional, para que el navegador crea que es una petición a un recurso nuevo y forzando así su descarga.

https://example.org/books/?id=lotr&**_cb=123456**

Cada vez que se necesite actualizar ese contenido para IE, basta con cambiar el valor del parámetro de cache buster. También se puede utilizar un valor aleatorio, con el inconveniente que ese recurso será siempre descargado por el usuario.

Si utilizas [jQuery](https://es.wikipedia.org/wiki/JQuery) o [zepto](http://zeptojs.com) para las peticiones GET Ajax, ten en cuenta que por defecto guardan en caché todas esas peticiones. Para desactivarlo has de pasar la opción `cache` como `false`:

```js
$.ajax({  
    url: "http://path.to/api/resource",  
    cache: false  
})  
.done(function(data){  
console.log(data);  
});  
```

Otras librerías como Sencha o MooTools tienen opciones similares en sus métodos Ajax. Si optas por utilizar el objeto [XMLHttpRequest](https://developer.mozilla.org/es/docs/XMLHttpRequest), sencillamente añade el parámetro a la URL.

```js
var url = 'http://path.to/api/resource',  
params = '?_cb=' + Date.now(),  
xhr = new XMLHttpRequest();  
xhr.open('GET', url+params, true);  
xhr.onreadystatechange = function() {  
    if(xhr.readyState == 4 && xhr.status == 200) {  
        console.log(xhr.responseText);  
    }  
};  
xhr.send();  
```

(`Date.now()` devuelve el número de milisegundos transcurridos desde el [tiempo Unix](https://en.wikipedia.org/wiki/Unix_time), por lo que es una opción válida para generar un número al azar. Si necesitas dar soporte a Interner Explorer 8 o inferior debes utilizar en su lugar `(new Date()).getTime()`.)
