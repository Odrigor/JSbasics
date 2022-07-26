//Primero importamos los elementos del html que vamos a usar

const formulario = document.querySelector('#formItem');
const mensaje = document.querySelector('#mensaje');
const listaItems = document.querySelector('#Items');
const elimina = document.querySelector('#elimina');


//definimos los event listeners

// para el boton elimina, detectamos el evento click,
elimina.addEventListener('click',(e)=>{
    console.log('clickeaste el para eliminar los marcados');

    //recorrer la lista de item y remover los que estan marcados
    const elements = document.querySelectorAll('li');
    //traemos todos los elemenots li

    // hacemos un if elements, ya que si esta vacio, es null y no entrara al if, y basta con que tenga almenos un elemento para que entre
    if(elements){
        elements.forEach(function(element){
            if(element.querySelector('input').checked){ //validamos si esta checkeado el input
                element.remove(); // en caso de entrar, removemos del html
            }
        });
    }

})

formulario.addEventListener('submit',(e)=>{
    e.preventDefault(); // hacemos que no se actualize al apretar f5
    let a = document.querySelector('#item').value; //traemos el valor de lo que este en el input item
    if(a!==''){//validamos que no sea un string vacio
        mostrarError('elemento recibido');
        const checkBox= document.createElement('INPUT'); //creamos los elementos html
        const item = document.createElement('li');
        checkBox.setAttribute('type','checkBox');//atributos de checkbox
        item.setAttribute('data-id', Date.now() ); // data id para el li
        item.innerText=(`${a}`);//el texto 
        item.appendChild(checkBox); //a item se el aniade de hijo, el checkbox

        listaItems.appendChild(item); // ala lista le aniadimos el item



    }
    else{
        mostrarError('El elemento vacio no es aceptado');
    }
});

//funciones externa, esta es para mostrar un mensaje de error
function mostrarError(msj) 
{
    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj
    mensajeError.classList.add('error')
    
    
    const errores = document.querySelectorAll('.error')

    if (errores.length === 0)
    {
        mensaje.appendChild(mensajeError);
        setTimeout(()=>{
            mensajeError.remove();
        }, 3000)
    }
}