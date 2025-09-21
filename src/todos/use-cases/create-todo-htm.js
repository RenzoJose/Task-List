import { Todo } from "../models/todo-models"; // class todo para documentacion del parametro, para ver ue tipo de elemento se espera


/**creo los elementos en el html  de nuestra lista de tareas
 * 
 * @param {Todo} reciveTodo 
 */

 export const createElemtHtml = ( reciveTodo ) => {

    if( !reciveTodo ) throw new Error( 'UN OBJETO DE LISTA DE TAREAS ES REQUERIDO' );
    
    const { done, essay, id } = reciveTodo; // desestructuro las propiedades de Todo recibidos


    const createHtml = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : ''}>
            <label>${ essay }</label>
            <button class="destroy"></button>
        </div>
       
    `
    //* note: ${ reciveTodo.done ? 'checked' : '' --> verifico si tiene algun valor, si es true hacer checked en el checkbox si no  quedate vacio''


    const liElement = document.createElement('li');
    liElement.innerHTML = createHtml;

    liElement.setAttribute('data-id', id);

    if ( done ) liElement.classList.add('completed'); 


    return liElement;

}