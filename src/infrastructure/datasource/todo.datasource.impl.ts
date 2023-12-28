import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource{
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todos.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(newTodo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todos.findMany();
        return todos.map(todo=>TodoEntity.fromObject(todo));

    }
    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todos.findFirst({
            where: {
                id: id
            }
        });
        if(!todo) throw `Todo with id ${id} not found`;
        
        return TodoEntity.fromObject(todo);
    }
    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.getById(updateTodoDto.id);
        const updateTodo = await prisma.todos.update({
            where: {
                id: updateTodoDto.id
            },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updateTodo);
    }
    async delete(id: number): Promise<TodoEntity> {
        await this.getById(id);
        const todo = await prisma.todos.delete({
            where: {
                id
            }
        })
        return TodoEntity.fromObject(todo);

    }

}