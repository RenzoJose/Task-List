import { Todo } from '../models/todo-models'; // solo se importa para aclarar el parametro todo y muestre la info de como esta creado
import { createElemtHtml } from './create-todo-htm';

let elements;

/** Fuction
 * representacion visual de la lista de tareas
 * @param { HTMLUListElement <string> } elemntId 
 * @param { Todo } todos 
 */

export const renderTodos = ( elemntId, todos =[] ) => {

    // console.log(elemntId, todos);
    // si ele elemento no existe hago la asignacion
   if ( !elements ) elements = document.querySelector( elemntId );
    
    // si elemento no existe depues de hacer la asignacion 
    if (!elements) throw new Error( `Elemento ${elemntId} no found, no se encontro` );
    
    elements.innerHTML = ''; // PURGAMOS EL CONTENIDO PARA QUE NO SE APILEN LOS TODOS(LISTA DE TAREAS)
        
    
    
    // recorremos cada uno de los TODOS CREADOS E INSERTAMOS EN EL HTML 
    todos.forEach(  elemenTodo => {

        elements.append( createElemtHtml ( elemenTodo )); 
        
    });
    

}
