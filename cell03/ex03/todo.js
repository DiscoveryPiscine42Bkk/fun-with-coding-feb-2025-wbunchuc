document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("ft_list");
    const newTodoBtn = document.getElementById("newTodoBtn");

    loadTodos();

    newTodoBtn.addEventListener("click", function () {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    function addTodoToDOM(todo, isLoading = false) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.textContent = todo;
        
        todoDiv.addEventListener("click", function () {
            const confirmRemove = confirm("Are you sure you want to remove this TO DO?");
            if (confirmRemove) {
                todoDiv.remove();
                saveTodos();
            }
        });

        if (isLoading) {
            todoList.appendChild(todoDiv); // โหลดจาก localStorage ให้เรียงตามที่บันทึกไว้
        } else {
            todoList.insertBefore(todoDiv, todoList.firstChild); // ให้รายการใหม่อยู่บนสุด
        }
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo").forEach(todoDiv => {
            todos.push(todoDiv.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        if (todos.length > 0) {
            todos.forEach(todo => addTodoToDOM(todo, true));
        }
    }
});
