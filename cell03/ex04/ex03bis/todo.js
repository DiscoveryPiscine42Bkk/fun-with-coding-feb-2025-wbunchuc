$(document).ready(function() {
    const todoList = $("#ft_list");
    const newTodoBtn = $("#newTodoBtn");

    loadTodos();

    newTodoBtn.click(function() {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo);
            saveTodos();
        }
    });

    function addTodoToDOM(todo, isLoading = false) {
        const todoDiv = $("<div>").addClass("todo").text(todo);
        
        todoDiv.click(function() {
            const confirmRemove = confirm("Are you sure you want to remove this TO DO?");
            if (confirmRemove) {
                todoDiv.remove();
                saveTodos();
            }
        });

        if (isLoading) {
            todoList.append(todoDiv);
        } else {
            todoList.prepend(todoDiv);
        }
    }

    function saveTodos() {
        const todos = [];
        $(".todo").each(function() {
            todos.push($(this).text());
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
