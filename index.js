const taskEntry = document.getElementById("task_entry");
const taskContainer = document.getElementById("task_container");

const arr = [];

function addTask() {
  if (taskEntry.value === "") {
    alert("Write something");
    // outputs an alert if input field is submitted empty
  } else {
    // creates a html element with the tag li
    // let li = document.createElement("li");
    arr.push(taskEntry.value);
    updatetTaskList();

    // clearing the input field to allow new task entry
    taskEntry.value = "";

    // Saves data after adding
    saveData();
  }
}
addTask();

// click function
taskContainer.addEventListener("click", function (e) {
    // checks a task when clicked on(showing its done)
    if (e.target.tagName == "LI") {
      e.target.classlist.toggle("checked");
    }
    // deletes a parentElement when one clicks on the span(x)
    else if (e.target.tagName === "SPAN") {
      const li = e.target.parentElement;
      // getting array index
      const index = arr.indexOf(li.innerText.slice(0, -1).trim());
      if (index > -1) {
        arr.splice(index, 1);
      }

      // removes the task item in the list
      updatetTaskList();
      saveData();
    }
  },
  false);

// storing the content of the taskContainer in the localStorage
function saveData() {
  // console.log(arr);
  localStorage.setItem("data", JSON.stringify(arr));
}
// numbering the tasks in the task list
function updatetTaskList(){
  taskContainer.innerHTML = "";
  arr.forEach((item, index) => {
    let li = document.createElement("li");
    // numbering the tasks upon entry
    li.innerHTML = `${index + 1}. ${item}`;
    // deletes a task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "delete";
    li.appendChild(span);
    taskContainer.appendChild(li);
  });
}

// displaying the tasks even if we refresh the browser
function displayTask() {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data && data.length > 0){
    arr = data;
    updatetTaskList();
  } else {
    const message = document.createElement("message");
    message.innerHTML = "Empty";
    taskContainer.appendChild(message);
  }
  arr.push(data);
}
// calling the displayTask function
displayTask();
