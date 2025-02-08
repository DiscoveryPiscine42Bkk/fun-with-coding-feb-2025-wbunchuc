$(document).ready(function() {
    const todoList = $("#ft_list");
    const newTodoBtn = $("#newTodoBtn");

    loadTodos(); 

    newTodoBtn.click(function() {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodoToDOM(newTodo); 
            saveTodos();// เก็บลงในlocalStorage
        }
    });

    function addTodoToDOM(todo, isLoading = false) { //เช็คว่าโหลดจากlocalStorageมาไหม
        const todoDiv = $("<div>").addClass("todo").text(todo); // สร้างdiv กำหนดให้มีclass todo และใส่ข้อความ TO DO
        
        todoDiv.click(function() { //คลิกtodo
            const confirmRemove = confirm("Are you sure you want to remove this TO DO?");
            if (confirmRemove) {
                todoDiv.remove();
                saveTodos(); // ลบ
            }
        });

        if (isLoading) { //โหลดtodo
            todoList.append(todoDiv);//ลบท้าย
        } else {
            todoList.prepend(todoDiv);//เพิ่มไวด้านบน
        }
    }

    function saveTodos() { //บันทึกลง localstoraage
        const todos = []; // สร้าง arry
        $(".todo").each(function() { //ลูป todo
            todos.push($(this).text());//ดึกข้อมูลใน todo ลงในarry
        });
        localStorage.setItem("todos", JSON.stringify(todos));//arryลง local ในรูปแบบ Str
    }

    function loadTodos() { //โหลดจาก local
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        if (todos.length > 0) {
            todos.forEach(todo => addTodoToDOM(todo, true));// ลงหน้าเว็ป
        }
    }
});
