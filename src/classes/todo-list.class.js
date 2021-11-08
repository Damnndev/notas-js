// Agrupará toda la lista de To do
import { Todo } from './todo.class';


export class TodoList {

  constructor() {

    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevoTodo( todo ) {
    this.todos.push( todo );
    this.guardarLocalStorage();
  }

  eliminarTodo( id ) {

    this.todos = this.todos.filter( todo => todo.id != id) // nuevo array con todos los elementos que cumplan la condición implementada por la función en este caso el todo que coincidan con ese id. Usamo ! = y no ! == por q recibimos string y lo comparamos a numero
    this.guardarLocalStorage();
  }

  marcarCompletado( id ) {

    for( const todo of this.todos ) { // for of pq iteramos coleccion

      // console.log(id, todo.id);

      if( todo.id == id ) { // hacemos == pq recibimos un String e igualamos a un numero
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;
      }
    }
  }

  eliminarCompletados() {

    this.todos = this.todos.filter( todo => !todo.completado )
    this.guardarLocalStorage();
  }

  guardarLocalStorage(){

    localStorage.setItem('todo', JSON.stringify(this.todos));// convertimos a string el array
  }

  cargarLocalStorage(){

    // if( localStorage.getItem('todo')) {

    //   this.todos = JSON.parse( localStorage.getItem('todo') );// convertimos de nuevo a array para cargarlo

    // }else {
    //   this.todos = [];
    // }
    this.todos = ( localStorage.getItem('todo') )
                    ? this.todos = JSON.parse( localStorage.getItem('todo') )
                    : [];

    this.todos = this.todos.map( obj => Todo.fromJson( obj ) ); // para transformar los obj en elementos del array a los que acceder con index
  }

}