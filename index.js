const taskEntry = document.getElementById("task_entry");
const taskContainer = document.getElementById("task_container");

let arr = [];

// Function to add a task
function addTask() {
  // Throws an error if one tries to add an empty task
    if (taskEntry.value === "") {
        alert("Write something");
    } else {
        arr.push(taskEntry.value);
        updateTaskList();
// Clear input field to allow entry of a new task
        taskEntry.value = ""; 
        saveData();
    }
}


// Click function for handling edit, delete, and check
taskContainer.addEventListener("click", function (e) {
    const li = e.target.closest("li"); // Get the closest li

    // Check the task when the li is clicked
    if (e.target.tagName === "LI") {
        li.classList.toggle("checked");
    }
    // Deletes a task when the delete span is clicked
    else if (e.target.classList.contains("deleteTask")) {
        const index = arr.indexOf(li.innerText.slice(0, -1).trim());
        if (index > -1) {
            arr.splice(index, 1);
            updateTaskList(); 
            saveData();
        }
    }
    // Adding the edit task functionality
    else if (e.target.tagName === "BUTTON") {
        const index = arr.indexOf(li.innerText.slice(0, -1).trim());
        if (index > -1) {
            const newTask = prompt("Edit task:", arr[index]);
            if (newTask) {
                arr[index] = newTask;
                updateTaskList(); 
                saveData();
            }
        }
    }
});

// Storing the content of the taskContainer in localStorage
function saveData() {
    localStorage.setItem("data", JSON.stringify(arr));
}

// Numbering the tasks in the task list
function updateTaskList() {
    taskContainer.innerHTML = "";
    arr.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${item}`;

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "buttonContainer";

        // Edit button
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit"; 
        buttonContainer.appendChild(editButton);

        // Delete task
        let span = document.createElement("span");
        span.innerHTML = onclick="\u00d7"; 
        span.className = "delete";
        buttonContainer.appendChild(span);

        li.appendChild(buttonContainer);
        taskContainer.appendChild(li);
    });
}

// Displaying the tasks even if we refresh the browser by saving to local storage
function displayTask() {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data.length > 0) {
        arr = data;
        updateTaskList();
    } else {
        const message = document.createElement("div");
        message.innerHTML = "Empty";
        taskContainer.appendChild(message);
    }
}

// Calling the displayTask function
displayTask();
