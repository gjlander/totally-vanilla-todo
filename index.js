//global variables
const newTaskForm = document.querySelector("#new-task-form");
const newTitleInput = document.querySelector("#new-title");
const taskList = document.querySelector("#task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//function to update UI
const renderTasks = () => {
    if (taskList.hasChildNodes()) {
        taskList.innerHTML = "";
    }
    tasks.forEach((task, i) => {
        //make li
        const taskLi = document.createElement("li");
        taskLi.setAttribute("id", task.id);

        //make wrapper for text and buttons
        const taskWrapper = document.createElement("div");

        //make p element for the task title
        const taskTitle = document.createElement("p");
        taskTitle.innerText = task.title;

        //make edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", (e) => {
            // console.log(e.target.parentElement.nextElementSibling);
            e.target.parentElement.nextElementSibling.classList.remove(
                "hidden"
            );
        });

        //make delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            //make new array without task to be deleted
            const updatedTasks = tasks.filter((item) => item.id !== task.id);
            console.log(updatedTasks);

            //update local variable
            tasks = updatedTasks;

            //update localstorage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            //update UI
            console.log(e.target);
            e.target.parentElement.parentElement.remove();
        });

        //append to wrapper
        taskWrapper.appendChild(taskTitle);
        taskWrapper.appendChild(editBtn);
        taskWrapper.appendChild(deleteBtn);

        //make editing wrapper
        const editWrapper = document.createElement("div");
        editWrapper.classList.add("hidden");

        //make input for editing
        const editInput = document.createElement("input");
        editInput.value = task.title;

        const confirmBtn = document.createElement("button");
        confirmBtn.innerText = "Confirm";
        confirmBtn.addEventListener("click", (e) => {
            task.title = editInput.value;
            taskTitle.innerText = task.title;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            e.target.parentElement.classList.add("hidden");
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.addEventListener("click", (e) => {
            editInput.value = task.title;
            e.target.parentElement.classList.add("hidden");
        });

        //append to edit wrapper
        editWrapper.appendChild(editInput);
        editWrapper.appendChild(confirmBtn);
        editWrapper.appendChild(cancelBtn);

        //append inner content of li
        taskLi.appendChild(taskWrapper);
        taskLi.appendChild(editWrapper);

        //append whole li
        taskList.appendChild(taskLi);
    });
};
//event handlers
const addTask = (e) => {
    //prevent page reload
    e.preventDefault();
    console.log(tasks);

    const newTask = {
        id: crypto.randomUUID(),
        title: newTitleInput.value,
        done: false,
    };
    //add newTask to array
    tasks.push(newTask);

    //update localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    //reset input value
    newTitleInput.value = "";

    //rerender tasklist
    renderTasks();
};

// const editBtnClick = (taskLi, taskTitle, id) => {
//     console.log(id);
//     tasks.forEach((task) => {
//         console.log(task.title, task.id);
//         if (task.id === id) {
//             const editInput = document.createElement("input");
//             editInput.value = task.title;

//             const confirmBtn = document.createElement("button");
//             confirmBtn.innerText = "Confirm";
//             confirmBtn.addEventListener("click", () => {
//                 task.title = editInput.value;
//                 taskTitle.innerText = task.title;
//                 localStorage.setItem("tasks", JSON.stringify(tasks));
//             });

//             const cancelBtn = document.createElement("button");
//             cancelBtn.innerText = "Cancel";

//             taskLi.appendChild(editInput);
//             taskLi.appendChild(confirmBtn);
//             taskLi.appendChild(cancelBtn);
//         }
//     });
// };

//events
newTaskForm.addEventListener("submit", addTask);

//call on page load
renderTasks();
