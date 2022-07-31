/**
 * Formulario de búsqueda.
 * @type {HTMLElement} 
 */
const formulario   = document.querySelector('#formulario');
/**
 * Contenedor donde aparece las temperaturas según los resultados de la búsqueda. 
 * @type {HTMLElement} 
 */
const resultado    = document.querySelector('#resultado');
/**
 * Contenedor de los datos adicionales provenientes de la búsqueda. 
 * @type {HTMLElement} 
 */
const otrosDatos   = document.querySelector('#otrosDatos');
/**
 * Expresión regular para validar el campo de ciudad del formulario.
 * @type {RegExp} 
 */
const regexp  	   = /^[a-zA-ZÀ-ÿ\s]{1,20}$/; // Letras y espacios, pueden llevar acentos. De 1 a 20 caracteres.
/**
 * Valor booleano que determinada si la validación del campo de cuidad fue exitosa o no. 
 * @type {boolean} 
 */
let passValidation = false; 

document.addEventListener('DOMContentLoaded', () => {

	formulario.addEventListener('submit', buscarClima);
	formulario[id ='cuidad'].addEventListener('keyup', validarCampo);
	formulario[id ='cuidad'].addEventListener('blur', validarCampo);

});

/**
 * Validación del campo de formulario donde se ingresa la ciudad. 
 * @param {Event} e El evento que se desencadena.
 */
function validarCampo(e) {
	
	if(regexp.test(e.target.value)){
		e.target.classList.remove('is-invalid');
		e.target.classList.add('is-valid');
		passValidation = true
	} else {
		e.target.classList.add('is-invalid');
		e.target.classList.remove('is-valid');
		passValidation = false; 
	}

}

/**
 * Al hacer clic en el botón de Obtener clima, se validan los campos del formulario, si las validaciones son exitosas, se consulta la API de los datos del clima. 
 * @param {Event} e El evento que se desencadena.
 * @returns Si ocurre algún error, devuelve el control a la función que llamó. 
 */
function buscarClima(e) {
	
	e.preventDefault();

	const country = formulario[id ='country'].value;
	const cuidad  = formulario[id ='cuidad'].value;

	if (country == '' || cuidad == '') {

		mostrarAlerta('¡Error!', 'Todos los campos son obligatorios', 'error', 'Cerrar');
		return
	}

	if(!passValidation){

		formulario[id ='cuidad'].focus();
		return
	}

	consultarAPi(cuidad, country);

}

/**
 * Consulta a la API del clima. 
 * @param {FormDataEntryValue} cuidad El valor del campo del formulario para la ciudad.
 * @param {FormDataEntryValue} country El valor del campo del formulario para el país.
 */
function consultarAPi(cuidad, country) {

	const apiKey = '29482357a5b7a7395d3831cbe8c9a7cd';
	const url    = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${country}&lang=sp&units=metric&appid=${apiKey}`
	
	placeholder();

	fetch(url)
		.then(respuesta => respuesta.json())
		.then(data => {
			if (data.cod == '404') {
				mostrarAlerta('¡Error!', 'Cuidad no encontrada', 'error', 'Cerrar');
				return;
			}

			imprimirClima(data);
		})
}

/**
 * Imprime los resultados de la consulta a la API en el HTML. 
 * @param {JSON} datos La respuesta JSON de la consulta a la API.
 */
function imprimirClima(datos) {

	//En orden de aparición: longitud, latitud, descripción del clima, temperatura (Celsius), temperatura máxima del día, temperatura mínima del día, presión atmosférica (hPa), humedad (%), velocidad del viento (metro/seg), nubosidad (%), nombre de la cuidad. 
	const {coord:{lon, lat}, weather:{0:{description, icon}}, main:{temp, temp_min, temp_max, pressure, humidity}, wind:{speed}, clouds:{all}, name} = datos;

	resultado.innerHTML = `
		<p class="display-6 mt-4 text-white">Temperatura en ${name}</p>
		<p class="display-1 mt-2 text-white"><abbr title="Grados Celsius" class="initialism"><strong>${temp}</strong></abbr> &#8451</p>
		<p class="mt-2 mb-1 text-white">Máxima: <strong>${temp_max}</strong> &#8451</p>
		<p class="text-white">Mínima: <strong>${temp_min}</strong> &#8451</p>`; 

	otrosDatos.innerHTML = `
		<li class="list-group-item text-start d-flex justify-content-center lh-sm">
			<div>
				<div class="d-flex justify-content-center align-items-center">
					<h6 class="my-0">Clima</h6>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">${description.toUpperCase()}</small>
				</div>
				<div class="d-flex justify-content-center align-items-center">
                    <img class="" width="100" height="100" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icono_clima">
                </div>
			</div>
		</li>
		<li class="list-group-item text-start d-flex justify-content-center lh-sm">
			<div>
				<div class="d-flex justify-content-center align-items-center">
					<h6 class="my-0">Ubicación</h6>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Longitud: ${lon}&#176;</small><br>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Latitud: ${lat}&#176;</small>
				</div>
			</div>
		</li>
		<li class="list-group-item text-start d-flex justify-content-center lh-sm">
			<div>
				<div class="d-flex justify-content-center align-items-center">
					<h6 class="my-0">Atmósfera</h6>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Presión: ${pressure}hPa</small><br>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Humedad: ${humidity}%</small>
				</div>
			</div>
		</li>
		<li class="list-group-item text-start d-flex justify-content-center lh-sm">
			<div>
				<div class="d-flex justify-content-center align-items-center">
					<h6 class="my-0">Vientos</h6>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Velocidad: ${speed}m/s</small><br>
				</div>
			</div>
		</li>
		<li class="list-group-item text-start d-flex justify-content-center lh-sm">
			<div>
				<div class="d-flex justify-content-center align-items-center">
					<h6 class="my-0">Nubosidad</h6>
				</div>
				<div class="d-flex justify-content-center align-items-center">
					<small class="text-muted">Densidad: ${all}%</small><br>
				</div>
			</div>
		</li>`;

}

/**
 * Imprime un efecto de espera mientras se cargan los resultados de la API. 
 */
function placeholder() {
	
	resultado.innerHTML = `
		<p class="display-6 mt-4 text-white placeholder-glow"><span class="placeholder col-10"></span></p>
		<p class="display-1 mt-2 text-white placeholder-glow"><abbr title="Grados Celsius" class="initialism"><strong class="placeholder col-8"></strong></abbr></p>
		<p class="mt-2 mb-1 text-white placeholder-glow"><strong class="placeholder col-5 placeholder-lg"></strong></p>
		<p class="text-white placeholder-glow"><strong class="placeholder col-5 placeholder-lg"></strong></p>
	`;
}

/**
 * Imprime alertas desde cualquier parte.  
 * @param {String} titulo Titulo de la alerta.
 * @param {String} mensaje Cuerpo de la alerta.
 * @param {String} tipo El tipo de alerta. 
 * @param {String} btn Texto para el botón de cerrar. 
 */
function mostrarAlerta(titulo, mensaje, tipo, btn){
	swal({
		title: titulo,
		text: mensaje,
		icon: tipo,
		button: btn,
		closeOnClickOutside: false,
		closeOnEsc: false,
	});
}