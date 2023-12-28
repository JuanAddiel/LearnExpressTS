import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
    { id: 1, text: 'Buy', createdAt: new Date() },
    { id: 2, text: 'Buy' ,createdAt:null },
    { id: 3, text: 'Buy', createdAt: new Date() }
];
export class TodosController{

    constructor(){}

    public getTodos =async (req:Request, res:Response)=>{
        const todos = await prisma.todos.findMany();
        return res.json(todos);
    }

    public getById = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        const todo = await prisma.todos.findFirst({
            where:{
                id:id
            }
        });
        (todo)
        ? res.json(todo)
        : res.status(404).json({error:`TODO with id ${id} not found`});
    }
    public createTodo =async (req: Request, res: Response)=>{
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error});
        const newTodo = await prisma.todos.create({
            data:createTodoDto!
        });
        
        res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id =+ req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            id, ...req.body
        });
        if(error) return res.status(400).json({error});
        const idFound = await prisma.todos.findFirst({
            where: {
                id
            }
        })
        if (!idFound) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        const updateTodo = await prisma.todos.update({
            where:{
                id:id
            },
            data: updateTodoDto!.values
        });
        res.json(updateTodo);
    }
    
    public deleteTodo = async (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        const idFound = await prisma.todos.findFirst({
            where:{
                id
            }
        })
        if (!idFound) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        const todo = await prisma.todos.delete({
            where:{
                id
            }
        })
    

        return res.json(todo);
    }
}