document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("ft_list");
    const newTodoBtn = document.getElementById("newTodoBtn");

    // โหลดรายการจากคุกกี้
    loadTodos();

    // สร้าง TO DO ใหม่
    newTodoBtn.addEventListener("click", function () {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    // เพิ่ม TO DO ใน DOM
    function addTodoToDOM(todo) {
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
        todoList.insertBefore(todoDiv, todoList.firstChild);
    }

    // บันทึก TO DO ลงในคุกกี้
    function saveTodos() {
        const todos = [];
        const todoDivs = document.querySelectorAll(".todo");
        todoDivs.forEach(todoDiv => {
            todos.push(todoDiv.textContent);
        });
        // บันทึก TO DO ลงในคุกกี้ (ในรูปแบบ JSON)
        document.cookie = "todos=" + JSON.stringify(todos) + ";path=/;expires=" + getCookieExpiration();
        
        // แสดงคุกกี้ใน Console
        console.log("Cookies after saving:", document.cookie);
    }

    // โหลด TO DO จากคุกกี้
    function loadTodos() {
        const cookies = document.cookie.split("; ");
        let todos = [];
        cookies.forEach(cookie => {
            if (cookie.startsWith("todos=")) {
                todos = JSON.parse(cookie.substring("todos=".length));
            }
        });

        // หากพบคุกกี้ todos จะโหลด TO DO ไปแสดงใน DOM
        if (todos.length > 0) {
            todos.forEach(todo => {
                addTodoToDOM(todo);
            });
        } else {
            console.log("No TO DOs found in cookies.");
        }

        // แสดงคุกกี้ใน Console เมื่อโหลด
        console.log("Cookies after loading:", document.cookie);
    }

    // ฟังก์ชันในการกำหนดอายุของคุกกี้ (7 วัน)
    function getCookieExpiration() {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // หมดอายุใน 7 วัน
        return date.toUTCString();
    }
});
