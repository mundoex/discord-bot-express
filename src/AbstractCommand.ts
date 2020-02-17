import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";

export abstract class AbstractCommand implements IRunnable,IMatchable{
    runFunction:Function;
    middlewareHandler:MiddlewareHandler;
    constructor(middlewares:Function[]){
        this.runFunction=middlewares.pop();
        this.middlewareHandler=new MiddlewareHandler();
        middlewares.forEach(middleware=>this.middlewareHandler.use(middleware));
    }

    abstract run(msg: any, client: any, params:any) : any;
    abstract matches(msg:any,commandText: string): boolean;
}