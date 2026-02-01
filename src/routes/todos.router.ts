import { Router } from "express";
import { listTodos } from "../services/todos.service";
import { createTodo, getTodoById, updateTodo, deleteTodo } from "../services/todos.service";
import {Todo, Todos} from "../types/todo.type";

const router = Router();
 router.get("/", (_req, res) => {
    res.status(200).json({
        items: listTodos(),
        messege: "List of todos",
    });
 });

 router.post('/', (req, res) => {
    debugger
    // variant 1
    const {title} = req.body ?? {};

    // var 2
    // const titile = req.body.title;

    // Получить конкретную todo по ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Проверяем, что ID - валидное число
    if (isNaN(id)) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'ID must be a valid number',
        });
    }
     const todo = getTodoById(id);
    
    if (!todo) {
        return res.status(404).json({
            status: 'Not Found',
            message: `Todo with id ${id} not found`,
        });
    }
    
    res.status(200).json({
        item: todo,
        message: `Todo with id ${id}`,
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'ID must be a valid number',
        });
    }
    
    const deleted = deleteTodo(id);

    if(!deleted) {
        return res.status(404).json({
            status: 'Not Found',
            message: `Todo with id ${id} not found`,
        });
    }
    
    res.status(200).json({
        message: `Todo with id ${id} deleted`,
    });
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'ID must be a valid number',
        });
    }
    
    const { title, completed } = req.body ?? {};
    
    if (title !== undefined && title.trim().length === 0) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Title cannot be empty',
        });
    }
    
    const updates: Partial<Omit<Todo, 'id'>> = {};
    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;
    
    const updatedTodo = updateTodo(id, updates);
    
    if (!updatedTodo) {
        return res.status(404).json({
            status: 'Not Found',
            message: `Todo with id ${id} not found`,
        });
    }
    
    res.status(200).json({
        item: updatedTodo,
        message: `Todo with id ${id} updated`,
    });
});

    if (!title){
        return res.status(400).json({
            status: 'Bad Request',
            massege: 'Title must be a starting',
        });
    }

    if(title.trim().lenght === 0) {
        return res.status(400).json({
            status: 'Bad Request',
            messege: 'Title must be a starting',
        });
    }

    const todo = createTodo(title);

    res.status(201).json({
        item: todo,
        messege: 'Todo created',
    });
 });

 export default router;