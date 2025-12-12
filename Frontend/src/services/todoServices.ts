// import axios from 'axios';
// // const baseUrl = `${process.env.REACT_APP_API_URL}/api/Todos`;
// const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

// export const createTodo = (todo: {priority: number, title: string; completed: boolean;}) => {
//     return axios.post(baseUrl, {
//         priority: todo.priority,
//         title: todo.title,
//         completed: todo.completed
//     }).then(response => response.data)
// }

// export const loadTodos = () => {
//     return axios.get(baseUrl)
//     .then(response => response.data)
// }

// export const updateTodo = (todo: {priority: number, id?: number, title: string; completed: boolean;}) => {
//     return axios.put(`${baseUrl}/${todo.id}`, {
//         priority: todo.priority,
//         id: todo.id,
//         title: todo.title,
//         completed: todo.completed
//     }).then(response => response.data)
// }

// export const deleteTodo = (id: number) => {
//     return axios.delete(`${baseUrl}/${id}`)
//     .then(response => response.data)
// }

import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const loadTodos = (username: string) => {
  return axios
    .get(`${API}/users/${username}/GetTodos`)
    .then(res => res.data);
};

export const createTodo = (
  username: string,
  todo: { priority: number; title: string; completed: boolean }
) => {
  return axios
    .post(`${API}/users/${username}/PostTodo`, todo)
    .then(res => res.data);
};

export const updateTodo = (
  username: string,
  todo: { id: number; priority: number; title: string; completed: boolean }
) => {
  return axios
    .put(`${API}/users/${username}/PutTodo`, todo)
    .then(res => res.data);
};

export const deleteTodo = (username: string, todoId: number) => {
  return axios
    .delete(`${API}/users/${username}/DeleteTodo/${todoId}`)
    .then(res => res.data);
};
