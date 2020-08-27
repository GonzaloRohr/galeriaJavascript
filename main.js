const grid = new Muuri('.grid', {
	layout:{
		  rounding: false
  }
});

window.addEventListener("load",function(){

	grid.refreshItems().layout();
	document.getElementById("grid").classList.add('imagenes-cargadas');

	const enlaces= document.querySelectorAll('#categorias a');

	enlaces.forEach((elemento) => {

		elemento.addEventListener('click', (evento)=>{

			evento.preventDefault();

			enlaces.forEach( (e) =>{ e.classList.remove('activo')} );
			evento.target.classList.add('activo');

			const categoria= evento.target.innerHTML.toLowerCase();

			categoria === 'todos' ? grid.filter('[data-categoria]'): grid.filter(`[data-categoria="${categoria}"`);

		});
	});

	document.querySelector('#barra-busqueda').addEventListener('input', (evento) =>{

		const busqueda= evento.target.value;

		grid.filter( (e) => e.getElement().dataset.etiquetas.includes(busqueda) );
	});

	//
	const overlay= document.getElementById('overlay');

	document.querySelectorAll('.grid .item img').forEach((e) =>{
		
		e.addEventListener("click",() => {
		
			overlay.classList.add('activo');

			const ruta= e.getAttribute('src');
			const descripcion=e.parentNode.parentNode.dataset.descripcion;

			document.querySelector('#overlay img').src= ruta;
			document.querySelector('#overlay .descripcion').innerHTML= descripcion;
		});
	});
	console.log("fuera for");
	//
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay'? overlay.classList.remove('activo'): '';
	});

});

