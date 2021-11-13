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

let todos = [];

document.addEventListener('DOMContentLoaded', () => {
  iconMoon.addEventListener('click', darkMode);
  iconSun.addEventListener('click', lightMode);
  all.addEventListener('click', () => {
    all.classList.add('color-blue');
    active.classList.remove('color-blue');
    completed.classList.remove('color-blue');
  });
  active.addEventListener('click', () => {
    active.classList.toggle('color-blue');
    colorBlue();
  });
  completed.addEventListener('click', () => {
    completed.classList.toggle('color-blue');
    all.classList.remove('color-blue');
    active.classList.remove('color-blue');  
  });

  form.addEventListener('submit', agregarTodo);
 
});

function agregarTodo(e) {
  e.preventDefault();
  const todoInput = {
    id: Date.now(),
    text: document.querySelector('#form #todo-input').value,
  }
  if(todoInput.text === '') {
    alert('Ingresa una tarea');
  } else {
    todos.push(todoInput);
    contenedorMainP.classList.add('disabled');
    form.reset();
  }

  console.log(todos);
  mostrarTodos(todos);
}
function mostrarTodos(todos) {
  const containerTodo = document.querySelector('#container-todo');
  while(containerTodo.firstChild) {
    containerTodo.removeChild(containerTodo.firstChild);
  }

  todos.forEach(todo => {
    const { id, text } = todo;
    const todoItem = document.createElement('div');
    todoItem.classList.add('container', 'contenedor-main-todo', 'bg-light');
    todoItem.innerHTML= `
        <div>
          <img class="icon-check" src="./images/icon-check.svg" alt="icon check">
        </div>
        <p>${text}</p>
        <figure class="icon-x">
          <img src="./images/icon-cross.svg"  alt="cierre">
        </figure>
    `;
    containerTodo.appendChild(todoItem);
  })
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

