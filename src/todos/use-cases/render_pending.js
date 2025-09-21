import todoStore, { Filters } from "../../store/todo-store";

let element; // --> espacio en memoria para guardar la seleccion del elemento html
/**
 * 
 * @param { HTMLLabelElement } idElements 
 */
export const countPeding = ( idElements => {

    if ( !element ) element = document.querySelector( idElements ); // verifico si el elmento html existe
    
    if ( !element ) throw new Error(`El elemento ${ idElements } no se encontro--> not fount`); // si despues de asignarlo aun no existe new error
          
    
    element.innerHTML = todoStore.getTodos( Filters.pending).length // renderza el largo de arreglos de TODOS por el filtro pediente 


});