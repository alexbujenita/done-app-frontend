


function renderTask(user) {
  user.tasks.forEach(task => {
    const CONTAINER = document.createElement('div')
    CONTAINER.id = `task-${task.id}`
    CONTAINER.className = 'task-card'

    const CONTENT = document.createElement('p')
    CONTENT.id = `task-content-${task.id}`
    CONTENT.className = 'task-content'
    CONTENT.textContent = task.content




    CONTAINER.appendChild(CONTENT)

    ROOT.appendChild(CONTAINER)
  })
}

function init() {
  ServerApi.getUserData(1).then(renderTask)
  createForm()
}



init()
