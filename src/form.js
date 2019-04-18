const ROOT = document.getElementById("root");
const FORM_DIV = document.getElementById("form-div");
let clicked = false;

const createForm = () => {
  const FORM_CONTAINER = document.createElement("div");
  FORM_CONTAINER.className = "hidden-form";
  FORM_CONTAINER.id = "form-container";

  const FORM = document.createElement("form");
  FORM.id = "new-task-form";
  FORM.addEventListener("submit", e => {
    e.preventDefault();
    const selected = document.getElementById("user-selector");
    const radios = document.getElementsByName("priority");

    const newTask = {
      user_id: selected.value,
      content: e.target.content.value,
      end_date: e.target.date.value,
      completed: false,
      priority: getRadioValue(radios)
    };
    createTask(newTask).then(task => {
      appendCreatedTask(task)
      DIXIE.play() // SOUND
      FORM.reset();
      FORM_CONTAINER.className = "hidden-form";
      clicked = !clicked;
    });

  });

  const TASK_CONTENT_LABEL = document.createElement("label");
  TASK_CONTENT_LABEL.setAttribute("for", "content");
  TASK_CONTENT_LABEL.innerText = "Please describe the task:";
  const TASK_CONTENT = document.createElement("textarea");
  TASK_CONTENT.rows = 2;
  TASK_CONTENT.required = true;
  TASK_CONTENT.minLength = 2;
  TASK_CONTENT.name = "content";
  TASK_CONTENT.placeholder = "Type your task in here...";

  const TASK_DATE_LABEL = document.createElement("label");
  TASK_DATE_LABEL.setAttribute("for", "End Date");
  TASK_DATE_LABEL.innerText = "Select the end date for the task:";

  const TASK_DATE = document.createElement("input");
  TASK_DATE.type = "date";
  TASK_DATE.name = "date";
  TASK_DATE.min = new Date().toISOString().split("T")[0];

  const ASSIGN_USER = document.createElement("select");
  ASSIGN_USER.id = "user-selector";
  const OPTION_PLACEHOLDER = document.createElement("option");
  OPTION_PLACEHOLDER.disabled = true;
  OPTION_PLACEHOLDER.innerText = "Select a user";
  ASSIGN_USER.appendChild(OPTION_PLACEHOLDER);
  getUsers().then(users => {
    users.forEach(user => {
      const OPTION = document.createElement("option");
      OPTION.value = user.id;
      OPTION.innerText = user.name;
      ASSIGN_USER.appendChild(OPTION);
    });
  });

  const PRIORITY_TEXT = document.createElement("p");
  PRIORITY_TEXT.innerText = "What should the task priority be?";
  const LOW_PRIORITY = document.createElement("input");
  const MED_PRIORITY = document.createElement("input");
  const HI_PRIORITY = document.createElement("input");
  const LOW_LABEL = document.createElement("label");
  const MED_LABEL = document.createElement("label");
  const HI_LABEL = document.createElement("label");

  LOW_PRIORITY.type = "radio";
  MED_PRIORITY.type = "radio";
  HI_PRIORITY.type = "radio";
  LOW_PRIORITY.name = "priority";
  MED_PRIORITY.name = "priority";
  HI_PRIORITY.name = "priority";
  LOW_PRIORITY.value = "GREEN";
  MED_PRIORITY.value = "ORANGE";
  HI_PRIORITY.value = "RED";
  LOW_PRIORITY.checked = true;

  LOW_LABEL.innerText = "LOW";
  MED_LABEL.innerText = "MEDIUM";
  HI_LABEL.innerText = "HIGH";

  LOW_LABEL.appendChild(LOW_PRIORITY);
  MED_LABEL.appendChild(MED_PRIORITY);
  HI_LABEL.appendChild(HI_PRIORITY);

  const BUTTON = document.createElement("button");
  BUTTON.innerText = "Create Task";
  BUTTON.className = "submit-button";

  FORM.appendChild(TASK_CONTENT_LABEL);
  FORM.appendChild(TASK_CONTENT);
  FORM.appendChild(TASK_DATE_LABEL);
  FORM.appendChild(TASK_DATE);
  FORM.appendChild(ASSIGN_USER);
  FORM.appendChild(PRIORITY_TEXT);
  FORM.appendChild(LOW_LABEL);
  FORM.appendChild(MED_LABEL);
  FORM.appendChild(HI_LABEL);
  FORM.appendChild(BUTTON);

  FORM_CONTAINER.appendChild(FORM);

  // ROOT.appendChild(FORM_CONTAINER);
  FORM_DIV.appendChild(FORM_CONTAINER);
};

const showHideForm = () => {
  const FORM = document.getElementById("form-container");

  if (clicked) {
    FORM.className = "hidden-form";
    SHUSH.play(); // SOUND
  } else {
    FORM.className = "show-form";
    PEW.play(); // SOUND
  }

  clicked = !clicked;
};

const getRadioValue = radios => {
  let value = null;
  radios.forEach(radio => {
    if (radio.checked) {
      value = radio.value;
    }
  });
  return value;
};
