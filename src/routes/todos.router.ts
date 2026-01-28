import { Router } from "express";
import { listTodos } from "../services/todos.service";
import { createTodo } from "../services/todos.service";
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