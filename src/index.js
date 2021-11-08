import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

// const tarea = new Todo('Aprender JS');
// todoList.nuevoTodo( tarea );


// console.log(todoList);

// crearTodoHtml( tarea );

todoList.todos.forEach(todo => crearTodoHtml(todo));

console.log( 'todos', todoList.todos);
// Local storage

// localStorage.setItem('mi-key', 'abc123');
// sessionStorage.setItem('mi-key', 'abc123');

// setTimeout( () => {

//   localStorage.removeItem('mi-key');
//   sessionStorage.removeItem('mi-key');
// }, 1500);

