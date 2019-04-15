const ROOT = document.getElementById('root')

const createForm = () => {
  const FORM_CONTAINER = document.createElement('div')
  FORM_CONTAINER.className = 'form-container'

  const FORM = document.createElement('form')
  FORM.id = 'new-task-form'

  const TASK_DATE_LABEL = document.createElement('label')
  TASK_DATE_LABEL.setAttribute('for', 'End Date')
  TASK_DATE_LABEL.innerText = 'Select the end date for the task:'

  const TASK_DATE = document.createElement('input')
  TASK_DATE.type = 'date'

  const BUTTON = document.createElement('button')
  BUTTON.innerText = 'Create Task'

  FORM.appendChild(TASK_DATE_LABEL)
  FORM.appendChild(TASK_DATE)
  FORM.appendChild(BUTTON)

  FORM_CONTAINER.appendChild(FORM)

  ROOT.appendChild(FORM_CONTAINER)
}