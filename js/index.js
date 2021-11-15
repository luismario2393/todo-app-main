const iconMoon = document.querySelector('#icon-moon');
const iconSun = document.querySelector('#icon-sun');
const header = document.querySelector('#header');
const main = document.querySelector('main');
const inputPrincipal = document.querySelector('#input-principal');
const contenedorMain = document.querySelector('#contenedor-main');
const contenedorMainP = document.querySelector('#contenedor-main-p');
const contenedorMainPP = document.querySelector('#contenedor-main-p p');
const contenedorMainCierre = document.querySelector('#contenedor-main-cierre');
const contenedorMainFiltro = document.querySelector('#contenedor-main-filtro');
const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed = document.querySelector('#completed');
const form = document.querySelector('#form');
const clearCompleted = document.querySelector('#clear-completed');
const containerTodo = document.querySelector('#container-todo');


// arreglo de todos
let todos = [];

document.addEventListener('DOMContentLoaded', () => {
  // local storage
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  mostrarTodos(todos);
  if(todos.length !== 0) {
    contenedorMainP.classList.add('disabled');
  } else {
    contenedorMainP.classList.remove('disabled');
  }

  // modo oscuro
  iconMoon.addEventListener('click', darkMode);
  // modo claro
  iconSun.addEventListener('click', lightMode);

  // filtro todos los pendientes
  all.addEventListener('click', () => {
    all.classList.add('color-blue');
    active.classList.remove('color-blue');
    completed.classList.remove('color-blue');
    todosPendiente();
  });

  // filtro pendientes activos
  active.addEventListener('click', () => {
    active.classList.toggle('color-blue');
    colorBlue();
    activos();
  });

  // filtro pendientes completados
  completed.addEventListener('click', () => {
    completed.classList.toggle('color-blue');
    all.classList.remove('color-blue');
    active.classList.remove('color-blue');
    completados();
  });

  // agregar todo
  form.addEventListener('submit', agregarTodo);

  // marcar como completado
  containerTodo.addEventListener('click', marcarCompletado);

  // eliminar todo
  containerTodo.addEventListener('click', eliminarTodos);

  // eliminar todo completado
  clearCompleted.addEventListener('click', clearCompletedTodos);



});


function todosPendiente() {
  mostrarTodos(todos);
  contadorTodos(todos);
}

function activos() {
  let todosActivos = todos.filter(todo => {
    return todo.completed === false;
  })
  mostrarTodos(todosActivos);
  contadorTodos(todosActivos);
}

function completados() {
  let todosCompletados = todos.filter(todo => {
    return todo.completed === true;
  })
  mostrarTodos(todosCompletados);
  contadorTodos(todosCompletados);
}

function agregarTodo(e) {
  e.preventDefault();
  const todoInput = {
    id: Date.now(),
    text: document.querySelector('#form #todo-input').value,
    completed: false
  }
  // validación y quitar mensaje de no hay
  if(todoInput.text.length === 0) {
    
    Swal.fire({
      icon: 'error',
      title: 'Opps...',
      text: 'Debes agregar una tarea',
    })
  } else {
    todos.push(todoInput);
    contenedorMainP.classList.add('disabled');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agregaste un pendiente Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    
    form.reset();
  }
  
  mostrarTodos(todos);

}

function mostrarTodos(todos){
  const containerTodo = document.querySelector('#container-todo');
  while(containerTodo.firstChild) {
    containerTodo.removeChild(containerTodo.firstChild);
  }
  
  todos.forEach(todo => {
    const { id, text, completed } = todo;
    const todoItem = document.createElement('div');
    todoItem.classList.add('container', 'contenedor-main-todo', 'bg-light');

    if(inputPrincipal.classList.contains('bg-dark')) {
      todoItem.classList.remove('bg-dark');
      todoItem.classList.add('bg-dark');
    } else {
      todoItem.classList.add('bg-light');
    }
    
    
    todoItem.innerHTML= `
    <div class="check" data-id="${id}">
      <img class="icon-check" src="./images/icon-check.svg" alt="icon check">
    </div>
    <p class="texto-check">${text}</p>
    <figure class="icon-x">
      <img class="eliminar" src="./images/icon-cross.svg" data-id="${id}" alt="cierre">
    </figure>
    `;
    containerTodo.appendChild(todoItem);
    if(completed) {
      todoItem.children[0].classList.add('chequeado');
    }
  })
  contadorTodos(todos);

  sincronizarStorage();
  
}

function sincronizarStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function marcarCompletado(e) {
  if(e.target.classList.contains('check')) {
    e.target.classList.toggle('chequeado');
    if(e.target.classList.contains('chequeado')) {
      const id = parseInt(e.target.dataset.id);
      todos = todos.map(todo => {
        if(todo.id === id) {
          todo.completed = true;
        }
        return todo;
      });
    } else {
      const id = parseInt(e.target.dataset.id);
      todos = todos.map(todo => {
        if(todo.id === id) {
          todo.completed = false;
        }
        return todo;
      });
    }
  }
}

function clearCompletedTodos(e) {
  e.preventDefault();
  if(containerTodo.childElementCount !== 0) {
    
      Swal.fire({
        title: '¿Estás seguro que quieres eliminar los pendientes completados?',
        text: "No podras recuperar los pendientes",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          todos = todos.filter(todo => !todo.completed);
          mostrarTodos(todos);
          Swal.fire(
            'Eliminado',
            'El pendiente se ha eliminado correctamente',
            'success'
          )
        }
      })
    }
  
}


function eliminarTodos(e) {
  if(e.target.classList.contains('eliminar')) {
    
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar el pendiente?',
      text: "No podras recuperar el pendiente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = parseInt(e.target.dataset.id);
        todos = todos.filter(todo => todo.id !== id);
        mostrarTodos(todos);
        Swal.fire(
          'Eliminado',
          'El pendiente se ha eliminado correctamente',
          'success'
        )
      }
    })
  }
}


function contadorTodos(todo) {
  const contador = document.querySelector('#contador');
  
   if(todo.length === 0) {
    contador.textContent = 0;
  } else {
    contador.textContent = todo.length;
  }
}


function darkMode() {
  iconMoon.classList.add('disabled');
  iconSun.classList.remove('disabled');
  header.classList.remove('header');
  header.classList.add('header-dark')
  main.classList.remove('background-light-menu');
  main.classList.add('background-dark-menu');
  inputPrincipal.classList.remove('bg-light');
  inputPrincipal.classList.add('bg-dark');
  contenedorMain.classList.remove('bg-light');
  contenedorMain.classList.add('bg-dark');
  contenedorMainP.classList.remove('bg-light');
  contenedorMainP.classList.add('bg-dark');
  contenedorMainPP.style.color = 'white';
  contenedorMainCierre.classList.remove('bg-light');
  contenedorMainCierre.classList.add('bg-dark');
  contenedorMainFiltro.classList.remove('bg-light');
  contenedorMainFiltro.classList.add('bg-dark');
  
  
}
function lightMode() {
  iconMoon.classList.remove('disabled');
  iconSun.classList.add('disabled');
  header.classList.remove('header-dark')
  header.classList.add('header');
  main.classList.remove('background-dark-menu');
  main.classList.add('background-light-menu');
  inputPrincipal.classList.remove('bg-dark');
  inputPrincipal.classList.add('bg-light');
  contenedorMain.classList.remove('bg-dark');
  contenedorMain.classList.add('bg-light');
  contenedorMainP.classList.remove('bg-dark');
  contenedorMainP.classList.add('bg-light');
  contenedorMainPP.style.color = 'black';
  contenedorMainCierre.classList.remove('bg-dark');
  contenedorMainCierre.classList.add('bg-light');
  contenedorMainFiltro.classList.remove('bg-dark');
  contenedorMainFiltro.classList.add('bg-light');

}
function colorBlue() {
  if(active.classList.contains('color-blue')) {
    all.classList.remove('color-blue');
    completed.classList.remove('color-blue');
  }
}

