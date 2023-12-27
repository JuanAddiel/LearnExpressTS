import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy', createdAt: new Date() },
    { id: 2, text: 'Buy' ,createdAt:null },
    { id: 3, text: 'Buy', createdAt: new Date() }
];
export class TodosController{

    constructor(){}

    public getTodos = (req:Request, res:Response)=>{
        return res.json(todos);
    }

    public getById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        const todo = todos.find(todo=>todo.id === id);
        (todo)
        ? res.json(todo)
        : res.status(404).json({error:`TODO with id ${id} not found`});
    }
    public createTodo = (req: Request, res: Response)=>{
        const {text} = req.body;
        if(!text) return res.status(400).json({error:'Text property is require'});
        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: null
        };
        todos.push(newTodo);
        
        res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id =+ req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'Id argmunet is not a numer'});
        const todo = todos.find(todos=>todos.id === id);
        if(!todo){
            return res.status(404).json({ error: 'Todo not found' });
        }
        const { text, createdAt } = req.body;
        todo.text = text || todo.text;
        (createdAt === 'null')
        ? todo.createdAt = null
        : todo.createdAt = new Date(createdAt || todo.createdAt); 

        res.json(todo);
    }
    
    public deleteTodo = (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argmunet is not a numer' });
        const todo = todos.find(todos => todos.id === id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    }
}