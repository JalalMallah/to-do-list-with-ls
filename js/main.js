const input = document.querySelector('input.new-task-input');
const addTaskBtn = document.querySelector('button.add-task');
const allTasksDiv = document.querySelector('.all-tasks');
const arrow = document.querySelector('.arrow i');

// Random ID Generator
function idGenerator() {
  const str = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
  let randomID = '';
  for (let i = 0; i < 5; i++) {
    randomID += str[Math.floor(Math.random() * str.length)];
  }
  return randomID;
}

// Add New Task Function
function addNewTask() {
  if (input.value) {
    const randomID = idGenerator();

    const html = `
        <p class="task">
          <input type="checkbox" id="${randomID}" />
          <label for="${randomID}">${input.value}</label>
        </p>
        <div class="icon" title="Remove Task"><i class="delete far fa-trash-alt"></i></div>
  `;

    const newTask = document.createElement('div');
    newTask.classList.add('task-item');
    newTask.innerHTML = html;
    document.querySelector('.all-tasks').appendChild(newTask);

    storeInLS(input.value);
    input.value = '';
  }
}

addTaskBtn.addEventListener('click', addNewTask);

// Remove Task
allTasksDiv.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    removeTaskFromLS(
      e.target.parentElement.previousElementSibling.lastElementChild
    );
  }
});

function removeTaskFromLS(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}

// Hide Tasks
arrow.addEventListener('click', () => {
  arrow.classList.toggle('hide');
  document.querySelector('.all-tasks').classList.toggle('hide');
});

// Store in LS

function storeInLS(task) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks From LS

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const randomID = idGenerator();

    const html = `
        <p class="task">
          <input type="checkbox" id="${randomID}" />
          <label for="${randomID}">${task}</label>
        </p>
        <div class="icon" title="Remove Task"><i class="delete far fa-trash-alt"></i></div>
  `;

    const newTask = document.createElement('div');
    newTask.classList.add('task-item');
    newTask.innerHTML = html;
    document.querySelector('.all-tasks').appendChild(newTask);
  });
}

window.addEventListener('DOMContentLoaded', getTasks);
