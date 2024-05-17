import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;

export const createTodo = (todo: {priority: number, title: string; completed: boolean;}) => {
    return axios.post(baseUrl, {
        priority: todo.priority,
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data)
}

export const loadTodos = () => {
    return axios.get(baseUrl)
    .then(response => response.data)
}

export const updateTodo = (todo: {priority: number, id?: number, title: string; completed: boolean;}) => {
    return axios.put(`${baseUrl}/${todo.id}`, {
        priority: todo.priority,
        id: todo.id,
        title: todo.title,
        completed: todo.completed
    }).then(response => response.data)
}

export const deleteTodo = (id: number) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}