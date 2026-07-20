---
title: Compartir en redes sociales y medir con Google Analytics
description: Cómo compartir artículos en redes sociales y medir interacciones con Google Analytics.
date: 2012-07-12
tags: ["JavaScript", "Analytics"]
language: es
---

¿Gestionas las estadísticas de visitas de un sitio web con ```Google Analytics(http://www.google.com/intl/es/analytics/), y quieres medir la efectividad de los botones para compartir en redes sociales?

El código de seguimiento JavaScript de Google Analytics (_Tracking Code_, que carga en la página el archivo externo `ga.js` con todas las funcionalidades), dispone de una ```API(http://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones) en la que consta un método que permite este tipo de medición, el método `_trackSocial()`. Con él se pueden registrar las interacciones “sociales” de nuestro sitio y categorizarlas correctamente.

```js
_gaq.push([‘_trackSocial’, ‘theSocialNetwork’, ‘like’, ‘http://www.mysite.com/abc’]);
```

El botón de Google+ invoca automáticamente éste método al ser activado y envía la información a nuestra cuenta de Google Analytics; pero si queremos medir las acciones de otras plataformas como Facebook o Twitter, entonces se requiere un poco más de trabajo e integración con las APIs de esos servicios.

**Para medir las acciones con el botón “me gusta” de Facebook**:

```js
function initFBTrack()  
{  
    if( typeof(FB) == ‘undefined’)  
    {  
        setTimeout(initFBTrack, 300);  
        return;  
    }

    FB.Event.subscribe(‘edge.create’, function(targetUrl) {  
        _gaq.push([‘_trackSocial’, ‘Facebook’, ‘like’, targetUrl]);  
    });  
}  
// Wait for Facebook API initialization  
setTimeout(initFBTrack, 300);  
```

También se pueden medir los botones “me disgusta” y “compartir en Facebook”, cambiando el evento de suscripción (y la acción para identificarlo).

```js
FB.Event.subscribe(‘edge. remove’, function(targetUrl) {  
    _gaq.push([‘_trackSocial’, ‘Facebook’, ‘unlike’, targetUrl]);  
});  
```

```js
FB.Event.subscribe(‘ message.send’, function(targetUrl) {  
    _gaq.push([‘_trackSocial’, ‘Facebook’, ‘send’, targetUrl]);  
});  
```

**Medición del botón de compartir en Twitter**:

```js
twttr.ready(function (twttr)  
{  
    twttr.events.bind(‘tweet’, function(e) {  
        if(e)  
        {  
            var opt_pagePath;  
            if(e.target && e.target.nodeName == ‘IFRAME’)  
            {  
                // Gets the URL param to track  
                opt_pagePath = extractParamFromUri(e.target.src, ‘url’);  
            }  
            _gaq.push([‘_trackSocial’, ‘Twitter’, ‘tweet’, opt_pagePath]);  
        }  
    });  
});

function extractParamFromUri(uri, paramName)  
{  
    if(!uri)  
        return;

    var regex = new RegExp(‘[\\?&#]’ + paramName + ‘=([^&#]*)’);
    var params = regex.exec(uri);  
    if(params != null)  
        return unescape(params[1]);

    return;  
}  
```

Otras acciones de Twitter que se pueden medir, simplemente cambiando el evento de suscripción: `click`, `favorite`, `tweet`, `retweet`, `follow`.

```js
twttr.events.bind(‘retweet’, function(e) {} );
```

```js
twttr.events.bind(‘follow’, function(e) {} );
```

**Botón de compartir en LinkedIn:**

```html
<!– Creates a plugin to share the current page –>  
<script type="text/javascript" src="http://platform.linkedin.com/in.js"></script>  
<script type="IN/Share" data-counter="top" data-onsuccess="trackLinkedIn"></script>

<script>  
// Fired when the URL is successfully shared  
function trackLinkedIn(targetURL)  
{  
    _gaq.push([‘_trackSocial’, ‘LinkedIn’, ‘share’, targetURL]);  
}  
</script>  
```

## Referencia

+ [Tracking Code: Social Plug-in Analytics](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiSocialTracking)
+ [Social Interaction Analytics](https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingSocial)
+ [LinkedIn Share Plugin](https://developer.linkedin.com/share-plugin)
