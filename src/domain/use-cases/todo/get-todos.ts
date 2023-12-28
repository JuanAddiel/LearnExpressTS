
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {
    constructor(
        private readonly repository: TodoRepository,
    ) { }
    async execute(): Promise<TodoEntity[]> {
        return await this.repository.getAll();
    }

}