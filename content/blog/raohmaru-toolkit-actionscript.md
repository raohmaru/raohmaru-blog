---
title: Raohmaru Toolkit
description: Librería ActionScript 3 para ayudar en el desarrollo de aplicaciones Flash y Flex.
date: 2012-05-31
tags: ["as3", "library"]
language: es
---

Aprovecho que el blog es mío para presentar Raohmaru Toolkit, una librería programada en [ActionScript 3](http://www.adobe.com/devnet/actionscript.html) para ayudar en el desarrollo de aplicaciones Flash o Flex, en la medida de lo posible claro.

¿Flash? ¿Pero [no estaba muerto](http://isflashdeadyet.com/)?

Muerto, lo que se dice muerto, no. Ni siquiera malherido. Aunque parece que la tendencia es de ir abandonando lentamente la tecnología Flash en el desarrollo de sitios, para hacer la web más accesible (hablamos sobretodo de dispositivos móviles, _tablets_, lavadoras, y otros cacharros donde [no habrá más soporte para Flash Player en sus navegadores](http://www.zdnet.com/blog/perlow/exclusive-adobe-ceases-development-on-mobile-browser-flash-refocuses-efforts-on-html5-updated/19226)), esto no ha sido óbice para que siga presente en [aplicaciones](http://www.adobe.com/es/products/air.html), [juegos](http://www.adobe.com/devnet/flashplayer/stage3d.html), allá donde todavía [no llega HTML5](http://www.periscopic.com/#/news/2012/03/our-research-into-flash-and-html5-ten-months-later-a-second-look/) o para [mantener la compatibilidad](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) con los viejos navegadores.

En resumen y para no desviarme del tema central, que todavía queda Flash para rato.

**Raohmaru Toolkit** es un compendio de utilidades ([clases](http://www.kirupa.com/developer/as3/classes_as3_pg1.htm)) programadas y recopiladas durante varios años de desarrollo con la tecnología Adobe Flash, muchas de ellas surgidas de las necesidades de ciertos proyectos, o para cubrir algunas carencias del lenguaje. Es heredera directa de [Raohmaru AS3 Framework](http://code.google.com/p/raohmaru-as3-framework/), mi opera prima en librerías AS3 con un nombre pomposo y erróneo (de [_framework_](http://stackoverflow.com/questions/3057526/framework-vs-toolkit-vs-library) nada, no pasaba de _toolkit_), pero con las clases poco útiles (o inútiles) eliminadas y permaneciendo lo más práctico y esencial. Aunque realmente no aporta nada nuevo al panorama en ActionScript 3, un lenguaje que ha tenido un gran soporte por parte de la comunidad y que cuenta con [excelente librerías](http://www.riaforge.org/index.cfm?event=page.category&id=6), esta compilación es un pequeño grano de arena donde alguien quizá encuentre un trozo de código que le pueda ser de utilidad, o que al examinarlo diga “Vaya, yo lo hubiera programado mejor”.

El código fuente está hospedado en GitHub: [https://github.com/raohmaru/Raohmaru-Toolkit](https://github.com/raohmaru/Raohmaru-Toolkit)  
La descargas en Google Code: [http://code.google.com/p/raohmaru-toolkit/](http://code.google.com/p/raohmaru-toolkit/)  
La documentación se encuentra en Read the Docs: [http://readthedocs.org/docs/raohmaru-toolkit/en/latest/](http://readthedocs.org/docs/raohmaru-toolkit/en/latest/)

Y hablando de licencias, distribuido bajo la [MIT License](http://www.opensource.org/licenses/mit-license.php).

## Aspectos destacados de la librería

**Registro de eventos simplificado**

```js
import jp.raohmaru.toolkit.events.EventRegister;  
import jp.raohmaru.toolkit.events.EventGroup;  
import flash.events.MouseEvent;

// Esto…  
EventRegister.addEventsListener(  
    my_button, // Un bonito botón subclase de InteractiveObject  
    mouseEventsHandler, // La función que gestiona los eventos  
    EventGroup.BUTTON_EVENTS // Un grupo de eventos de ratón  
);  
// … es lo mismo que  
my_button.buttonMode = true;  
my_button.mouseChildren = false;  
my_button.addEventListener(MouseEvent.MOUSE_OVER, mouseEventsHandler);  
my_button.addEventListener(MouseEvent.MOUSE_OUT, mouseEventsHandler);  
my_button.addEventListener(MouseEvent.MOUSE_DOWN, mouseEventsHandler);  
my_button.addEventListener(MouseEvent.MOUSE_UP, mouseEventsHandler);

function mouseEventsHandler(e :MouseEvent) :void  
{  
    trace(e.type);  
}  
```

**Alineación de elementos según las dimensiones del escenario**

```js
import jp.raohmaru.toolkit.display.StageAlignSprite;  
import flash.display.StageAlign;

// La clase es un poco tonta, y se le ha de decir las dimensiones  
// exactas del escenario (aunque sólo una vez)  
StageAlignSprite.init(stage.stageWidth, stage.stageHeight);

// Alinea el botón con respecto a la esquina inferior derecha del  
// escenario. Cada vez que la aplicación cambie de tamaño, la posición  
// del elemento cambiará según las coordenadas de esa esquina.  
new StageAlignSprite(my_button, StageAlign.BOTTOM_RIGHT);

// Lo mismo pero alineado al borde izquierdo del escenario  
new StageAlignSprite(  
    my_other_button,  
    StageAlign.LEFT,  
    // pixelSnap. Ajusta la posición del objeto de visualización a  
    // valores enteros, evitando que se produzca aliasing y los textos  
    // se vean borrosos.  
    true,  
    // waitForBrowserInit. Evita un bug al incrustar un SWF con SWFObject  
    // que reporta incorrectamente el ancho y alto del escenario  
    true  
);  
```

**Paprika**, (otra) librería de movimiento y animación. Paprika surgió de un experimento: un intento de programar una clase sencilla, ligera y rápida como las librerías ya consagradas ([TweenLite](http://www.greensock.com/tweenlite/), [Tweener](http://code.google.com/p/tweener/) o [Tweensy](http://code.google.com/p/tweensy/)), pero sin añadir muchas de sus funcionalidades y bytes extras que no se suelen utilizar. Paprika no tiene efectos, ni líneas de tiempo ni soporta plugins, sencillamente anima sin afectar demasiado al rendimiento.

(Y para que se vea que no hablo en balde, una prueba de rendimiento comparándola con otros motores: [http://raohmaru.com/lab/actionscript/raohmaru-toolkit/paprika_performance_test.html](http://raohmaru.com/lab/actionscript/raohmaru-toolkit/paprika_performance_test.html).  
Estos son los resultados en un Intel Core 2 Duo a 1.6 Ghz:)

| Motor | FPS (Mín. / Máx. / Media) | MEM (Mín. / Máx.) (MB) |
| --- | --- | --- |
| **Paprika** | 12.1 / 13.0 (12.5) | 9.3 / 15.9 |
| **Caurina Tweener** | 6.1 / 8.0 (7.0) | 9.6 / 14.9 |
| **TweenLite** | 11.7 / 12.9 (12.4) | 10.6 / 27.4 |
| **TweensyZero** | 8.8 / 10.4 (9.6) | 9.1 / 15.5 |
| **Eaze** | 12.1 / 13.7 (13.1) | 9.0 / 15.1 |

La clase comprimida ocupa 3.3KB.

```js
import jp.raohmaru.toolkit.motion.Paprika;  
import jp.raohmaru.toolkit.motion.PaprikaSpice;  
import jp.raohmaru.toolkit.motion.easing.\*;  
import flash.filters.BlurFilter;

// Mueve y rota un bonito botón durante 0,5 segundos, siguiendo la  
// interpolación de movimiento cuadrático del sr. Robert Penner,  
// empezando con un retraso de 1 segundo y al finalizar invoca la  
// función "onComplete" pasando un parámetro.  
Paprika.add(my_button, .5,  
    {x:100, y:200, rotation:15},  
    Quad.easeInOut,  
    1,  
    onComplete, [my_button]
);

function onComplete(some_obj :DisplayObject) :void  
{  
    var blur_filter :BlurFilter = new BlurFilter(0, 0);

    // Crea una nueva animación y guarda el objeto en una variable.  
    var spice :PaprikaSpice = Paprika.add(some_obj, 2.1, {scale:3});  
    // Este método se invoca durante la interpolación.  
    spice.onUpdate = function() :void  
    {  
        // A cada paso añade más desenfoque.  
        // PaprikaSpice.progress va del 0 (inicio) al 1 (fin).  
        blur_filter.blurX = blur_filter.blurY = spice.progress \* 20;  
        some_obj.filters = [blur_filter];  
    }  
}  
```
