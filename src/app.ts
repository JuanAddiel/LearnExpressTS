import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
(async ()=>{
    main();
})();

function main (){
    const options={
        PORT:envs.PORT,
        PUBLIC_PATH:envs.PUBLIC_PATH,
        routes:AppRoutes.routes
    }
    const server = new Server(options);
    server.start();
}