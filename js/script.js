const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');
let tasksArray = []
const clearBtn = document.getElementById("clear")

clearBtn.addEventListener("click", () => {
    clear()
})
function clear() {
    tasksArray = []
    addDataToLocalStorage(tasksArray)
    GetDataLocalStorageFrom()

}

// localStorage.clear()
if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"))

}


GetDataLocalStorageFrom()
addBtn.addEventListener("click", () => {

    let val = taskInput.value
    if (val !== "") {
        addTasksToArray(taskInput.value)
        taskInput.value = ""

    } else {
        return;
    }

    edit()
})


function addTasksToArray(text) {
    const task = {
        id: Date.now(),
        title: text,
        completed: false,
    }
    tasksArray.push(task)

    addDataToLocalStorage(tasksArray)

    addElementsToPageFrom(tasksArray)
}
function addElementsToPageFrom(tasksArray) {
    taskList.innerHTML = ""
    if (localStorage.tasks) {
        tasksArray.forEach((task) => {
            let div = document.createElement("div")
            div.classList = "task"
            div.setAttribute("dataId", task.id)
            let p = document.createElement("p");
            p.innerHTML = `${task.title}`;
            let iconEdit = document.createElement("button")
            iconEdit.id = "edit-task"
            iconEdit.innerHTML = `<i class="ri-edit-2-fill"></i>`
            let iconDele = document.createElement("button")
            iconDele.id = "delete-task"
            iconDele.classList = "delete-task"
            iconDele.innerHTML = `<i class="ri-delete-bin-6-fill"></i>`
            div.appendChild(p)
            div.appendChild(iconEdit)
            div.appendChild(iconDele)
            taskList.appendChild(div)

        });

    }

}



function addDataToLocalStorage(tasksArray) {

    window.localStorage.setItem("tasks", JSON.stringify(tasksArray))

}
function GetDataLocalStorageFrom() {
    let data = window.localStorage.getItem("tasks")

    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPageFrom(tasks)
    }
}
// Remove data 
taskList.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete-task")){
        // removeElementFromPage
        deleteTaskFromLocal(e.target.parentElement.getAttribute("dataId"))
        e.target.parentElement.remove()
        // remove from local Storage
    }
})

function deleteTaskFromLocal(id){
    console.log(tasksArray)
    
    tasksArray = tasksArray.filter((task)=> task.id != id)
    addDataToLocalStorage(tasksArray)
}



function editTaskName(div) {
    let valp = div.firstElementChild.innerHTML
    div.innerHTML = `
    <input type="text" class="edit-Content" value = "${valp}" >
    <button class="save-Btn">Save</button>
    `
    let saveBtn = document.querySelector(".save-Btn")
    saveBtn.addEventListener("click", () => { saveEditing(div) })

}
function saveEditing(div) {
    let valp = document.querySelector(".edit-Content")
    // console.log(valp)
    div.innerHTML = `
    <p id="task-content">${valp.value}</p>
    <button id="edit-task">
    <i class="ri-edit-2-fill"></i>
    </button>
    <button id="delete-task">
    <i class="ri-delete-bin-6-fill"></i>
    </button>
    `
    let taskId = Number(div.getAttribute("data-id"))
    let arr3 = []
    for (let i = 0; i < tasksArray.length; i++) {
        if (taskId == tasksArray[i].id) {
            tasksArray[i].title = valp.value
            arr3.push(tasksArray[i])
        } else {

            arr3.push(tasksArray[i])
        }
    }
    console.log(tasksArray)
    console.log(arr3)
    // tasksArray = arr3
    edit()

    addDataToLocalStorage(arr3)
}

function edit() {
    let editBtn = document.querySelectorAll("#edit-task")
    editBtn.forEach((e) => {
        e.addEventListener("click", () => {

            let div = e.parentElement
            editTaskName(div)

        })
    })


}
edit()

