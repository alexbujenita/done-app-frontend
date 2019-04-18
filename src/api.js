const USERS_URL = "http://localhost:3000/users";
const TASKS_URL = "http://localhost:3000/tasks";

const getUsers = _ => fetch(USERS_URL).then(resp => resp.json());

const createTask = task => {
  return fetch(TASKS_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).then(resp => resp.json());
};

const updateCompletion = task => {
  return fetch(TASKS_URL + "/complete/" + task.id, {
    method: "PATCH"
  }).then(resp => resp.json());
};

const deleteTask = id => {
  return fetch(TASKS_URL + "/" + id, {
    method: "DELETE"
  }).then(resp => resp.json());
};
