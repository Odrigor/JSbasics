//Variables y selectores
const formulario =  document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];

    }

    nuevoGasto(gasto){
        this.gastos= [...this.gastos, gasto]
        this.calcularRestante();
        return ;
    }

    calcularRestante(){
        const gasto= this.gastos.reduce( (total, gasto)=> total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gasto;

        console.log(this.restante);
    }

    eliminarGasto(id)
    {
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);
        this.calcularRestante();
        console.log(this.gastos);
    }
}

class UI{
    insertarPresupuesto(cantidad)
    {
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje,tipo)
    {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo ==='error')
        {
            divMensaje.classList.add('altert-danger');
        }
        else{
            divMensaje.classList.add('succes');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(()=>{
            divMensaje.remove();
        }, 3000)
    }

    agregarGastoListado(gastos)
    {
        this.limpiarHTML()
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;
            
            //crear li, agregar al html, boton para borrar, agregar al html

            const nuevoGasto = document.createElement('li');
            nuevoGasto.classList= 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.setAttribute('data-id', id);


            //agregarlo al html gasto

            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>`
            const btnBorrar = document.createElement('button');

            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'borrar &times';

            btnBorrar.onclick = ()=>{    //lo hacemos con una arrow function, ya que queremos que el metodo se ejecute solo cuando hacemos clic, si hacemos btnBorrar.onclick = eliminarGasto(id), se ejecutaria instantaneamente.
                eliminarGasto(id);
            };

            nuevoGasto.appendChild(btnBorrar);
            gastoListado.appendChild(nuevoGasto);

        });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent= restante;

    }

    comprobarPresupuesto(presupuestoObj)
    {
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        //comprobar 25%

        if(presupuesto/4 > restante )
        {
            console.log('si entra el if')
             restanteDiv.classList.remove('alert-success', 'alert-warning');
             restanteDiv.classList.add('alert-danger');
        }
        else if((presupuesto/2) > restante)
        {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }
        else{
            restanteDiv.classList.remove('alert-warning','alert-danger');
            restanteDiv.classList.add('alert-success');
        }

        if(restante<=0){
            ui.imprimirAlerta('El presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled= true;
        }
    }
}

//inicializaciones
const ui = new UI();

let presupuesto ;
// eventos
eventListeners();
function eventListeners(){
    const presupuesto =document.addEventListener('DOMContentLoaded', preguntaPresupuesto() );

    formulario.addEventListener('submit',agregarGasto);
}









//funciones

function preguntaPresupuesto(){
    const presupuestoUsuario = prompt('cual es tu presupuesto ?');

    if(presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(Number(presupuestoUsuario)) || presupuestoUsuario <=0 ) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();
    //leeremos los datos del formularios
    console.log('a');

    const nombre =document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    console.log(nombre, cantidad)
    //validar 
    if(nombre==='' || cantidad===''){
        ui.imprimirAlerta('los datos ingresados, no son validos', 'error');
        return;
    }
    else if (cantidad <=0 || isNaN(cantidad)){
        ui.imprimirAlerta('el monto ingresado en cantidad es erroneo', 'error');
        return;
    }


    //generar un objeto con el gasto 

    const gasto = { nombre, cantidad, id:Date.now() };

    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente', );

    const {gastos, restante}= presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

function eliminarGasto(id)
{
    presupuesto.eliminarGasto(id);
    const {gastos, restante}= presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}