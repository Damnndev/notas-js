import { Todo } from '../classes';
import { todoList } from '../index.js';

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );// Para no insertar el div si no el primer hijo


    return div.firstElementChild; // Para no insertar el div si no el primer hijo
}

// Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

    }
});

// Al pulsar sobre la x o el check de las tareas
divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName; // va a ser Input, label o boton
    const todoElemento   = event.target.parentElement.parentElement; // esta son referencias a todo el li que queremos borrar
    const todoId         = todoElemento.getAttribute('data-id'); // obtenemos el id del elemento a borrar


    if( nombreElemento.includes('input')) { // click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // si está completed lo elimina si no lo añade
    } else if ( nombreElemento.includes('button')) {

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    // sacamos el array en orden inverso para poder borrar por el final y que no se altere el index del array
    for( let i = divTodoList.children.length-1; i >= 0; i-- ) { // restamos 1 pq empiezan en cero los array
        const elemento = divTodoList.children[i];
        // como saber que elemento está completado
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});