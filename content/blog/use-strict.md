---
title: use strict
description: Qué es el modo estricto en JavaScript.
date: 2012-07-12
tags: ["JavaScript"]
language: es
---

Como si de un aviso de alguna hermética entidad se tratara, desde hace un par de años ha ido apareciendo en las entrañas de algunas librerías JavaScript y en ejemplos de código dispersos por la red la enigmática frase **‘use strict’**.

¿Y qué demonios significa esta sentencia?

Más o menos indica al motor de interpretación de JavaScript de tu navegador favorito (y moderno, no me utilices Internet Explorer) que sea más restrictivo en la ejecución de _scripts_, un poco más seguro, y allá donde antes era permisivo y hacía la vista gorda ahora emita errores y regañe al programador.

Así por ejemplo, crear una variable global dentro del contexto de una función:

```js
function testFunction()  
{  
    var localVar = true;  
    globalVar = 4;  
}  
testFunction();  
```

Con ‘use strict’ genera un error pues deja de estar permitido crear variables globales de forma implícita (tiene que haber sido declarada previamente con la palabra clave `var`):

```js
function testFunction()  
{  
    ‘use strict’; // A partir de aquí modo estricto

    var localVar = true;  
    globalVar = 4; // Emite un ReferenceError  
}  
testFunction();  
```

El uso de este modo “estricto” viene promovido desde la 5ª edición de la especificación del lenguaje ECMAScript, que es algo así como un primo cercano que define como debe comportarse el lenguaje y como deben interpretarlo los motores o _engines_.

Un poco hartos los señores de [Ecma International](http://es.wikipedia.org/wiki/ECMA) que les gritaran por la calle que JavaScript era un lenguaje _malo_ (hasta Google les ha perdido el respeto y han creado [Dart](http://www.dartlang.org/) con la intención de sustituirlo), decidieron corregir el mal uso del lenguaje y evitar sus puntos débiles implementando un modo que forzara a _programar mejor_ y/o con más cuidado, y que obligase a prestar mayor atención a los errores que por la flexibilidad de JavaScript se pasan por alto.

Por ventura ‘use strict’ no afecta a todo el código de un documento JavaScript: únicamente define como estricto el contexto donde va incluida la sentencia. Toda la programación de un archivo JS puede estar en modo estricto si ‘use strict’ se pone en el ámbito global, o sólo el contenido de una función o un _[closure](https://developer.mozilla.org/en/JavaScript/Guide/Closures)_ si se define dentro de la misma. Esto permite a nuestro código feo y no estricto incluir librerías externas que sí estén en modo estricto.

```js
// Código no estricto

(function(){  
    ‘use strict’;  
    // En esta función el modo estricto está activado  
})();

// Código no estricto  
```

Por supuesto que la utilización de ‘use strict’ en nuestro código no nos hará mejores programadores, ni es un hechizo que optimice nuestra aplicación: simplemente ayuda al desarrollador a ser más eficiente y le protege de consabidos errores al trabajar con JavaScript.

## Restricciones impuestas por el ‘strict mode’

Estas son las restricciones que impone el modo estricto de JavaScript. Cabe recordar que no todos los navegadores las cumplen a rajatabla.

+ Convierte faltas o descuidos en excepciones de error (o errores de excepción).
+ No permite el uso de números enteros en [base octal](http://www.javascripter.net/faq/octalsan.htm). A parte de en MundoDisco, ¿quién más los utiliza?  
    ```js
    ‘use strict’;  
    var octal_int = 036; // SyntaxError  
    ```
+ Impide crear variables de ámbito global “accidentalmente”. Toda variable ha de estar previamente declarada.  
    ```js
    ‘use strict’;  
    globalVar = true; // ReferenceError  
    ```
+ Lo que se crea con `eval()`, se queda en `eval()`. O lo que es lo mismo: las variables instanciadas dentro del contexto de `eval()` sólo son válidas en ese contexto.  
    ```js
    ‘use strict’;  
    var a = ‘Tesla’;  
    var evalA = eval(‘var a = "Nicola"; a;’);  
    a; // = ‘Tesla’  
    evalA; // = ‘Nicola’  
    ```
+ Las propiedades inseguras `arguments.caller` y `arguments.callee` se eliminan, así como `Function.arguments` and `Function.caller`.
+ La sentencia `with(){}` se va al garete. Además de no estar optimizada sólo daba dolores de cabeza.
+ Mejorando la seguridad, la palabra clave `this` dentro de una función ya no intenta hacer referencia al objeto global `Window` si se ha invocado sin especificar el ámbito; en lugar de eso devolverá `null` o `undefined`.  
    Sin modo estricto:
    ```js
    function notfun() { return this; }  
    var o = notfun(); // Obtiene un objeto Window  
    ```
    
    En modo estricto:  
    (ejemplo extraído de [https://developer.mozilla.org/en/JavaScript/Strict_mode](https://developer.mozilla.org/en/JavaScript/Strict_mode))
    
    ```js
    ‘use strict’;
    
    function fun() { return this; }  
    // Estas comparaciones devuelven true  
    console.log(fun() === undefined);  
    console.log(fun.call(2) === 2);  
    console.log(fun.apply(null) === null);  
    console.log(fun.call(undefined) === undefined);  
    console.log(fun.bind(true)() === true);  
    ```
    
+ Violación de las propiedades de un objeto: prohibido borrar o sobrescribir propiedades [no configurables](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty#Configurable_attribute) de objetos, así como borrar variables, funciones o argumentos (sin modo estricto falla sin aviso, en modo estricto lanza un error).  
    ```js
    ‘use strict’;
    
    delete Object.prototype; // TypeError  
    NaN = 37; // NaN is read-only  
    var foo = ‘bar’;  
    delete foo; // TypeError  
    ```
    

## Para saber más

+ Tabla de compatibilidad de ECMAScript 5: [http://kangax.github.com/es5-compat-table/](http://kangax.github.com/es5-compat-table/)
+ Definición de _strict mode_ en Mozilla Developer Network: [https://developer.mozilla.org/en/JavaScript/Strict_mode](https://developer.mozilla.org/en/JavaScript/Strict_mode)
+ Strict mode_ según MSDN: [http://msdn.microsoft.com/en-us/library/br230269%28v=vs.94%29.aspx](http://msdn.microsoft.com/en-us/library/br230269%28v=vs.94%29.aspx)
+ Test de soporte de ‘use strict’ vía navegador (por [Angus Crol](http://www.twitter.com/angusTweets)): [http://java-script.limewebs.com/strictMode/test_hosted.html](http://java-script.limewebs.com/strictMode/test_hosted.html)
+ La especificación de ECMAScript 5 (+10.000 puntos de experiencia a quien se lo lea): [http://ecma262-5.com/ELS5_HTML.htm](http://ecma262-5.com/ELS5_HTML.htm)
