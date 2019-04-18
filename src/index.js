const PEW = new Audio('./src/audio/pew.mp3')
const COUGH = new Audio('./src/audio/cough.mp3')
const SHUSH = new Audio('./src/audio/shush.mp3')
const EXPL = new Audio('./src/audio/expl.mp3')
const DIXIE = new Audio('./src/audio/dixie.mp3')

let show = true

// append created task ----------------------------------------------------------------------------------------
const appendCreatedTask = task => {
  const SELECTED_VALUE = document.getElementById('user-selector')
  const userOption = SELECTED_VALUE.options[SELECTED_VALUE.selectedIndex].innerText
  const CONTAINER = document.createElement("div");
    CONTAINER.id = `task-${task.id}`;
    CONTAINER.className = "card-container";
    CONTAINER.style.backgroundColor = task.priority.toLowerCase();


    const CONTENT = document.createElement("h2");
    CONTENT.id = `task-content-${task.id}`;
    CONTENT.className = "task-content";
    CONTENT.textContent = task.content;

    // ----------------------- CHECKBOX ------------------------ \\
    const COMPLETED_DIV = document.createElement('div')
    COMPLETED_DIV.id = 'completed-check'

    const COMPLETED = document.createElement('input')
    COMPLETED.id = `check-${task.id}`
    COMPLETED.type = 'checkbox'
    COMPLETED.checked = task.completed ? true : false
    COMPLETED.addEventListener('click', _ => {      
      updateCompletion(task).then(t => {
        CONTAINER.style.opacity = t.task.completed ? 0.65 : null  // OPACITY on completion on click
      })
    })

    const COMPLETED_TEXT = document.createElement('p')
    COMPLETED_TEXT.innerText = 'Completed?'
    COMPLETED_TEXT.style.display = 'inline'

    COMPLETED_TEXT.appendChild(COMPLETED)
    COMPLETED_DIV.appendChild(COMPLETED_TEXT)

    // ------------------------------------------------------------- \\
    
    
    // -------------------------- DELETE -------------------------- \\
    const DELETE_BTN = document.createElement('button')
    DELETE_BTN.type = 'button'
    DELETE_BTN.className = 'delete-btn'
    DELETE_BTN.innerText = 'Erase task'
    DELETE_BTN.addEventListener('click', () => {
      if(confirm('WARNING\n\nThis will irreversibly delete the task!\nAre you sure?')) {
        deleteTask(task.id).then(()=>{
          CONTAINER.remove()
          EXPL.play() // SOUND
        })
      } else {
        COUGH.play() // SOUND
      }
    })

    COMPLETED_DIV.appendChild(DELETE_BTN)   
    // ------------------------------------------------------------- \\

    const USER = document.createElement("p");
    USER.textContent = `Assigned to ${userOption}`

    const DUE_DATE = document.createElement('p')
    DUE_DATE.textContent = `Due by: ${task.end_date.split('T')[0]}`

    CONTAINER.appendChild(CONTENT);
    CONTAINER.appendChild(USER)
    CONTAINER.appendChild(DUE_DATE)
    CONTAINER.appendChild(COMPLETED_DIV)

    ROOT.appendChild(CONTAINER);

}

// -------------------------------END append created task END----------------------------------------------------

function renderTask(user) {
  user.tasks.sort((task1, task2) => task1.id-task2.id)
  user.tasks.forEach(task => {
    // HYBRID ------------------------------------------------------
    // const CONTAINER = document.createElement("div");
    // CONTAINER.id = `task-${task.id}`;
    // CONTAINER.className = "card-container";
    // const { id, name, content, end_date, priority } = task
    // const cardHtml = `
    //   <p id="task-content">${content}</p>
    //   <p>Assigned to: ${user.name}</p>
    //   <p> Due by: ${end_date.split('T')[0]}</p>
    // `
    // CONTAINER.innerHTML = cardHtml

    // ------------------------------------------------------------- \\
    const CONTAINER = document.createElement("div");
    CONTAINER.id = `task-${task.id}`;
    CONTAINER.className = "card-container";
    CONTAINER.style.backgroundColor = task.priority.toLowerCase();
    CONTAINER.style.opacity = task.completed ? 0.65 : null // OPACITY on completion


    const CONTENT = document.createElement("h2");
    CONTENT.id = `task-content-${task.id}`;
    CONTENT.className = "task-content";
    CONTENT.textContent = task.content;

    // ----------------------- CHECKBOX ------------------------ \\
    const COMPLETED_DIV = document.createElement('div')
    COMPLETED_DIV.id = 'completed-check'

    const COMPLETED = document.createElement('input')
    COMPLETED.id = `check-${task.id}`
    COMPLETED.type = 'checkbox'
    COMPLETED.checked = task.completed ? true : false
    COMPLETED.addEventListener('click', _ => {      
      updateCompletion(task).then(t => {
        CONTAINER.style.opacity = t.task.completed ? 0.65 : null  // OPACITY on completion on click
      })
    })

    const COMPLETED_TEXT = document.createElement('p')
    COMPLETED_TEXT.innerText = 'Completed?'
    COMPLETED_TEXT.style.display = 'inline'

    COMPLETED_TEXT.appendChild(COMPLETED)
    COMPLETED_DIV.appendChild(COMPLETED_TEXT)

    // ------------------------------------------------------------- \\
    
    
    // -------------------------- DELETE -------------------------- \\
    const DELETE_BTN = document.createElement('button')
    DELETE_BTN.type = 'button'
    DELETE_BTN.className = 'delete-btn'
    DELETE_BTN.innerText = 'Erase task'
    DELETE_BTN.addEventListener('click', () => {
      if(confirm('WARNING\n\nThis will irreversibly delete the task!\nAre you sure?')) {
        deleteTask(task.id).then(()=>{
          CONTAINER.remove()
          EXPL.play() // SOUND
        })
      } else {
        COUGH.play() // SOUND        
      }
    })

    COMPLETED_DIV.appendChild(DELETE_BTN)
    // ------------------------------------------------------------- \\

    const USER = document.createElement("p");
    USER.textContent = `Assigned to ${user.name}`

    const DUE_DATE = document.createElement('p')
    DUE_DATE.textContent = `Due by: ${task.end_date.split('T')[0]}`

    CONTAINER.appendChild(CONTENT);
    CONTAINER.appendChild(USER)
    CONTAINER.appendChild(DUE_DATE)
    CONTAINER.appendChild(COMPLETED_DIV)

    ROOT.appendChild(CONTAINER);
  });
}

const passUser = users => users.forEach(renderTask);

function init() {
  getUsers().then(passUser);
  createForm();
}

init();


function showHideCompleted() {
  const CARDS_ARRAY = Array.from(document.getElementsByClassName("card-container"))
  for(let i = 0; i < CARDS_ARRAY.length; i++) {
    if (show) {
      CARDS_ARRAY[i].querySelector('input').checked ? CARDS_ARRAY[i].style.display = 'none' : CARDS_ARRAY[i].style.display = ''
    } else {
      CARDS_ARRAY[i].querySelector('input').checked ? CARDS_ARRAY[i].style.display = '' : CARDS_ARRAY[i].style.display = ''
    }
  }
  show = !show
}