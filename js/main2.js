const input = document.getElementById("task-input")
const addBtn = document.getElementById("add-task")
const taskList =document.querySelector("#task-list")
const clear = document.getElementById("clear")
// localStorage.clear()
let tasksArray = []

if(localStorage.getItem("tasks")){
    tasksArray = JSON.parse(localStorage.getItem("tasks"))

}


getDataFromLocal()

// Add
addBtn.addEventListener("click",()=>{
    if (input.value !== ""){
        addTasksToArray(input.value)
        input.value = ""
    }
})
function addTasksToArray(taskTxt){
    // taskk Data
    const task = {
        id :Date.now(),
        title : taskTxt
    }

    tasksArray.push(task)
    //  Add tasks To Page From Array
    addElementsToPageFrom(tasksArray)
    // Add tasks To Local Storage
    addToLocale(tasksArray)
}

    
    function addElementsToPageFrom(tasksArray){
        taskList.innerHTML = ""

        tasksArray.forEach(task => {
            let div = document.createElement("div")
            div.setAttribute("dataId", task.id)
            div.className = "task"
            div.innerHTML = `
            <p>${task.title}</p>
            <i class="edit-task ri-edit-2-fill" id="edit-task"></i>
            <i class="delete-task ri-delete-bin-6-fill" id="delete-task"></i>
            `
            taskList.appendChild(div)
        });


    }


function addToLocale(tasksArray){
    window.localStorage.setItem("tasks",JSON.stringify(tasksArray))
    edit()

    }

    function getDataFromLocal(){
        let data = window.localStorage.getItem("tasks")
        if (data){
            let tasks = JSON.parse(data)
            addElementsToPageFrom(tasks)
        }
        
    }

    taskList.addEventListener("click",(e)=>{
        // delete btn
        if(e.target.classList.contains("delete-task")){
            // removeElementFromPage
            deleteTaskFromLocal(e.target.parentElement.getAttribute("dataId"))
            e.target.parentElement.remove()
            // remove from local Storage
        }
    })
// -----------------------remove----------------------
    function deleteTaskFromLocal(id){
        
        tasksArray = tasksArray.filter((task)=> task.id != id)
        addToLocale(tasksArray)
    }

// ------------------------Editing------------------------
function edit(){
    let editBtns = document.querySelectorAll("#edit-task")
    editBtns.forEach((btn)=>{
        let div = btn.parentElement
        btn.addEventListener("click",(btn)=>{
            editTaskName(div)
    })
    })

}
edit()
function editTaskName(div){
    let val = div.firstElementChild.innerHTML
    div.innerHTML = `
    <input type="text" class="edit-Content" value ="${val}" >
    <button class="save-Btn">Save</button>
    `

    // let save
    div.lastElementChild.addEventListener("click",()=>{saveEditInPage(div)})
    
}
function saveEditInPage(div){
    let id = Number(div.getAttribute("dataId"))
    
    let val = div.firstElementChild.value
    

    div.innerHTML = `
            <p>${val}</p>
            <i class="edit-task ri-edit-2-fill" id="edit-task"></i>
            <i class="delete-task ri-delete-bin-6-fill" id="delete-task"></i>
            `
    tasksArray = tasksArray.map((task)=>{
        if (task.id == id){
            task.title = val
            return task
        }else{
            return task
        }
    }
    )
    addToLocale(tasksArray)
}
// ----------------clearAll----------------
clear.addEventListener("click",()=>{
    tasksArray = []
    addToLocale(tasksArray)
    addElementsToPageFrom(tasksArray) 
}) 
