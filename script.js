function loadTodos(){
    // This function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
    
}

function addTodoToLocalStorage(todo){
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function executeFilterAction(event){
    const element = event.target;
    const value = element.getAttribute("data-filter");
    console.log(value);
    todoList.innerHTML = '';
    const todos = loadTodos();
    if(value == "all"){
        console.log(todoList);
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);      
        })
    }else if(value == "pending"){
        todos.todoList.forEach(todo => {
            if(todo.isCompleted != true)
                appendTodoInHtml(todo);      
        })
    }else{
        todos.todoList.forEach(todo => {
            if(todo.isCompleted == true)
                appendTodoInHtml(todo);      
        })

    }
}

function appendTodoInHtml(todo){
    const todoList = document.getElementById("todoList");
    const todoItem = document.createElement("li");

    const textDiv = document.createElement("div");

    textDiv.textContent = todo.text;

    todoItem.classList.add("todoItem");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");


    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.classList.add("completedBtn");


    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);
    todoList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    const filterBtns = document.getElementsByClassName("filterBtn");
    console.log(filterBtns);

    for(const btn of filterBtns){
        console.log(btn);
        btn.addEventListener("click", executeFilterAction);
    }
    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if(todoText == ""){
            alert("Please write something for the todo");
        }else{
            addTodoToLocalStorage({text: todoText, isCompleted: false});
            appendTodoInHtml({text: todoText, isCompleted: false});
            todoInput.value = '';
        }
    })
   
    todoInput.addEventListener("change", (event) => { 
        // This callback method is fired everytime there is a change in the input tag
        const todoText = event.target.value;
        event.target.value = todoText.trim();
        console.log(event.target.value);
    })  
    const todos = loadTodos();

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);      
    })
});