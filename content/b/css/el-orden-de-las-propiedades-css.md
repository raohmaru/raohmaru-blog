---
title: Orden de las propiedades en CSS
description: Cómo ordenar las propiedades de una declaración CSS.
date: 2015-09-04
tags: ["CSS"]
language: es
---

# El orden de las propiedades CSS

Si eres de los que escriben páginas y páginas de CSS (o utilizas pre-procesadores como SASS, LESS, Stylus, o [tu propio pre-procesador](https://github.com/reworkcss/rework)), alguna vez te habrá asaltado la duda de en qué orden deberían ir las propiedades de las reglas CSS. ¿Al azar? ¿Alfabéticamente? ¿Siguiendo algún patrón arcano?

Ordenar las propiedades CSS ayuda a mantener una estructura de código clara, y evita que pierdas tiempo pensando en dónde poner (o no poner) una nueva propiedad. Además, si trabajas en un equipo con otros amantes del CSS como tú te será más fácil leer código que no has escrito, y de alguna manera estarás contribuyendo a crear una guía del estilo del proyecto (hay por ahí fuera excelentes _guidelines_ que tratan este mismo tema: [Code Guide by @mdo](http://codeguide.co/#css-declaration-order), [WordPress CSS coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/css/#property-ordering)).

## Ordenar por funcionalidad

Varios autores coinciden en que una de las maneras más óptimas de ordenar es agrupando las propiedades por su funcionalidad, en diferentes grupos de categorías. El método más empleado para ello, que a mi parecer es uno de los más lógicos, es el conocido como “_Outside In_”: agrupar las propiedades por cómo afectan a los elementos de su entorno, para acabar en detalles internos que no tienen impacto en la composición.

Por ejemplo, este es el orden que sugiere Guy Routledge [en su entrada acerca del método _Outside In_](http://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685):

*   Composición (`position`, `float`, `clear`, `display`)
*   Modelo de caja (`width`, `height`, `margin`, `padding`)
*   Propiedades visuales (`color`, `background`, `border`, `box-shadow`)
*   Tipografía (`font-size`, `font-family`, `text-align`, `text-transform`)
*   Miscelánea (`cursor`, `overflow`, `z-index`)

En mi opinión, este acercamiento falla al considerar la apariencia (color, fondo, borde) un grado más importante que la tipografía, cuando esta última tiene propiedades que afectan a la composición (`font-size`) o a la comprensión del texto (`font-family`, `font-style`) (y si no que le pregunten a John Kane).

Mi modesta propuesta es la siguiente:

*   Posicionamiento (`position`, `top`, `right`, `bottom`, `left`, `z-index`)
*   Composición (`float`, `clear`, `display`, `box-sizing`, `visibility`, `overflow`, `clip`)
*   Modelo de caja (`width`, `height`, `margin`, `padding`)
*   Contenidos especiales (`list`, `table`, `quotes`, `content`, `counter`)
*   Tipografía y texto (`font`, `text-align`, `text-transform`)
*   Color y apariencia (`outline`, `color`, `background`, `border`)
*   Efectos visuales (`box-shadow`, `text-shadow`, `transform`, `transition`)
*   Miscelánea (`opacity`, `cursor`, `filters`)
*   Impresión (`page-break`, `orphans`, `widows`)

```css
.rascar-capac {
	position: absolute;
	top: 0;
	left: 10px;
	overflow: scroll;
	box-sizing: border-box;
	width: 200px;
	height: 100%;
	padding: 10px;
	font: 300 1em/1.2 Arial,Helvetica,sans-serif;
	text-align: right;
	color: #333;
	background-color: rgba(0,0,0,.5);
	box-shadow: 1px 2px 5px #abc;
	cursor: pointer;
}
```

**Nota:** Aunque la propiedad `border` [modifica el modelo de caja](http://www.w3.org/TR/CSS2/box.html), en la nueva revisión [está en la misma categoría](http://www.w3.org/TR/css3-background/#borders) que `background`, por lo que se suele escribir justo después de esta segunda.

La única ocasión en que considero se puede romper este método de ordenación es con el contenido generado con `::before` o `::after`, ya que por legibilidad es mejor colocar la propiedad `content` en la primera línea.

```css
.huascar:after {
	content: attr(data-soleil) " ";
	font-size: 2rem;
	opacity: .6;
}
```

## Peina tu CSS

Ahora bien, este método de ordenación se puede aplicar en nuevos desarrollos, pero a lo mejor estás pensando qué hacer con ese archivo CSS de 5000 y pico líneas en el que estás trabajando ahora mismo. ¿Te vas a poner a ordenar todas las propiedades? Seguramente no, pero hay una herramienta que puede hacerlo por ti.

[CSScomb](https://github.com/csscomb/csscomb.js) es una utilidad en la forma de paquete de [node.js](https://nodejs.org/en/about/) (o de _plugin_ para editores de código), que como su autor explica en [esta entrada de Smashing Magazine](http://www.smashingmagazine.com/2012/10/csscomb-tool-sort-css-properties/), produce un archivo CSS con las propiedades ordenadas (y formateadas) según una de las tres opciones disponibles (por defecto el orden que sugiere el creador, el de Zen Coding o el de Yandex). También permite personalizar ese orden, aunque para este fin se tiene que copiar una de las tres configuraciones predefinidas a la raíz del proyecto, renombrar el archivo a “.csscomb.json” y editar el campo `sort-order` al antojo.

Si se quiere crear unas directrices para desarrollar CSS, esta utilidad puede ayudar a “forzar” un estilo coherente en un equipo de trabajo si se integra con un ejecutor de tareas como [Grunt](https://www.npmjs.com/package/grunt-csscomb), [Gulp](https://www.npmjs.com/package/gulp-csscomb) o [Brunch](https://github.com/garetht/csscomb-brunch) (nombres como estos siempre me traen a la memoria [ese tweet](https://twitter.com/ironshay/status/370525864523743232) de Shay Friedman).

## ~~Reflexiones finales~~

La verdad es que creo que el título en inglés queda mejor.

## Final thoughts

Ordenar las propiedades CSS es como ordenar las especias en un cajón de la cocina: puede ser algo muy personal en el que una opinión no tiene por qué ser más válida que la otra (¿la pimienta va después que la canela?). Por ejemplo, los que apuestan por el orden alfabético [hacen hincapié en su simplicidad](http://meiert.com/en/blog/20140924/on-declaration-sorting/), y es el método recomendado en la [guía de estilo de Google](https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml?showone=Declaration_Order#Declaration_Order).  
Para gustos, `border-radius`.

### Referencias

+ [“Outside In” — Ordering CSS Properties by Importance](http://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)
+ [Zen CSS properties](https://code.google.com/p/zen-coding/wiki/ZenCSSPropertiesEn)

### Para saber más

+ Idiomatic CSS: [https://github.com/necolas/idiomatic-css](https://github.com/necolas/idiomatic-css)
+ SMACSS: [https://smacss.com/](https://smacss.com/)
