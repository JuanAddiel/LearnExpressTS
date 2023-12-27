import express, { Router } from 'express'
import path from 'path';

interface Options{
    PORT:number;
    PUBLIC_PATH?:string;
    routes:Router;
}

export class Server{
    private app = express();
    private readonly port:number;
    private readonly publicPath:string;
    private readonly routes:Router;
    constructor(options:Options){
        const{PORT,routes, PUBLIC_PATH = 'public'} = options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
        this.routes = routes;
    }
    async start(){
        //*Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true})) //Esto nos permite recibir body en x-www-form-urlencoded
        //*Public Folder
        this.app.use(express.static(this.publicPath));
        this.app.use(this.routes);
        this.app.get('*',(req,res)=>{
            const indexPath = path.join(__dirname + '../../../public/index.html');
            res.sendFile(indexPath);
        })
        //Listen
        this.app.listen(this.port,()=>{
            console.log(`Server running in ${this.port} port`)
        })
    }
}