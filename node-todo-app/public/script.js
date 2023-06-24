const todoForm = document.getElementById('todoForm');
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const todoList = document.getElementById('todoList');

function fetchTodos() {
  fetch('/todos')
    .then((response) => response.json())
    .then((todos) => {
      todoList.innerHTML = '';
      todos.forEach((todo) => addTodoToList(todo));
    })
    .catch((error) => console.error('Failed to fetch todos', error));
}

function addTodoToList(todo) {
  const li = document.createElement('li');
  const title = document.createElement('span');
  const description = document.createElement('span');
  const deleteButton = document.createElement('button');

  title.textContent = todo.title;
  description.textContent = todo.description;
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => deleteTodoById(todo._id));

  li.appendChild(title);
  li.appendChild(description);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

function deleteTodoById(todoId) {
  fetch(`/todos/${todoId}`, { method: 'DELETE' })
    .then(() => fetchTodos())
    .catch((error) => console.error('Failed to delete todo', error));
}

function createTodo() {
  const todo = {
    title: titleInput.value,
    description: descriptionInput.value,
    completed: false,
  };

  fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then(() => {
      titleInput.value = '';
      descriptionInput.value = '';
      fetchTodos();
    })
    .catch((error) => console.error('Failed to create todo', error));
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createTodo();
});

fetchTodos();
