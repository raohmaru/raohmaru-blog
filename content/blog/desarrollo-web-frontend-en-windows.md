---
title: Desarrollo web frontend en Windows
description: Desarrollo web frontend en Windows. De verdad.
date: 2020-06-20
tags: ["General", "IDE", "Windows"]
language: es
---

Sí, has leído bien. Aunque se ha generalizado la idea que los programadores frontend utilizan [Linux](https://es.wikipedia.org/wiki/GNU/Linux) y los diseñadores Mac (y que todavía llevan gafas de pasta), muchas empresas están atadas a Microsoft (para bien o para mal), y la mayoría de hogares tienen un PC con Windows porque a) es mucho más barato que un MacBook Pro, y b) Windows viene normalmente de serie.

Y por supuesto, el que escribe estas líneas lo hace desde un PC con Windows 10. Y si estás leyendo todo esto, intuyo que tú también.

También asumiré que el lector tiene conocimientos sobre programación de aplicaciones web, así que vayamos directamente al grano.

## Las Herramientas

Para programar hace falta un editor de texto avanzado, y aquí tenemos varias opciones:

+ [Visual Studio Code](https://code.visualstudio.com/): Básicamente es la versión reducida del gran (y viejo) Visual Studio enfocada al desarrollo web. Todos los niños guays lo utilizan, así que mejor echarle un vistazo. Es tan personalizable y tiene tantos _plugins_ que no es extraño que sea el editor preferido para programar con _frameworks_ o con [TypeScript](https://www.typescriptlang.org/).
+ Siguiendo la estela de VS Code vienen [Atom](https://atom.io/) (de GitHub, que ahora es propiedad de Microsoft) y [Brackets](http://brackets.io/) (de Adobe), ambos construidos con [Electron](https://github.com/electron/electron) (correcto, se pueden hacer aplicaciones de ordenador con HTML, JavaScript y CSS) y que se pueden extender por igual para cubrir cualquier necesidad. Ambos fueron creados como editores de _frontend_, lo cual es bueno. La pega es que no son tan rápidos como VS Code (en cuanto a rendimiento).

![Estadísticas de Atom, Brackets y Visual Studio Code en GitHub](/img/estadisticas-editores-github.png)

_Estadísticas de Atom, Brackets y Visual Studio Code en GitHub._  
_Fuente: [stackshare.io](https://stackshare.io/stackups/atom-vs-brackets-vs-visual-studio-code)_

Si atendemos a las estadísticas, VS Code es el claro ganador, pero para gustos…

Seguimos ahora con los editores más _hardcore_ para los programadores duros (pero no tanto como para atreverse con [Vim](https://es.wikipedia.org/wiki/Vim) o [Emacs](https://es.wikipedia.org/wiki/Emacs)):

+ [Sublime Text](https://www.sublimetext.com/): En la web reza “_A sophisticated text editor_”, y es verdad que cuando fue lanzado así lo era. Ahora es una pieza clásica pero sigue funcionando muy bien. Todos los editores modernos deben mucho a Sublime Text, desde el uso de _plugins_ para extenderlo o los comandos de teclado. Es posible realizar todo sin necesidad de tocar el ratón, por lo que está más enfocado a la productividad que los otros editores.
+ [Notepad++](https://notepad-plus-plus.org/). La niña de mis ojos. No es bonito, la interfaz no es muy amigable y parece rescatado de un disco duro de 512 MB con Windows 95. Pero es muy rápido (puede substituir al Bloc de notas), se puede editar cualquier lenguaje y con los _plugins_ existentes se puede poner a la altura del resto de editores.

## node.js y NVM

Si eres _frontender_, conocerás a la fuerza [node.js](https://nodejs.org/es/). No creo que haya proyecto profesional cuyo código no sea analizado y transpilado con alguna herramienta (Webpack, Rollup, Parcel) que se ejecute con node.js.

El problema más común al trabajar en diferentes proyectos es que éstos suelen ejecutarse con versiones diferentes de node.js, por lo que más óptimo es tener un programa que gestione las versiones de node.js por ti.

1.  No instales node.js del ejecutable que se puede descargar de su página oficial. Y si ya lo tienes, desinstálalo. 
2.  Instala [nvm for windows](https://github.com/coreybutler/nvm-windows).

Con NVM podrás instalar cualesquiera versiones de node.js, y cambiar en cualquier momento la versión activa para ejecutar tu proyecto sin problemas de compatibilidad.

![nvm ejecutándose en un terminal](/img/nvm.png)

## El Servidor de Desarrollo

Aunque esto depende más de la plataforma donde va a ejecutarse la web (PHP? Ruby? .NET?), para testear una web estática o una [SPA](https://es.wikipedia.org/wiki/Single-page_application) en tu ordenador no hace falta una compleja configuración.

Si estás utilizando Webpack, entonces podrás fácilmente implementar el [servidor de desarrollo](https://webpack.js.org/guides/development/#using-webpack-dev-server) cambiando la configuración (disponible sin plugins adicionales desde la versión 4). En node.js también hay varias opciones con diferente grado de dificultad para montar un servidor local, ya sea utilizando un _package_ ([Express](https://expressjs.com/), [Server](https://serverjs.io/)) o programándolo a pelo con el módulo [HTTP](https://nodejs.org/api/http.html).

Personalmente prefiero utilizar un breve comando en el terminal para levantar un servidor en cualquier directorio y no tener que configurar mucho (o nada si es posible). Y para lograrlo tenemos dos opciones:

1.  **Si tienes instalado [Python](https://es.wikipedia.org/wiki/Python) en tu ordenador**, entonces ya tienes un servidor súper económico y fácil de arrancar desde el terminal:  
    ```bash
    python -m http.server 8000
    ```
    Abre http://localhost:8000/ y podrás acceder a tu página.  
    
2.  **Hay una alternativa parecida que utiliza node.js**, del que ya hemos hablado que tienes instalado con nvm (¿verdad?). Es el [Live Server](https://github.com/tapio/live-server) y lo puedes ejecutar utilizando el comando [npx](https://github.com/npm/npx):  
    ```bash
    npx live-server
    ```
    Tarda más en arrancar que el servidor de Python, pero puedes guardar la configuración en un archivo `.live-server.json`. Y como que mola más si está hecho en node.js, ¿no?

## El Repositorio

No importa qué tipo de proyecto vayas a trabajar, ya sea profesional o personal, la gente que almacena su código en un repositorio es un 68% más feliz (dato sin confirmar).  
Aquí no voy a debatir sobre cuál [VCS](https://es.wikipedia.org/wiki/Control_de_versiones) es mejor, pero indudablemete [git](https://es.wikipedia.org/wiki/Git) es el más popular ya que hay muchas plataformas gratuitas para alojar código.

![git-flow](/img/git-flow.png)

Utilizar git en Windows es bastante sencillo, sólo necesitas dos cosas:

1.  Descargarlo de [https://git-scm.com/download/win](https://git-scm.com/download/win) e instalarlo,
2.  Instalar una interfaz gráfica como [Git Extensions](https://gitextensions.github.io/) o [Sourcetree](https://www.sourcetreeapp.com/).

En verdad el punto dos no es necesario si quieres utilizar git desde la línea de comandos, es simplemente una elección de comodidad.

Una vez instalado git, necesitarás conectarte al servidor donde subir tu código por SSH de manera segura utilizando un par de [claves pública y privada](https://es.wikipedia.org/wiki/Criptograf%C3%ADa_asim%C3%A9trica). Cada vez que ejecutes `git pull` o `git push`, el servidor debe verificar que eres tú. La mejor opción es que consultes con la plataforma de alojamiento cómo conseguir estas claves, y que para esto último utilices el programa [PuTTY](https://putty.org/).

## Bonus: El Terminal

Durante el desarrollo nos vamos a pasar mucho tiempo tecleando en el terminal, y mejor hacerlo en uno que sea más práctico que la consola de Windows.

![Cmder terminal](/img/cmder.png)

Para ser sinceros no hay muchas opciones, pero la que más destaca es [Cmder](https://cmder.net/): un reemplazo de la vetusta consola de Windows, con colores (parece una nimiedad pero ayuda mucho en la legibilidad), integración con git, aparece en el menú contextual de Windows para poder abrir un terminal en cualquier carpeta, personalizable, y tiene la opción de poder ejecutar cualquier [shell](https://es.wikipedia.org/wiki/Shell_de_Unix) en una pestaña nueva.

Sin contar con los terminales que se pueden obtener con el [subsistema de Windows para Linux](https://docs.microsoft.com/es-es/windows/wsl/install-win10), es lo más cerca que se puede llegar a un terminal de MacOS o Linux.
