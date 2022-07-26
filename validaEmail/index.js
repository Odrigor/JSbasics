
const cont = document.querySelector('#email');  // hacemos un querySelector,
const mensaje = document.querySelector('#mensaje');

eventListeners();

function eventListeners()
{
    document.addEventListener('submit', (e)=> e.preventDefault())
    cont.addEventListener('blur', validaEmail);
}

function validaEmail(e)
{
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(er.test( e.target.value))
    {
        console.log('mail valido')
        const error = document.querySelector('p.error');
        if(!error){
            error.remove();
        }
        
    }
    else{
        console.log('mail no valido');
        mostrarError('mail no valido :D');
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