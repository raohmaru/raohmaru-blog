---
title: Experimentos con la Web Audio API de JavaScript
description: Motor de videojuego en JavaScript.
date: 2019-04-26
tags: ["JavaScript", "Audio"]
language: es
---

La [Web Audio API](https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API) es una interfaz que nos permite generar y modificar flujos de audio. Vamos, crear sonido con JavaScript desde el navegador (o incluso música si eres un virtuoso).

Esta tecnología lleva bastante tiempo disponible ([el primer borrador de la W3C](https://webaudio.github.io/web-audio-api/) data de 2011), y [desde 2014](https://caniuse.com/#search=web%20audio%20api) su soporte está incluído en la mayoría de navegadores web. Varias librerías JavaScript demuestran el potencial de esta API, tales como [Tone.js](https://tonejs.github.io/) o [howler.js](https://howlerjs.com/), y hay web apps que hacen un uso impresionante del sonido sintetizado: véase [Plink](http://labs.dinahmoe.com/plink/) o [Euphony](http://qiao.github.io/euphony/).

Para empezar a trabajar con la Web Audio API hay primero que entender como funciona: toda operación para manipular sonido se realiza dentro de un _contexto sonido_, el cual está diseñado como un sistema de nodos interconectados que transforman uno o varios flujos de sonido. Desde un nodo origen se conectan cualquier número de [nodos de audio](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) que procesan el flujo de audio hasta que finalmente se conecta a un nodo de destino. El flujo de audio pasa por todos estos nodos donde es procesado, hasta terminar en el nodo de destino que puede representar la salida por los altavoces o que se guarde en un archivo. Este conjunto de nodos enlazados se conoce como [audio routing graph](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode#The_audio_routing_graph).

![Contexto de audio y nodos de audio](/img/blog/audio-context.png)

Traducido a JavaScript, todo empieza con el objeto [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext): el contexto de audio que nos permite crear nodos y procesar un flujo de sonido.

```js
// Safari todavía no ha implementado correctamente la API,
// así que tenemos que utilizar la versión con prefijo
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
```

A continuación creamos un par de nodos para procesar el flujo de audio: un nodo para crear un tono constante a 240 Hz ([OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)), y otro nodo para controlar la [ganancia](http://blog.7notasestudio.com/diferencia-entre-ganancia-y-volumen/) ([GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)).

```js
const oscillatorNode = audioCtx.createOscillator();
      oscillatorNode.frequency.setValueAtTime(240, audioCtx.currentTime);
const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
```

Y los conectaremos entre ellos y al [nodo de destino](https://developer.mozilla.org/en-US/docs/Web/API/AudioDestinationNode) por defecto de AudioContext (normalmente es la salida de audio de tu ordenador).

```js
oscillatorNode.connect(gainNode);
gainNode.connect(audioCtx.destination);
```

Finalmente iniciamos el nodo oscilador y nos preparamos para escuchar un sonido monótono bastante insufrible. Pero ¡eh, estamos creando música!

```js
oscillatorNode.start();
```

(_Puedes ver este código en funcionamento_ [_aquí_](https://codepen.io/raohmaru/pen/bJOwvo?editors=1111)_. Asegúrate de bajar el volumen de tus altavoces._)

No voy a profundizar mucho más en la API ya que hay numerosas referencias y tutoriales que la explican con mucho detalle, empezando por [toda esta sección](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) en la fantástica MDN, o [este artículo](https://css-tricks.com/introduction-web-audio-api/) en CSS-Tricks, o [este otro genial artículo](https://www.html5rocks.com/en/tutorials/webaudio/intro/) en HTML5 Rocks (de los primeros que explicaron la Web Audio API).

### El experimento

El ejercicio consiste, tras estudiar la Web Audio API, en crear sonidos sintéticos desde una sencilla aplicación web utilizando un único flujo de audio, pero con libertad para cambiar la mayor cantidad de parámetros posibles. Al no haber estudiado música en mi vida, Hulio, la tarea fue un poco díficil por algunos nuevos conceptos (por lo que recomiendo seguir los enlaces que encontrarás más abajo). Como ayuda, cada párametro que se puede modificar viene acompañado de un breve texto descriptivo para saber qué es lo que estamos tocando.

El resultado es una pequeña aplicación web que genera sonidos utilizando como origen un OscillatorNode (para crear un tono constante) o un [Audio​Buffer​Source​Node](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) (para generar [ruido blanco](https://es.wikipedia.org/wiki/Ruido_blanco)), al que se le aplica un [envolvente acústico](https://en.wikipedia.org/wiki/Envelope_(music)) para hacerlo más natural y filtros personalizables como nodos intermedios. El sonido generado se destina bien a los altavoces del sistema, o bien a un objeto [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob) que el usuario puede guardar en su máquina como un archivo OGG.

[![Simple Synthesizer with Web Audio API](/img/blog/sasynth.png)](https://raohmaru.github.io)

**Puedes jugar con el sintetizador aquí:** [**https://raohmaru.github.io/simple-audio-synthesizer/src/**](https://raohmaru.github.io/simple-audio-synthesizer/src/) 🎵

**O probar el** [**piano electrónico**](https://raohmaru.github.io/simple-audio-synthesizer/src/electric-piano.html) 🎹 **.**

Por supuesto, si tienes curiosidad por ver el código fuente, [lo encontrarás en mi repositorio de GitHub](https://github.com/raohmaru/simple-audio-synthesizer).

### Referencias

+ [Nine Components of Sound](http://www.filmsound.org/articles/ninecomponents/9components.htm)
+ [JavaScript Systems Music](https://teropa.info/blog/2016/07/28/javascript-systems-music.html)
+ [Recreating legendary 8-bit games music with Web Audio API](https://codepen.io/gregh/post/recreating-legendary-8-bit-games-music-with-web-audio-api)
+ [Developing Game Audio with the Web Audio API](https://www.html5rocks.com/en/tutorials/webaudio/games/)
+ [Electric Guitar Synth in HTML5](https://fazli.sapuan.org/blog/electric-guitar-synth-in-html5/)
+ [Synthesising Drum Sounds with the Web Audio API](https://dev.opera.com/articles/drum-sounds-webaudio/)
