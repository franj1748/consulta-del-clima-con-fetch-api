# Consulta del clima por país y cuidad con Fetch API. 

Datos meteorológicos de una manera rápida y fácil de leer, con tecnología de OpenWeather, un equipo de expertos en TI y científicos de datos que ha estado practicando la ciencia de datos meteorológicos profundos desde hace varios años. 

## Lenguajes

* HTML.
* CSS.
* JavaScript.
* Bootstrap 5.

## Contenido 

Los archivos dentro de la carpeta en la ruta `src/js` son: 

* `app.js`: Contiene la declaración de variables, eventos y funciones necesarias para el funcionamiento de la página.

Se usa una expresion regular, para validar el campo de formulario de la cuidad: 

```JavaScript
const regexp = /^[a-zA-ZÀ-ÿ\s]{1,20}$/;
```
Para consultar el clima, y otros datos asociados, deberá hacer una consulta con una URL de este tipo: [https://api.openweathermap.org/data/2.5/weather?q={cuidad},{pais}&lang=sp&units=metric&appid={apiKey}](https://api.openweathermap.org/data/2.5/weather?q={cuidad},{pais}&lang=sp&units=metric&appid={apiKey})

Puede obtener acceso a la API desde su [página oficial](https://openweathermap.org/).

Pruebe la consulta del clima desde aquí {@link https://franj1748.github.io/consulta-del-clima-con-fetch-api/}

![clima](https://accesoweb.online/images/clima_fetch_API/clima_fetch_API.png)

### Contacto: 

* [Linkedin]
* [GitHub]
* [Telegram]











[Linkedin]:https://www.linkedin.com/in/francisco-elis-24506b209
[GitHub]:https://github.com/franj1748
[Telegram]:https://t.me/franciscoj1748
























