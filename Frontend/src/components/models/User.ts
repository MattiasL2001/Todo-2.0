export interface Todo {
    priority: number
    id?: number
    todos: Array<Todo>
    username: string
    password: boolean
}