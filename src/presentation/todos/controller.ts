import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodosController{

    constructor(
        private readonly repository:TodoRepository
    ){}

    public getTodos = (req:Request, res:Response)=>{
        new GetTodos(this.repository)
        .execute()
        .then(todos =>res.json(todos))
        .catch(error=>res.status(400).json({error}));
    }

    public getById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.repository)
        .execute(id)
        .then(todo=>res.json(todo))
        .catch(error => res.status(400).json({ error }));

    }
    public createTodo = (req: Request, res: Response)=>{
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error});

        new CreateTodo(this.repository)
        .execute(createTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({ error }));
    }

    public updateTodo =  (req: Request, res: Response) => {
        const id =+ req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            id, ...req.body
        });
        if(error) return res.status(400).json({error});
        
        new UpdateTodo(this.repository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }
    
    public deleteTodo =  (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        new DeleteTodo(this.repository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    }
}