
import { Todo } from '../todos/models/todo-models';


// centralizar las opciones del filter
export const Filters = {
    All:        'all',
    Completed:  'completed',
    pending:    'Pending',
}

  /** Objeto listas archivadas --> state {
     * todoList: [ new Todo ( description ) ]--> Arreglo de lista de tareas por hacer },
     * new Todo -->  instacia de la class Todo 
    */
  
const state = {

    toDoList:[
       
        new Todo ( 'El éxito es la suma de pequeños esfuerzos repetidos día tras día' ),
        new Todo ( 'No te rindas, a veces la última llave es la que abre la puerta' ),
        new Todo ( 'Cree en ti mismo, eres capaz de lograr grandes cosas' ),
        new Todo ( 'Cada día es una nueva oportunidad para mejorar' ),
        new Todo ( 'El único límite es tu mente' ),
    ],

    filter: Filters.All, // agrego una nueva propiedad key--> filtro 

}
// INICIO LISTAS ARCHIVADAS
const initStore = () => {
    loadStore();

    console.log({ state, Filters });
    console.log( 'init Store 🏪​' );

}

// CARGAR LISTA ARCHIVADAS
const loadStore = () => {

    if (!localStorage.getItem('state')) return; // si no hay nada en locastoragen del state no continues!

    const { toDoList = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

    state.toDoList = toDoList;
    state.filter   = filter;

}
// saved localStore
const saveLocalState = ()=>{

    localStorage.setItem('state', JSON.stringify(state))
}

// Obtener la lista de tareas por filtro
const getTodos = ( filter = Filters.All ) => {

    switch (filter) {
        case Filters.All:
            return [...state.toDoList];

        case Filters.Completed:
            return state.toDoList.filter( todo => todo.done); // filtra los true

        case Filters.pending:
            return state.toDoList.filter( todo => !todo.done); // filtra los false

        default:
            throw new Error(`Option ${ filter } is not valiud`);
            
    
    }

}


/** AGREGAR UNA LISTA DE TAREAS 
 * @param {String} description
 */
const addTodos = ( description ) => {
  if ( !description ) throw new Error( 'Not Implement' );

  state.toDoList.push( new Todo(description) );
  saveLocalState();
    
}

/** selector cambio de la propiedad done, ubicandolo atraves del identificar unico
 * cambia done: true o false
 * @param {String} todoId uudi
 */
const toggleTodos = ( todoId ) => {
    // console.log({todoId});
    
    state.toDoList = state.toDoList.map( todo => {

        if ( todo.id === todoId){

            todo.done = !todo.done // cambio el estado true / false 
          
        }
        return todo; // retorno los items del map en este caso los todo
    })
    
    saveLocalState();

    // state.toDoList = state.toDoList.find((objecTodo)=>{
    //     if (objecTodo.id === todoId){
        
    //     objecTodo.id = !objecTodo.id

    //     }
        
    // });
   

}


/**BORRAR UNA LISTA ARCHIVADA
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
   
   state.toDoList = state.toDoList.filter(( todo )=> todo.id !== todoId); // reasignamos al objeto los elementos filtrados y por consiguiente se elimina el elemento con id no desado
  saveLocalState();
}

// Borrar todos los que tenga filtro completado 'completed'
const deleteCompleted = () => {

    state.toDoList = state.toDoList.filter(( todo )=> !todo.done) // true--> todo.done === 'completed'

    saveLocalState();
}


// agregar un nuevo filtro
/**
 * 
 * @param { Filtro <String> } newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {

    // Object.keys(Filters).includes(newFilter)--> devuelve un arreglo con las propiedades del Objeto filters y includes verfifica si exite o no true o false
    //
    // Object.hasOwn 

    ( Object.hasOwn( Filters, newFilter ) ) ? alert('el argumento ya existe o esta vacio') : state.filter = newFilter
    saveLocalState();

  
}

// acceso controlado AL OBEJTO STATE
const getCurrentFilter = () => {
    return state.filter 

}




export default {
    addTodos,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodos,
  
}
