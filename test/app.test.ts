import { envs } from '../src/config/envs';
import { AppRoutes } from '../src/presentation/routes';
import {Server} from '../src/presentation/server';
jest.mock("../src/presentation/server");

describe('Testing app.ts',()=>{
    test('should call server with arguments and start',async()=>{
        await import('../src/app');
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            PORT:envs.PORT,
            PUBLIC_PATH:envs.PUBLIC_PATH,
            routes:expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalled();
    })
})