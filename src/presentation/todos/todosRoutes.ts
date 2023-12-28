import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repositories.impl";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const dataSource = new TodoDataSourceImpl();
        const TodoRepository = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(TodoRepository);
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getById);
        router.post('/', todoController.createTodo);
        router.put('/update/:id', todoController.updateTodo);
        router.delete('/delete/:id', todoController.deleteTodo);

        return router;
    }
}