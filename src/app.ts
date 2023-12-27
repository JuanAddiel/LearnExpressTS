import { Server } from "./presentation/server";
import { envs } from "./config/envs";
(async ()=>{
    main();
})();

function main (){
    const options={
        PORT:envs.PORT,
        PUBLIC_PATH:envs.PUBLIC_PATH
    }
    const server = new Server(options);
    server.start();
}