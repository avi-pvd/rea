import { createTodo, listTodos } from "../src/services/todos.service"

describe('todos service', () => {
    test("list todos is empty", () => {
        const all = listTodos();
        expect(all).toEqual([]);
    });

    test('creat and list todo', () => {
        const todo = createTodo('test');
        const all = listTodos();

        expect(all).toEqual([todo]);
    });

    test("wrong create", () => {
        //@ts-ignore
        //const todo = createTodo();

        expect(() => createTodo()).toThrow('Title is required');
    });
});
