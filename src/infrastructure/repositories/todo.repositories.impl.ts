import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly dataSource:TodoDataSource
    ){}

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    async getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    async getById(id: number): Promise<TodoEntity> {
        return this.dataSource.getById(id);
    }
    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.update(updateTodoDto);
    }
    async delete(id: number): Promise<TodoEntity> {
        return this.dataSource.delete(id);
    }

}