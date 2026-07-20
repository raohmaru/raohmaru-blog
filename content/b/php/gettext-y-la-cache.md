---
title: gettext y la caché
description: El problema de la cache en GNU gettext.
date: 2012-06-08
tags: ["i18n", "PHP"]
language: es
---

Siguiendo con el [tema del día anterior](./internacionalizacion-en-php.md), que versaba sobre la [internacionalización](http://es.wikipedia.org/wiki/Internacionalizaci%C3%B3n_y_localizaci%C3%B3n) en PHP y la herramienta [GNU gettext](http://www.gnu.org/software/gettext/), nos dejamos en el tintero el problema de la caché.

Cada vez que una aplicación PHP pide amablemente a la [extensión gettext](http://php.net/manual/es/book.gettext.php) que establezca un nuevo dominio, indicando la ruta a los archivos de traducción MO, con un código como el que sigue:

```php
// Especifica la ruta a los catálogos de traducción:  
// /locale/<lang_COUNTRY>/LC_MESSAGES/mydomain.mo  
bindtextdomain("mydomain", "./locale");  
```

gettext en respuesta lee esos archivos MO según el [código idioma/país](http://www.langtag.net/) del usuario y los carga en memoria, para disponer de su contenido a voluntad sin necesidad de leerlos de nuevo con cada petición de traducción.

Y he aquí el problema: gettext considera que mientras estén en memoria no hace falta acceder a esos archivos físicamente (leerlos otra vez), **aunque su contenido haya cambiado** (esto es, los archivos han sido cacheados). Y como que esa memoria es la [memoria RAM](http://es.wikipedia.org/wiki/Memoria_de_acceso_aleatorio) del ordenador que hace de servidor, perdurarán durante todo el tiempo de ejecución del programa servidor (que normalmente es [Apache HTTP Server](http://httpd.apache.org/) cuando tratamos con PHP). Consecuencias: posteriores cambios en el texto, nuevas traducciones añadidas al catálogo, eliminaciones, etc., no se verán reflejadas en nuestro sitio aunque actualicemos en el servidor una nueva versión de los archivos MO.

Por suerte la comunidad de PHP es muy grande y ya han lidiado con este tema, y las muchas soluciones que se han aportado se pueden resumir en tres ideas (ya adelanto que la que más me gusta es la tercera):

**1. Reinicia Apache**  
La solución más drástica pero efectiva: al reiniciar el servidor se libera la memoria RAM que ocupaba, y la próxima invocación a `bindtextdomain()` cargará de nuevo el archivo.

Lo malo: sólo para _hostings_ dedicados, donde te dejan toquetear casi todo (que por algo lo pagas). En _hostings_ compartidos no se tiene este acceso al programa.

**2. Renombrar catálogo**  
¿Qué gettext no recarga el archivo MO? Pues engáñalo, renombrando el archivo para que piense que es nuevo de fábrica y quiera leerlo con avidez.

Para no tener que hacer este paso manualmente con cada edición de la traducción, se pueden utilizar rutinas como [ésta](http://php.net/manual/es/book.gettext.php#105413) de los comentarios del manual de PHP, o [esta otra](http://blog.ghost3k.net/articles/php/11/gettext-caching-in-php) de un tal ghost3k.

A tener en cuenta que con este proceso se van añadiendo a la memoria nuevos archivos sin liberar los anteriores, y desconozco que impacto puede tener a largo plazo si se hacen muchas modificaciones en archivos MO gordos (o grandes, o pesados).

**3. Si la montaña no viene a Mahoma, pasa de la montaña**  
Utilizar una alternativa a `gettext()` pero manteniendo sus funcionalidades. Existen algunas librerías que sin hacer uso de GNU gettext emulan sus métodos y cargan por igual archivos de catálogo MO, pero sin la contrapartida de la caché.

La parte negativa es que al no utilizar precisamente gettext, el rendimiento puede ser más bajo con archivos grandes (como más tiempo de carga de la página).

**[php-gettext](https://launchpad.net/php-gettext/)** es una de estas librerías que nos puede ayudar. Es sencilla y el autor asegura que está muy optimizada, aunque no se actualiza desde finales del 2010.

La instalación e implementación es bastante sencilla, basta con descargar el archivo comprimido, descomprimirlo y subirlo al servidor; entonces se ha de configurar para su uso y listo. Pongo a continuación un ejemplo de esto último.

```php
<?php  
// Define el idioma y región del usuario  
$user_locale = ‘es_ES’;

// Incluímos los archivos necesarios de php-gettext  
include("php-gettext/gettext.php");  
include("php-gettext/streams.php");

// Crea un lector de archivos MO, e indicamos la ruta del archivo  
// que queremos leer en el idioma del usuario  
$locale_streamer = new FileReader(‘locale/’.$user_locale.’.mo’);  
$locale_reader = new gettext_reader($locale_streamer);

// Función de atajo para traducir cadenas  
function __($text)  
{  
    global $locale_reader;  
    return $locale_reader->translate($text);  
}

// Función de atajo para traducir cadenas en plural  
function _n($text, $plural, $number)  
{  
    global $locale_reader;  
    return $locale_reader->ngettext($text, $plural, $number);  
}

// Función de atajo que imprime directamente la traducción  
function _e($text)  
{  
    echo __($text);  
}  
?>  
```

Otra librería de localización de las que emulan gettext, interesante y muy completa, la encontramos en el corazón de [WordPress](http://wordpress.org/), que aunque no tiene nombre oficial vamos a llamarla **[Gettext_Translations](http://phpdoc.wordpress.org/trunk/pomo/translations/Gettext_Translations.html)**. En una distribución típica de WordPress (a la fecha del artículo van por la versión 3.3.2) los archivos de esta librería están ubicados en wp-includes/pomo/, y en el archivo wp-includes/l10n.php es donde se cocina todo. A parte de en el presente blog no he podido probarla en otros proyectos, pero parece que el [rendimiento no es muy bueno](http://core.trac.wordpress.org/ticket/17128).

## Conclusión

GNU gettext fue desarrollado para aplicaciones de escritorio, mótivo por el que hace uso de una memoria caché para acelerar y optimizar las tareas de traducción que perdura hasta que se cierra la aplicación. Pero se pueden producir efectos no deseados en aplicaciones en el lado del servidor donde los datos cambian continuamente, en la forma de textos no actualizados en las páginas.
