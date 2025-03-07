---
title: Plugin para WordPress revisitado
description: Actualizando un plugin de Wordpress.
date: 2017-12-26
tags: ["worpdress", "PHP"]
language: es
---

Hace un tiempo, para inaugurar este blog publiqué una entrada sobre un _plugin_ de WordPress que había desarrollado, que arreglaba una pequeña función de los avatares de usuario que me molestaba un poco.

> [Default Gravatar Sans, un plugin para WordPress](/default-gravatar-sans-plugin-wordpress.md)

[Seis años han pasado](https://plugins.trac.wordpress.org/log/default-gravatar-sans/) ya desde que fuera subido al directorio de plugins de WordPress.org. Cómo que el plugin lo desarrollé para mi blog, y no dejó de funcionar en las sucesivas actualizaciones de WordPress, no volví a preocuparme por él en todo este tiempo.

Ahora bien, un día de este año se me ocurrió revisitar la página del plugin y descubrí que se había installado más de 100 veces (¡eso son 16,66666666666667 instalaciones por año!), pero más importante aún, [había recibido dos reseñas](https://wordpress.org/support/plugin/default-gravatar-sans/reviews/?filter=5), y una de ellas con críticas constructivas.

Escritas en 2014.

Y las había omitido completamente.

Cómo brillantemente comenta [Christian Heilmann](https://christianheilmann.com/) en una publicación en SitePoint, [**Open Source es comunicación**](https://www.sitepoint.com/open-sourcing-javascript-code/#opensourceiscommunication). Uno debe tomar la responsabilidad de lo que publica, escuchar a la comunidad y estar dispuesto a mejorar para hacer un gran _software_. Esto demuestra que te preocupas por lo que has creado y que quieres hacer más. ¿Cuántas veces hemos rechazado una librería porqué no se ha actualizado en años y parece abandonada (y desconocemos si será compatible todavía)?

> Releasing Open Source means you get known and take on more responsibility. \[…\] You push yourself to be more of a human developer than just a code developer.
> 
> — _Christian Heilmann_

Obviamente yo no hice nada de lo anterior.

Programar es como esculpir una obra que jamás se termina, siempre puede mejorarse. Y aunque sólo le interese a una persona en todo el mundo lo que hayas hecho, el esfuerzo habrá merecido la pena. Y en cierta medida es reconfortante.

Continuando con la metáfora del escultor, un poco avergonzado saqué el cincel y martillo y actualicé el plugin siguiendo los consejos de una de las reseñas, además de [crear un repositorio en Github](https://github.com/raohmaru/default-gravatar-sans) (para la publicación en WordPress.org se sigue utilizando [SVN](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/), pero considero que es más eficiente utilizar git). Ahora espero seguir mejorándolo mientras haya gente que lo utilice, y no esperarme otros seis años.
