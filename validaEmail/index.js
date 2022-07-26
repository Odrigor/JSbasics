
const cont = document.querySelector('#email');  // hacemos un querySelector, para traer ele elemntoq ue tenga el valor del atributo id, si fueraa por clases seria .email
const mensaje = document.querySelector('#mensaje'); // traemis desde el html el elemnto, que tenga el valor del atributo id, mensaje, si fuera por clases deberia ser .mensaje

eventListeners();   // ejecutamos la funcion que contiene los event listeners

function eventListeners()
{
    document.addEventListener('submit', (e)=> e.preventDefault()) // con esta linea, desactivamos que al presionar enter, se recarge la pagina
    cont.addEventListener('blur', validaEmail); // al momento de clickear fuera del contenedor, se ejecutara la funcion, valida email
}

function validaEmail(e)
{
    /**
     * par validar e mails de manera profesional, se usan expresiones regulares, la mayoria del tiempo ya estan escritas y cuestion
     * de buscarlas por internet, para validar email usaremos https://www.emailregex.com/
     */
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(er.test( e.target.value))
    {
        console.log('mail valido')
        const error = document.querySelector('p.error'); // aqui buscamos si existe el elemento html, que avisa de que habia un error en el mail, para proceder a eliminarlo
        if(error!==null){
            error.remove();
        }
        
    }
    else{
        console.log('mail no valido');
        mostrarError('mail no valido :D'); // en caso de que no sea valido, agregamos un html, que dice que el mail no es valido
    }
    console.log('validando');
}

function mostrarError(msj) 
{
    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj
    mensajeError.classList.add('error')
    
    
    const errores = document.querySelectorAll('.error')

    if (errores.length === 0)
    {
        mensaje.appendChild(mensajeError); 
    }
}