const ROOT = document.getElementById('root')
let clicked = false



const createForm = () => {

  const FORM_CONTAINER = document.createElement('div')
  FORM_CONTAINER.className = 'hidden-form'
  FORM_CONTAINER.id = 'form-container'

  const FORM = document.createElement('form')
  FORM.id = 'new-task-form'
  FORM.addEventListener('submit', e => {
    e.preventDefault()
    const newTask = {
      user_id: 1,
      content: e.target.content.value,
      end_date: e.target.date.value
    }
    console.log(newTask);

    FORM.reset();
    FORM_CONTAINER.className = 'hidden-form'
    clicked = !clicked
    
  })

  const TASK_CONTENT_LABEL = document.createElement('label')
  TASK_CONTENT_LABEL.setAttribute('for', 'content')
  TASK_CONTENT_LABEL.innerText = 'Please describe the task:'
  const TASK_CONTENT = document.createElement('textarea')
  TASK_CONTENT.rows = 5
  TASK_CONTENT.minLength = 1
  TASK_CONTENT.name = 'content'
  TASK_CONTENT.placeholder = 'Type your task in here...'

  const TASK_DATE_LABEL = document.createElement('label')
  TASK_DATE_LABEL.setAttribute('for', 'End Date')
  TASK_DATE_LABEL.innerText = 'Select the end date for the task:'

  const TASK_DATE = document.createElement('input')
  TASK_DATE.type = 'date'
  TASK_DATE.name = 'date'

  const ASSIGN_USER = document.createElement('select')
  ASSIGN_USER.id = 'user-selector'
  ServerApi.getUsers().then(users => {
    users.forEach(user => {
      const OPTION = document.createElement('option')
      OPTION.value = user.id
      OPTION.innerText = user.name
      ASSIGN_USER.appendChild(OPTION)
    })
  });

  const BUTTON = document.createElement('button')
  BUTTON.innerText = 'Create Task'

  FORM.appendChild(TASK_CONTENT_LABEL)
  FORM.appendChild(TASK_CONTENT)
  FORM.appendChild(TASK_DATE_LABEL)
  FORM.appendChild(TASK_DATE)
  FORM.appendChild(ASSIGN_USER)
  FORM.appendChild(BUTTON)

  FORM_CONTAINER.appendChild(FORM)

  ROOT.appendChild(FORM_CONTAINER)
}

const showHideForm = () => {
  const FORM = document.getElementById('form-container')

  if (clicked) {
    FORM.className = 'hidden-form'
  } else {
    FORM.className = 'show-form'
  }

  clicked = !clicked

}