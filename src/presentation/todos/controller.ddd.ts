import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController{

    constructor(
        private readonly repository:TodoRepository
    ){}

    public getTodos =async (req:Request, res:Response)=>{
        const todos = await this.repository.getAll();
        return res.json(todos);
    }

    public getById = async(req: Request, res: Response) => {
        const id = +req.params.id;
        try{
            const todo = await this.repository.getById(id);
            return res.json(todo);
        }catch(error){
            res.status(400).json({error});
        }
    }
    public createTodo =async (req: Request, res: Response)=>{
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error});

        const newTodo = await this.repository.create(createTodoDto!);
        
        return res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id =+ req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            id, ...req.body
        });
        if(error) return res.status(400).json({error});
        
        const updateTodo = await this.repository.update(updateTodoDto!);
        return res.json(updateTodo);
    }
    
    public deleteTodo = async (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        const todo = await this.repository.delete(id);
        return res.json(todo);
    }
}