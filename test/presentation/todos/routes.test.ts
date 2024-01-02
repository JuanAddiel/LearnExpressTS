import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
describe('Todos routes testing',()=>{
    beforeAll(async()=>{
        await testServer.start();
    });
    beforeEach(async()=>{
        await prisma.todos.deleteMany();
    });
    const todo1 = { text: 'Hola Mundo 1' };
    const todo2 = { text: 'Hola Mundo 2' };
    test('should return TODOS /api/todo',async()=>{
        
        await prisma.todos.createMany({
            data:[todo1,todo2]
        });
        const {body} = await request(testServer.app)
        .get('/api/todos')
        .expect(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        
    });
    test('should return a TODO /api/todo/:id', async () => {
        const todo = await prisma.todos.create({
            data:todo1
        });
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id:todo.id,
            text:todo.text,
            createdAt:todo.createdAt
        })
    });

    test('should return a not fount /api/todo/:id', async () => {
        const {body}  = await request(testServer.app)
            .get(`/api/todos/1`)
            .expect(404);

        expect(body).toEqual({
            error:'Todo with id 1 not found'
        })
       
    })

    test('should return a new todo /api/todos', async () => {
        const { body } = await request(testServer.app)
            .post(`/api/todos`)
            .send({
                text:'Hola a todos'
            })
            .expect(201);
        const {id,text,createdAt} = body
        expect(body).toEqual({
            id,
            text,
            createdAt
        })

    })
    test('should return a exp 400 /api/todos', async () => {
        const { body } = await request(testServer.app)
            .post(`/api/todos`)
            .send({
            })
            .expect(400);
        expect(body).toEqual({
            error: 'Text property is required'
        })

    })
    test('should return a exp 404 empty /api/todos', async () => {
        const { body } = await request(testServer.app)
            .post(`/api/todos`)
            .send({
                text:''
            })
            .expect(400);
        expect(body).toEqual({
            error: 'Text property is required'
        })

    })
    test('should return a update todo /api/todos', async () => {
        const todo = await prisma.todos.create({
            data: todo1
        });
        const { body } = await request(testServer.app)
            .put(`/api/todos/update/${todo.id}`)
            .send({
                text: 'Hola a todos'
            })
            .expect(201);
        const { id, text, createdAt } = body;
        expect(body).toEqual({
            id,
            text,
            createdAt
        })

    })

    test('should return a update not found /api/todos', async () => {
        const idTodo= 1;
        const { body } = await request(testServer.app)
            .put(`/api/todos/update/${idTodo}`)
            .send({
                text: 'Hola a todos'
            })
            .expect(404);
            expect(body).toEqual({
                error: `Todo with id ${idTodo} not found` 
            })

    })

    test('should return a update todo /api/todos', async () => {
        const todo = await prisma.todos.create({
            data: todo1
        });
        const { body } = await request(testServer.app)
            .delete(`/api/todos/delete/${todo.id}`)
            .expect(200);
        const { id, text, createdAt } = body;
        expect(body).toEqual({
            id,
            text,
            createdAt
        })

    })

    test('should return a delete not found /api/todos', async () => {
        const idTodo = 1;
        const { body } = await request(testServer.app)
            .delete(`/api/todos/delete/${idTodo}`)
            .expect(404);
        expect(body).toEqual({
            error: `Todo with id ${idTodo} not found`
        })

    })
});