---
title: Múltiples enlaces simbólicos en Windows
description: Cómo crear enlaces simbólicos en Windows.
date: 2016-01-31
tags: ["shell", "Windows"]
language: es
---

Con esta entrada estreno una serie de publicaciones donde compartir unas pequeñas utilidades que he desarrollado, que me han ayudado a solucionar un problema en concreto e incluso me ha hecho ser un poco más productivo (de verdad).

A veces nos encontramos que nos falta una herramienta para evitar tener que hacer alguna tarea tediosa manualmente. Es entonces cuando programamos una pequeña pieza de software para que lo haga por nosotros, invocando de esta manera la Primera Virtud del Programador según [Larry Wall](https://es.wikipedia.org/wiki/Larry_Wall) (correcto, esa es la Pereza).

Pero, ¿y por qué compartirla? ¿De verdad a alguien le va a interesar? Es probable que a nadie le vaya a resultar tremendamente útil, pero como _frontender_ casi que tengo la obligación de devolver algo a la comunidad (en este punto me adhiero al [Front End Manifesto](http://f2em.com/#give-back)).

Y aquí va entonces la utilidad:

Un script de [Batch](https://en.wikipedia.org/wiki/Batch_file) para Windows con el que crear [enlaces simbólicos](http://www.tecnologiadigerida.com/2007/11/links-simblicos-en-windows.html) de las subcarpetas de un directorio en otro directorio de destino. Utiliza el comando [`mklink`](https://technet.microsoft.com/es-es/library/cc753194%28v=ws.10%29.aspx) para enlazar cada subcarpeta con su destino.

```shell
@ECHO OFF

IF "%~1"=="" GOTO Continue  
IF "%~1"=="-h" GOTO Continue  
IF "%~2"=="" GOTO No2ndParam  
IF NOT EXIST %1 GOTO NoWinDir1  
IF NOT EXIST %2 GOTO NoWinDir2

PUSHD %1

FOR /D %%G in ("\*") DO (  
    mklink /J "%~2\\%%G" "%%G"  
)  
POPD  
GOTO:EOF

:NoWinDir1  
ECHO %1 is not a valid directory. Type "create_symlink -h" to get help.  
EXIT /B 0

:NoWinDir2  
ECHO %2 is not a valid directory. Type "create_symlink -h" to get help.  
EXIT /B 0

:No2ndParam  
ECHO Missing argument target_dir. Type "create_symlink -h" to get help.  
EXIT /B 0

:Continue  
ECHO Creates a symlink in the target directory for each folder in the source directory.  
ECHO Usage: create_symlink source_dir target_dir  
ECHO[  
ECHO source_dir The source directory with subfolders to symlink  
ECHO target_dir The target directory where to create the symlinks  
```

El problema que soluciona es que `mklink` solo permite enlazar un archivo o carpeta a la vez, con lo que enlazar varios elementos puede ser muy tedioso.

Y aquí el script guardado en mi cuenta de GitHub Gist para quien quiera descargarlo: [https://gist.github.com/raohmaru/3199ef79a4223cd3921d](https://gist.github.com/raohmaru/3199ef79a4223cd3921d)
