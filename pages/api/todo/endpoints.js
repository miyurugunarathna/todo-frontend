import apiInstance from "../apiInstance";

// send todo details to backend
export async function addTodo(todo) {
    try {
        const response = await apiInstance.post("/todo", todo);
        return response.data;
    } catch (error) {
        throw JSON.stringify(error);
    }
}

// get todos from backend
export async function getTodos() {
    try {
        const response = await apiInstance.get("/todo");
        return response.data;
    } catch (error) {
        throw JSON.stringify(error);
    }
}

// send update todo details to backend
export async function updateTodo(id, todo) {
    try {
        const response = await apiInstance.put(`/todo/${id}`, todo);
        return response.data;
    } catch (error) {
        throw JSON.stringify(error);
    }
}

//send request to delete a todo
export async function deleteTodo(id) {
    try {
        const response = await apiInstance.delete(`/todo/${id}`);
        return response.data;
    } catch (error) {
        throw JSON.stringify(error);
    }
}