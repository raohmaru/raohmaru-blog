---
title: Internacionalización en PHP
description: Internacionalización en PHP con GNU gettext.
date: 2012-05-18
tags: ["i18n", "PHP"]
language: es
---

En el desarrollo de un sitio web muchas veces nos hemos encontrado con el desafío de la traducción, servir páginas en diferentes idiomas sin que esto suponga un calvario por duplicar contenidos y/o hacer el código más difícil de mantener (y como consecuencia romper una de las [reglas básicas](http://identidadgeek.com/el-mejor-consejo-para-los-programadores-en-la-historia-de-la-humanidad/2010/01/) para el buen mantenimiento del código). En informática de software el proceso de llevar a buen término esta tarea se conoce como [Internacionalización](http://es.wikipedia.org/wiki/Internacionalizaci%C3%B3n_y_localizaci%C3%B3n): diseñar un programa capaz de adaptarse a distintas lenguas sin realizar cambios en el código.

Si hablamos de un [microsite](http://en.wikipedia.org/wiki/Microsite) sencillo de páginas estáticas, una opción rápida y barata es utilizar el Traductor de sitios de Google, un fragmento de JavaScript de esos _plug-and-play_ que hace todo el trabajo por nosotros sin tocar el codigo HTML. La parte negativa es que la traducción no es muy fiel, y además hacemos publicidad gratuita a los de Mountain View.

Cuando se trata de sitios complejos, dinámicos, y cuya traducción posiblemente se haya contratado a profesionales, es necesario entonces programar el sitio de manera que los textos traducidos sean independientes de la maquetación, para una fácil modificación de los mismos en caso de correcciones o erratas, permitiendo además que alguien ajeno al mundo de la programación sea capaz de actualizar ese texto (pues eso, i18n).  
Trabajando con PHP como tecnología del servidor, había recurrido en varios proyectos a uno de estos dos métodos:

+ Almacenar todas las cadenas de texto en una base de datos, recuperándolas según el idioma del usuario. En este caso a través de un [CMS](http://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_contenidos) se podía editar el texto.
+ En un archivo PHP crear una tabla de cadenas (al estilo de las utilizadas como [recursos](http://msdn.microsoft.com/es-es/library/fdfxk9a4%28v=vs.80%29.aspx) en algunos sistemas operativos) con los textos referenciados por un identificador. Luego simplemente se obtiene de la matriz una cadena en determinado  un idioma.

En ambos casos, un recurso se carga y es mostrado al usuario el texto correspondiente.

```php
<?php  
$lang = ‘es_ES’; // Define el idioma del usuario  
$locale = $locales[$lang]; // Obtiene los textos de algún recurso  
?>  
<p><?php echo $locale[‘intro’]; ?></p>  
```

Entonces, buscando como otros habían resuelto éste mismo problema en PHP, me topé con gettext, los archivos PO y los MO; una solución sencilla y elegante.

## GNU gettext

[gettext](http://www.gnu.org/software/gettext/) es un conjunto de herramientas para ayudar a la [localización](http://es.wikipedia.org/wiki/Internacionalizaci%C3%B3n_y_localizaci%C3%B3n#Localizaci.C3.B3n) de un programa, desarrollado dentro del proyecto [GNU](http://es.wikipedia.org/wiki/GNU) y disponible en tu servidor Linux más cercano. La principal ventaja que ofrece es que agiliza y automatiza las tareas de internacionalización de un sitio web, ya que PHP da soporte a estas herramientas a través de una [API](http://www.php.net/manual/en/book.gettext.php), con funciones como [`gettext()`](http://www.php.net/manual/en/function.gettext.php) o [`ngettext()`](http://www.php.net/manual/en/function.ngettext.php).

**Procedimiento a seguir**

En un proyecto PHP, tras maquetar todas las páginas e incluir los textos en el idioma original (en nuestro ejemplo en latín clásico), se han de reemplazar estos por un `echo` de la función `gettext()` con ese mismo texto como argumento.

Dado el fragmento de código…

```php
<h1>Lorem ipsum dolor sit amet</h1>  
<p>Consectetur adipiscing elit. Donec convallis mauris eu est hendrerit luctus…</p>  
```

… reemplazar el texto por…

```php
<h1><?php echo gettext(‘Lorem ipsum dolor sit amet’); ?></h1>  
<p><?php echo gettext(‘Consectetur adipiscing elit. Donec convallis mauris eu est hendrerit luctus…’); ?></p>  
```

O si preferimos por el alias `_()`, más corto y legible

```php
<h1><?php echo _(‘Lorem ipsum dolor sit amet’); ?></h1>  
<p><?php echo _(‘Consectetur adipiscing elit. Donec convallis mauris eu est hendrerit luctus…’); ?></p>  
```

El siguiente paso es extraer el texto de los archivos y con él generar una plantilla o «catálogo» con el que trabajar y traducir. Estos catálogos son un tipo de archivo especial (PO) creados con la herramienta [xgettext](http://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/Template.html) (consultar el enlace para más información). Por suerte, para usuarios de Windows como nosotros, existe un pequeño pero potentísimo programa con interfaz gráfica que nos servirá de mucha ayuda: [Poedit](http://www.poedit.net/).

Una vez descargado y ejecutado, creamos un nuevo catálogo y en la ventana emergente vamos a la pestaña Carpetas. En este apartado es donde hemos de incluir la ruta a nuestros archivos del proyecto que queremos traducir.

![Creación de un nuevo catálogo con Poedit](/img/poedit-1.png)

Tras aceptar la configuración y guardar el archivo con extensión .POT (esto es importante), Poedit buscará en los archivos PHP del proyecto cualquier coincidencia con las funciones `gettext()` o `_()` (o las que hayamos definido), extraerá el texto y nos presentará en pantalla el resultado.

![Traducir con Poedit](/img/poedit-2.png )

Este archivo POT con todos los textos de nuestro proyecto servirá de plantilla para la traducción a otros idiomas, desde el mismo programa, facilitando incluso que personas ajenas puedan realizar la traducción sin mancharse las manos con el código.

Para empezar a traducir, desde Poedit se ha de crear un nuevo catálogo por idioma utilizando la plantilla POT anterior (_Archivo_ > _Nuevo catálogo desde un archivo POT…_). Esta vez lo único que se cambiará en las propiedades serán los campos Idioma y País acordes al texto de destino (seleccionar un País es opcional, pero ayuda a identificar mejor la traducción y poder crear otras en un mismo idioma pero para regiones diferentes, como Quenya-Noldor y Quenya-Vanyar). Una vez acometidas las traducciones, guardamos el archivo siguiendo unas reglas especiales:

+ Primero, creamos en nuestro proyecto una carpeta donde iran los archivos de las traducciones. Por convención la nombraremos «locale».
+ Dentro de esta carpeta debemos crear una subcarpeta por archivo de traducción según el [código de idioma](http://www.gnu.org/software/gettext/manual/html_node/Usual-Language-Codes.html) y el [código de país](http://www.gnu.org/software/gettext/manual/html_node/Country-Codes.html) (si hemos especificado alguno). Y dentro de esta subcarpeta, una nueva de nombre «LC_MESSAGES» donde finalmente guardaremos el archivo.
+ El nombre de archivo que pongamos debe ser el mismo para todas las traducciones. Así, si nombramos «example_gettext» a nuestra primera traducción, el resto debe ir con ese mismo nombre (pero en su respectiva carpeta de idioma).

Al guardar con Poedit, se genera un archivo PO y otro MO: el primero es el catálogo editable, y el segundo es ese mismo catálogo en formato binario que gettext carga y utiliza para la traducción.  
La estructura de directorios de la carpeta de L10n quedaría así:  
`/locale/es_ES/LC_MESSAGES/example_gettext.po   /locale/ca_ES/LC_MESSAGES/example_gettext.po   /locale/xx_YY/LC_MESSAGES/example_gettext.po`

Ahora llega el momento de utilizar estos catálogos de traducción en nuestro proyecto. Existe mucha literatura sobre la inicialización de gettext, como los comentarios en la [página de referencia](http://www.php.net/manual/en/book.gettext.php) de la función o [este artículo](http://www.mclibre.org/consultar/php/lecciones/php_gettext.html) de Bartolomé Sintes, pero he aquí mi receta:

```php
<?php
// Este código ha de ir antes que cualquier llamada a gettext()

// Definimos el idioma del usuario  
$user_locale = ‘es_ES’;

// Establece variables de entorno en el idioma del usuario  
putenv("LANGUAGE=$user_locale");  
putenv("LANG=$user_locale"); // Por si LANGUAGE falla  
// No es recomendable establecer LC_ALL  
// http://www.php.net/manual/es/ref.gettext.php#68853  
//putenv("LC_ALL=$user_locale");

// En el caso que utilicemos Apache bajo Windows (con XAMPP por  
// ejemplo), la constante no está definido por defecto  
if (!defined(‘LC_MESSAGES’)) define(‘LC_MESSAGES’, 5);  
// Establece la información de la configuración regional  
setlocale(LC_MESSAGES, $user_locale);

// Especifica la ruta a los catálogos de traducción y el "dominio"  
// al que pertenecen: el nombre de nuestros archivos MO  
bindtextdomain("example_gettext", "./locale");  
textdomain("example_gettext");
?>  
```

Ahora, cuando visualicemos nuestro sitio todos los textos se traducirán al idioma definido, obteniéndolos de los archivos MO.

 Nota:  Si PHP dice algo tan feo como «_Warning: putenv(): Safe Mode warning: Cannot set environment variable ‘LANGUAGE’_«, es que se está ejecutando en modo [safe_mode](http://www.php.net/manual/en/features.safe-mode.php). Para evitar este error, se ha de añadir al archivo php.ini la siguiente línea:  
`safe_mode_allowed_env_vars = PHP_,LANG,LANGUAGE`

Feliz i18n.
