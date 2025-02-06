document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("ft_list");
    const newTodoBtn = document.getElementById("newTodoBtn");

    // โหลดรายการที่บันทึกใน LocalStorage
    loadTodos();

    // เพิ่ม To-Do ใหม่
    newTodoBtn.addEventListener("click", function () {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    // ฟังก์ชันเพิ่ม To-Do ใน DOM
    function addTodoToDOM(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.textContent = todo;

        // คลิกเพื่อลบ To-Do
        todoDiv.addEventListener("click", function () {
            const confirmRemove = confirm("Are you sure you want to remove this TO DO?");
            if (confirmRemove) {
                todoDiv.remove();
                saveTodos();
            }
        });

        // แทรก To-Do ใหม่ด้านบนสุด
        todoList.insertBefore(todoDiv, todoList.firstChild);
    }

    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo").forEach(todoDiv => {
            todos.push(todoDiv.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(todos)); // เก็บข้อมูลใน LocalStorage
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(addTodoToDOM);
    }
});
