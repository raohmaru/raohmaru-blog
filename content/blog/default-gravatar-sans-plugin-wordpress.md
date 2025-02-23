---
title: Default Gravatar Sans, un plugin para WordPress
description: Creación de un plugin para Wordpress.
date: 2012-04-29
tags: worpdress
---

Tras actualizar la bitácora a la plataforma [WordPress](http://es.wordpress.org/), el siguiente paso ha sido descubrir y jugar con la configuración hasta quedar satisfecho, o al menos casi satisfecho: no me acaba de convencer el sistema para mostrar los [avatares](http://es.wikipedia.org/wiki/Avatar_%28Internet%29) de los usuarios. Por imperativo del [CMS](http://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_contenidos) las imágenes son «filtradas» por el sitio [Gravatar.com](http://gravatar.com/) aun cuando éstas sean archivos locales sin ninguna afiliación a tal sitio.

Así, si yo quiero mostrar una imagen para los usuarios que comentan sin estar identificados, por ejemplo

`http://raohmaru.com/blog/wp-content/uploads/2012/04/default_avatar.png`

la dirección URL se convierte en

`http://1.gravatar.com/avatar/f944229af6b258c09f105781f66ef3e5?d=http://raohmaru.com/blog/wp-content/uploads/2012/04/default_avatar.png`

Ésta acción puede provocar dos situaciones:

*   En el caso de sobrecarga de los servidores de Gravatar.com, puede ralentizar la carga del blog y demorar la ejecución de [scripts](http://es.wikipedia.org/wiki/Script) mientras se espera la respuesta del servidor.
*   El e-mail del usuario va codificado en la petición:`http://1.gravatar.com/avatar/**f944229af6b258c09f105781f66ef3e5**`y esto no acaba de ser del todo seguro (en este [enlace](http://www.developer.it/post/gravatars-why-publishing-your-email-s-hash-is-not-a-good-idea) explican el problema de privacidad que supone).

Mi solución ha sido programar un [_plugin_](http://es.wikipedia.org/wiki/Complemento_%28inform%C3%A1tica%29) para WordPress (¡el primero!) en PHP, que inhabilita por completo las redirecciones a Gravatar.com, y que añade también una opción para utilizar una imagen cualquiera como avatar por defecto.

A continuación más información sobre el plugin y el enlace al archivo para su descarga.

**\[Actualizado el 29/04/2012\]**  
Plugin registrado en WordPress.org: [http://wordpress.org/extend/plugins/default-gravatar-sans/](http://wordpress.org/extend/plugins/default-gravatar-sans/)

## Default Gravatar Sans

![Opciones de configuración del plugin](/img/default-gravatar-sans.png)

[**Download Default Gravatar Sans 1.0**](http://www.mediafire.com/?v2j5unkb0guz139)

Disables Gravatar.com avatars, and allows one local default avatar image for users without avatar in his profile. To be used alongside [Simple Local Avatars](http://www.get10up.com/plugins/simple-local-avatars-wordpress/).

Based on the plugin [Disable Default Avatars](http://wordpress.stackexchange.com/questions/17413/removing-gravatar-com-support-for-wordpress-and-simple-local-avatars) by [TheDeadMedic](http://wordpress.stackexchange.com/users/1685/thedeadmedic).

Installation

1.  Install with the WordPress plugin control panel, or download the plugin, unzip and upload the extracted folder to the ‘/wp-content/plugins/’ directory.
2.  Activate the plugin through the ‘Plugins’ menu in WordPress.
3.  Change the URL option of the default Local Avatar under Settings > Discussion.
