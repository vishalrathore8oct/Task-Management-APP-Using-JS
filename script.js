const form = document.getElementById("todo-form");
let pendingTodoList = document.getElementById("pending-todos-list");
let completedTodoList = document.getElementById("completed-todos-list");

const filterPriority = document.getElementById("filter-priority");
const filterStatus = document.getElementById("filter-status");
const filterDueDate = document.getElementById("filter-due-date");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

filterPriority.addEventListener("change", (e) => {
    let selectedPriority = e.target.value;
    // console.log(selectedPriority);

    function renderPriorityFilteredTodos(selectedPriority) {
        completedTodoList.innerHTML = "";
        pendingTodoList.innerHTML = "";

        todos.forEach((todo, index) => {
            if (todo.priority.toLowerCase() === selectedPriority.toLowerCase()) {

                const todoElement = `
            <div class="todo" id="${index}">
                <i data-action="check" class="${todo.checked ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
                <h2 class="${todo.checked ? "checked" : ""}" data-action="check">${todo.title}</h2>
                <p class="${todo.checked ? "checked" : ""}">${todo.description}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.date}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.priority}</p>
                <i data-action="edit" class="fa-solid fa-pen-to-square"></i>
                <i data-action="delete" class="fa-solid fa-trash-can"></i>
            </div>
        `;

                if (todo.checked) {
                    completedTodoList.innerHTML += todoElement;
                } else {
                    pendingTodoList.innerHTML += todoElement;
                }

            } else if (selectedPriority === "all") {
                renderTodos();
            }
        });


        filterDueDate.value = "all";
        filterStatus.value = "all";
    }



    renderPriorityFilteredTodos(selectedPriority);


});

filterStatus.addEventListener("change", (e) => {
    let selectedStatus = e.target.value;
    // console.log(selectedStatus);

    function renderStatusFilteredTodos(selectedStatus) {
        completedTodoList.innerHTML = "";
        pendingTodoList.innerHTML = "";
        todos.forEach((todo, index) => {
            if (todo.checked && selectedStatus === "completed") {
                const todoElement = `
            <div class="todo" id="${index}">
                <i data-action="check" class="${todo.checked ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
                <h2 class="${todo.checked ? "checked" : ""}" data-action="check">${todo.title}</h2>
                <p class="${todo.checked ? "checked" : ""}">${todo.description}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.date}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.priority}</p>
                <i data-action="edit" class="fa-solid fa-pen-to-square"></i>
                <i data-action="delete" class="fa-solid fa-trash-can"></i>
            </div>
        `;
                completedTodoList.innerHTML += todoElement;

            } else if (!todo.checked && selectedStatus === "pending") {
                const todoElement = `
            <div class="todo" id="${index}">
                <i data-action="check" class="${todo.checked ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
                <h2 class="${todo.checked ? "checked" : ""}" data-action="check">${todo.title}</h2>
                <p class="${todo.checked ? "checked" : ""}">${todo.description}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.date}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.priority}</p>
                <i data-action="edit" class="fa-solid fa-pen-to-square"></i>
                <i data-action="delete" class="fa-solid fa-trash-can"></i>
            </div>
        `;
                pendingTodoList.innerHTML += todoElement;

            } else if (selectedStatus === "all") {
                renderTodos();
            }
        });

        console.log();


        filterDueDate.value = "all";
        filterPriority.value = "all";
    }

    renderStatusFilteredTodos(selectedStatus);


});


filterDueDate.addEventListener("change", (e) => {
    let selectedDueDate = e.target.value;
    // console.log(selectedDueDate);


    function renderDueDateFilteredTodos(selectedDueDate) {
        completedTodoList.innerHTML = "";
        pendingTodoList.innerHTML = "";

        const today = new Date();
        // console.log(today.toDateString())


        todos.forEach((todo, index) => {
            const todoDate = new Date(todo.date);
            // console.log(todoDate)


            let showTodo = false;
            if (selectedDueDate === "today") {
                showTodo = todoDate.toDateString() === today.toDateString();
            } else if (selectedDueDate === "7days") {
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                console.log(todoDate, today, nextWeek);

                showTodo = todoDate >= today && todoDate <= nextWeek;
            } else if (selectedDueDate === "4days") {
                const nextdays = new Date();
                nextdays.setDate(today.getDate() + 4);
                showTodo = todoDate >= today && todoDate <= nextdays;
            }
            else if (selectedDueDate === "all") {
                renderTodos();
            }

            if (showTodo) {
                const todoElement = `
                    <div class="todo" id="${index}">
                        <i data-action="check" class="${todo.checked ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
                        <h2 class="${todo.checked ? "checked" : ""}" data-action="check">${todo.title}</h2>
                        <p class="${todo.checked ? "checked" : ""}">${todo.description}</p>
                        <p class="${todo.checked ? "checked" : ""}">${todo.date}</p>
                        <p class="${todo.checked ? "checked" : ""}">${todo.priority}</p>
                        <i data-action="edit" class="fa-solid fa-pen-to-square"></i>
                        <i data-action="delete" class="fa-solid fa-trash-can"></i>
                    </div>
                `;

                if (todo.checked) {
                    completedTodoList.innerHTML += todoElement;
                } else {
                    pendingTodoList.innerHTML += todoElement;
                }
            }
        });

        filterPriority.value = "all";
        filterStatus.value = "all";


    }



    renderDueDateFilteredTodos(selectedDueDate);


});



let editTodoId = -1;

renderTodos();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    saveTodo();

    renderTodos();

    localStorage.setItem("todos", JSON.stringify(todos));
});

function saveTodo() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");
    let priority = document.getElementById("priority");

    if (editTodoId >= 0) {
        todos[editTodoId] = {
            title: title.value,
            description: description.value,
            date: date.value,
            priority: priority.value,
            checked: todos[editTodoId].checked
        };
        editTodoId = -1;
    } else {
        let todo = {
            title: title.value,
            description: description.value,
            date: date.value,
            priority: priority.value,
            checked: false
        };

        todos.push(todo);
    }

    title.value = "";
    description.value = "";
    date.value = "";
    priority.value = "";
}

function renderTodos() {
    pendingTodoList.innerHTML = "";
    completedTodoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoElement = `
            <div class="todo" id="${index}">
                <i data-action="check" class="${todo.checked ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}"></i>
                <h2 class="${todo.checked ? "checked" : ""}" data-action="check">${todo.title}</h2>
                <p class="${todo.checked ? "checked" : ""}">${todo.description}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.date}</p>
                <p class="${todo.checked ? "checked" : ""}">${todo.priority}</p>
                <i data-action="edit" class="fa-solid fa-pen-to-square"></i>
                <i data-action="delete" class="fa-solid fa-trash-can"></i>
            </div>
        `;

        if (todo.checked) {
            completedTodoList.innerHTML += todoElement;
        } else {
            pendingTodoList.innerHTML += todoElement;
        }


    });
}

pendingTodoList.addEventListener("click", (e) => {
    handleTodoClick(e);
});

completedTodoList.addEventListener("click", (e) => {
    handleTodoClick(e);
});

function handleTodoClick(e) {

    let target = e.target;

    let parentElement = target.parentElement;
    if (parentElement.className !== "todo") return;
    // console.log(parentElement);


    const todoId = parentElement.id;
    const action = target.dataset.action;

    if (action === "delete") deleteTodo(todoId);
    if (action === "edit") editTodo(todoId);
    if (action === "check") checkTodo(todoId);
}

function checkTodo(todoId) {
    todos[todoId].checked = !todos[todoId].checked;

    renderTodos();

    localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodo(todoId) {


    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");
    let priority = document.getElementById("priority");


    title.value = todos[todoId].title;

    description.value = todos[todoId].description;
    date.value = todos[todoId].date;
    priority.value = todos[todoId].priority;

    editTodoId = todoId;
}

function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index != todoId);

    renderTodos();

    localStorage.setItem("todos", JSON.stringify(todos));
}