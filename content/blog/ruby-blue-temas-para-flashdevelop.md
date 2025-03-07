---
title: Ruby Blue, o como crear temas para FlashDevelop
description: Creación de un tema para el editor FlashDevelop.
date: 2012-06-11
tags: ["as3", "flash", "IDE"]
language: es
---

Quién haya programado algo en [ActionScript](http://es.wikipedia.org/wiki/ActionScript) o [HaXe](http://haxe.org/) seguramente conocerá el programa [FlashDevelop](http://www.flashdevelop.org/), un editor de código [open source](http://en.wikipedia.org/wiki/Open_source "Código abierto") bastante completo y potente para Windows (creo que para Linux y Mac hay una [versión con MonoDevelop](http://www.joshuagranick.com/blog/?p=753)).

El único inconveniente que le veo (que más quieres, es gratuito) es que no hay ninguna manera evidente de cambiar el _theme_ – los colores de la ventana de edición de código. Otros entornos como [Eclipse](http://www.eclipse.org/) permiten muy fácilmente cambiar el tema de colores (gracias al _plugin_ [Eclipse Color Themes](http://eclipsecolorthemes.org/)), y después de haber probado combinaciones de fondos oscuros como [Oblivion](http://eclipsecolorthemes.org/?view=theme&id=1) o [Solarized Dark](http://eclipsecolorthemes.org/?view=theme&id=1115) una ventana de edición en blanco quema mis retinas.

![Pantalla de edición de FlashDevelop](/img/fdtheme-1.png)

_Una página con fondo blanco, el horror…_

Así, para cambiar el _theme_ a FlashDevelop es necesario obtener un archivo .FDZ (que no es más que un archivo comprimido ZIP con otra extensión), ejecutarlo y aceptar la instalación. La próxima vez que se lance FlashDevelop habrá cambiado de colores, probablemente a mejor.  
**(Puedes probar con [éste archivo FDZ basado en Ruby Blue](http://www.mediafire.com/?p735dywb2npnu2y), creado por mismamente yo.)**

Ahora que sabemos como alterar la combinación de colores, crear un tema nuevo será igual de sencillo.Como ya hemos comentado, un archivo de tema FDZ es en realidad un archivo comprimido que contiene una estructura de directorios y algunos archivos [XML](http://www.w3.org/XML/) que definen los colores para cada lenguaje.

![Estructura de un archivo FDZ](/img/fdtheme-2.png)

_Estructura de un archivo FDZ_

Entonces, para empezar a crear el tema, se ha de replicar esa misma jerarquía de carpetas en algún sitio del disco duro, si se quiere dentro de un directorio con el nombre del tema:

`Mi tema\$(BaseDir)\Settings\Languages\`

A continuación, navegamos hasta la carpeta de instalación de FlashDevelop (normalmente se encuentra en el directorio Archivos de programa) y copiamos todos los archivos XML que se encuentran en la subcarpeta  
`FlashDevelop\Settings\Languages\`

Estos archivos se han de pegar en la carpeta `Languages\` de nuestro tema.

El siguiente paso es editar cada uno de los archivos XML, que corresponden a los diferentes lenguajes de programación que soporta FlashDevelop (AS3.xml, CSS.xml, HaXe.xml, etc.), cambiando los valores de los colores por otros que nos gusten más. Estos valores se encuentran hacía al final del fichero XML, en los [nodos](http://en.wikipedia.org/wiki/Node_(computer_science)) `<editor-style>` y `<use-styles>`, y son números en [notación hexadecimal](http://es.kioskea.net/contents/base/hexa.php3) (con un `0x` delante, al parecer heredado del todopoderoso [C](http://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n))).

```xml
<editor-style caret-fore="0x000000" caretline-back="0xececec" selection-fore="0xffffff" selection-back="0x3399ff" />  
<use-styles>  
<style name="default" fore="0x000000" back="0xffffff" size="9" font="Courier New" />  
<style name="commentline" fore="0x008000" />  
<style name="number" fore="0x000099" />  
<style name="string" fore="0xa31515" />  
<style name="character" fore="0xa31515" />  
<style name="word" fore="0x000099" />  
<style name="triple" />  
<style name="tripledouble" />  
<style name="classname" />  
<style name="defname" />  
<style name="operator" />  
<style name="identifier" />  
<style name="commentblock" fore="0x008000" />  
<style name="stringeol" />  
<style name="word2" fore="0x008080" />  
<style name="decorator" />  
<style name="gdefault" fore="0xc0c0c0" />  
<style name="linenumber" fore="0x666666" />  
<style name="bracelight" fore="0x0000cc" back="0xcdcdff" bold="true" />  
<style name="bracebad" bold="true" />  
<style name="controlchar" fore="0xffffff" />  
<style name="indentguide" fore="0xc0c0c0" />  
<style name="lastpredefined" fore="0x666666" />  
</use-styles>  
```

_Combinación de colores por defecto de Phyton (Python.xml)._

Se puede identificar el uso de cada color por el [atributo](http://en.wikipedia.org/wiki/XML#Key_terminology) `name` del estilo, así como distinguir del color para el texto (fore, de _foreground_) del color para el fondo o relleno (back, de _background_).

Cuando terminemos de cambiar los códigos de color, es el momento de empaquetarlo todo en un archivo FDZ: comprimimos en un ZIP la carpeta `$(BaseDir)/` con todo su contenido, y al archivo resultante lo renombramos a:  
`_el-nombre-de-tu-tema_.fdz`  
(Subrayo la importancia de cambiar la extensión .ZIP a .FDZ para que el tema funcione.)

Para probarlo, instala el archivo FDZ como hemos explicado más arriba (ejecutar y aceptar). FlashDevelop tendrá unos flamantes colores nuevos al gusto del usuario.
