class Storage {
    get() {
        const todos = localStorage.getItem("todos");
        if (!todos) return [];
        return JSON.parse(todos);
    }

    setTodos(updatedTodos) {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    add(todo) {
        const existingTodos = this.get();
        existingTodos.push(todo);
        this.setTodos(existingTodos);
    }

    delete(id) {
        const existingTodos = this.get();
        const keptTodos = existingTodos.filter((todo) => todo.id !== id);
        this.setTodos(keptTodos);
    }

    changeStatus(id, status) {
        const existingTodos = this.get();
        for (const todo of existingTodos) {
            if (todo.id === id) {
                todo.status = status;
            }
        }
        this.setTodos(existingTodos);
    }
}

const storage = new Storage();

class TodoApp {
    static ul = document.querySelector(".todos");

    changeTodoStatus = (id, status) => {
        storage.changeStatus(id, status);
    };
    deleteTodo = (id) => {
        storage.delete(id);
    };

    addTodo = (todo) => {
        storage.add(todo)
    }

    renderTodo = ({ text, id, status }) => {
        const li = document.createElement("li");
        li.innerText = text;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (status === "done") {
            li.style.textDecoration = "line-through";
            checkbox.checked = true;
        }

        const closeIcon = document.createElement("span");
        closeIcon.innerHTML = "&times;";
        closeIcon.style.cursor = "pointer";

        closeIcon.addEventListener("click", (e) => {
            this.deleteTodo(id);
            this.renderTodos();
        });

        checkbox.addEventListener("change", (e) => {
            if (checkbox.checked) {
                this.changeTodoStatus(id, "done");
            } else {
                this.changeTodoStatus(id, "todo");
            }

            this.renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(closeIcon);
        TodoApp.ul.appendChild(li);
    };

    renderTodos = () => {
        TodoApp.ul.innerHTML = "";
        for (const todo of storage.get()) {
            this.renderTodo(todo);
        }
    };
    
}

const app = new TodoApp();
