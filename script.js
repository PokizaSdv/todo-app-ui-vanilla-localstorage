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
    
}

const app = new TodoApp();
