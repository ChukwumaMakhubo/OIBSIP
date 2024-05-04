"use strict";

const tasksArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; //I created an array to store my pending tasks
const compTaskArray = localStorage.getItem("comptasks") ? JSON.parse(localStorage.getItem("comptasks")) : []; //I created an array to store my pending tasks

// Here I get my input field and the add button by their IDs
var input = document.getElementById("input"); 
var button = document.getElementById("add");


function showDate() { //This function is for displaying the cuurent date by (Month,Day and Year)
    var currentDate = new Date();
    currentDate = currentDate.toDateString().split(" ");
    var date = document.getElementById("Toptime");
    date.innerHTML = currentDate[1] + " " + currentDate[2] + " " + currentDate[3];
}

input.addEventListener("click", function() { // When you click on the input field it increases the width
    this.style.width = "60%";
});

button.addEventListener("click", function() { // When you click on the add button field it decreases the width back to normal size
    input.style.width = "25%";
});

button.addEventListener("click", function() { // This function checks if the input field is empty and if it is then you will be alerted to enter a task 
    if (input.value.trim() === "") {
        alert('Please Enter a Task');
        return; 
    }

    // Then if theres something in the input field it will take the text and store it in the tasksArray
    tasksArray.push(input.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    printTasks(); // Here i called the function to print pending tasks
    input.value = "";
});

function printTasks() { // This function prints pending tasks by getting them from the tasksArray then creating a new div that has the delete, update and edit icon
    let tasks = "";
    for (let i = 0; i < tasksArray.length; i++) {
        tasks += `
        <div class="taskContainer">
            <textarea disabled class="completeCont">${tasksArray[i]}</textarea>
            <a class="edit" href="#">
                <img class="toDoIcon" src="checklist-icon.jpg" alt="toDoList">
            </a>
            <a class="done" href="#">
                <img class="toDoIcon" src="addTick.png" alt="toDoList">
            </a> 
            <a class="delete" href="#">
                <img class="toDoIcon" src="delIcon.jpeg" alt="toDoList">
            </a> 
            <br><br>
        </div>`;
    }
    
    document.getElementById("tasksDiv").innerHTML = tasks;
    deleteTasks();
    editTasks();
    completeTasks();
}

function completeTasks() {
    const doneIcons = document.querySelectorAll(".done");

    doneIcons.forEach((doneIcon, i) => {
        doneIcon.addEventListener("click", function() {
            const index = i;
            const taskToComplete = tasksArray.splice(index, 1)[0];
            compTaskArray.push(taskToComplete);

            localStorage.setItem("tasks", JSON.stringify(tasksArray));
            localStorage.setItem("comptasks", JSON.stringify(compTaskArray));

            printTasks();
            printDoneTasks();
        });
    });
}

function printDoneTasks() { // This function prints complete tasks by getting them from the compTaskArray then creating a new div that has the delete icon
    let complete = "";
    const currentDate = new Date().toLocaleString();
    for (let i = 0; i < compTaskArray.length; i++) {
        complete += `
        <div class="taskContainer">
            <textarea disabled class="completeCont">${compTaskArray[i]} (${currentDate})</textarea>
            <a class="delete" href="#">
                <img class="toDoIcon" src="delIcon.jpeg" alt="toDoList">
            </a> 
        </div>
        <br><br>`;
    }
    document.getElementById("completeTasksDiv").innerHTML = complete;
    deleteCompleteTasks();
}

function deleteTasks() {
    const deleteIcons = document.querySelectorAll(".delete");
    deleteIcons.forEach((deleteIcon, i) => {
        deleteIcon.addEventListener("click", function() {
            tasksArray.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(tasksArray));
            printTasks();
        });
    })
}

function editTasks() {
    const editIcons = document.querySelectorAll(".edit");
    const inputAreas = document.querySelectorAll(".taskContainer textarea");
    editIcons.forEach((editIcon, i) => {
        editIcon.addEventListener("click", function() {
            inputAreas[i].disabled = !inputAreas[i].disabled;
        });
    });
}

function deleteCompleteTasks() {
    const deleteIcons = document.querySelectorAll("#completeTasksDiv .delete");
    deleteIcons.forEach((deleteIcon, i) => {
        deleteIcon.addEventListener("click", function() {
            compTaskArray.splice(i, 1);
            localStorage.setItem("comptasks", JSON.stringify(compTaskArray));
            printDoneTasks();
        });
    });
}

window.onload = function() {
    showDate();
    printTasks();
    printDoneTasks();
};