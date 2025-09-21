
import   htmlBody                   from '../todos/app.html?raw';
import   todoStore, { Filters }     from '../store/todo-store';
import { renderTodos, countPeding } from './use-cases'; // busca por defecto la carpeta index.js

// obejtivo es crear string con identificadores de clases del html 
const idsList = {

    Tasktodo        : '.todo-list', // HACE REFERENCIA --> <ul class="todo-list">
    NewTodoInput    : '#new-todo-input',
    deleteTodo      : '.destroy',
    clearCompleted  : '.clear-completed',
    selectedBtn     : '.selected',
    labelPeding     : '#pending-count',

}


/**creamos modulo completo de la aplicacion dentro una arrowfunction
 * 
 * @param { HTMLDivElement } itemsId 
 */
export const appDev = ( itemsId ) =>{ 

    // render info TODOS 
    const ShowTodos = () => {

        const deployTodos = todoStore.getTodos( todoStore.getCurrentFilter() ); // obtengo el filtro actual
        renderTodos(idsList.Tasktodo, deployTodos); // renderizo segun el filtro e inserto en la clase html 
        updatePeding();
    }

    const updatePeding = () => {

        countPeding( idsList.labelPeding ); 

    }

    // cuando se llame Funcion AppDev() cree primero el html restante y luego renderiza
    (()=>{

        const appNew = document.createElement('div'); // creo una caja en html

        appNew.innerHTML = htmlBody // dentro div nuevo creado -> inserto el html importado app.html

        document.querySelector( itemsId ).append( appNew ); // dentro del div id= "app" agrego el nuevo div creado en appNew 
        ShowTodos(); // una vez creado llamo a la funcion renderezar los todos para que los muestre
    })();

    
    // space en memory del HTML 
    const newEssayInput  = document.querySelector( idsList.NewTodoInput);
    const ulTodos        = document.querySelector( idsList.Tasktodo );
    const clearCompleted = document.querySelector( idsList.clearCompleted);
    const selectedBtn    = document.querySelectorAll(idsList.selectedBtn);
    // const removeTodo        = document.querySelector( idsList.deleteTodo);
   
    //! EVENTO ESCUCHA LISTENERS
    newEssayInput.addEventListener('keyup', ( ( event ) => {

        //1. si la tecla presionada es diferente de enter no continues, caso contrario, es decir que sea enter --> continua
        if ( event.key !== "Enter" ) return;
       
        //2. (eliminado los espacios trim()), si el valor del input, su largo es igual a 0 no continues para no crear TODOS vacios
        if ( event.target.value.trim().length === 0) return;

        //3. si pasa las condiciones anteriores entonces llamamos nuestro todostore para agregar un nueva lista de tareas
        todoStore.addTodos( event.target.value );
        // note: event.target.value --> tiene el valor de nuestra caja de texto (input)

        //4. luego renderizamos nuestro TODOS
        ShowTodos(); 

        //5. una vez insertado colocamos vacios el input
        event.target.value = ''; 

    } ));
    
    ulTodos.addEventListener('click', ( evenTodos )=>{
        const elemtFatherId = evenTodos.target.closest('[data-id]'); 
       
        const idTodo        = elemtFatherId.getAttribute('data-id');

        todoStore.toggleTodos( idTodo );
        ShowTodos();

        // note: target.closest('[data-id]') --> busca el primer elemento que tenga el atributo data-id QUE ESTE POR ENCIMA TUYO note:[data-id] es un selector de atributo que significa "cualquier elemento que tenga el atributo data-id".
            
    });

    ulTodos.addEventListener('click', eventBtn =>{
            
        const remove = eventBtn.target.className === 'destroy';

        const elemtFatherId = eventBtn.target.closest('[data-id]');
        const idTodo= elemtFatherId.getAttribute('data-id');
        if (!remove || !idTodo)return;
        
        todoStore.deleteTodo(idTodo);
       
        ShowTodos();
    })

    clearCompleted.addEventListener('click', ()=>{

        todoStore.deleteCompleted()
        ShowTodos()

    });

    selectedBtn.forEach( btnGeneral => {

        btnGeneral.addEventListener('click', ( btnSpecify ) => {
           
            selectedBtn.forEach( itemSelect => {
                itemSelect.classList.remove('selected')// Elimino todos btn seleccionados de la clase selected

                btnSpecify.target.classList.add('selected'); // agrego cuando esten seleccionado

                console.log(btnGeneral.id); // filtro por id
                

                switch (btnGeneral.id) {
                    case 'all':
                        todoStore.setFilter( Filters.All );
                        
                        break;
                    case 'pedding':
                        todoStore.setFilter( Filters.pending );
                        
                        break;

                    case 'completed':
                        todoStore.setFilter( Filters.Completed );
                        
                    break;
                }
                ShowTodos();
                // updatePeding();

            }); 
           
            

        })

    })
    

        
}