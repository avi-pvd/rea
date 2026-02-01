import { create } from "node:domain";
import {Todo, Todos} from "../types/todo.type";

const store = new Map<Todo['id'], Todo>();
let iterator = 0;

function listTodos(): Todos {
    return Array.from(store.values());
}

function createTodo(title: Todo['title']): Todo{
    const todo: Todo = {
        id: ++iterator,
        title,
        completed: false,
    }
    store.set(todo.id, todo);
    return todo;
}

function getTodoById(id: number): Todo | undefined {
    return store.get(id);
}

function updateTodo(id: number, updates: Partial<Omit<Todo, 'id'>>): Todo | undefined {
    const todo = store.get(id);
    if (todo) {
        const updatedTodo = { ...todo, ...updates };
        store.set(id, updatedTodo);
        return updatedTodo;
    }
    return undefined;
}

function deleteTodo(id: number): boolean {
   return store.delete(id);
}

export {
    listTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
};