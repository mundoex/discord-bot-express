import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";

export abstract class AbstractCommand implements IRunnable,IMatchable{
    runFunction:Function;
    middlewareHandler:MiddlewareHandler;
    description:string;
    usage:string;

    /*
        Pops the last element of the middlewares
        The last element is the function that is going to be the runFunction
        Adds the remaining functions that are the actual middlewares to the middlewares handler
    */
    constructor(middlewares:Function[]){
        this.runFunction=middlewares.pop();
        this.middlewareHandler=new MiddlewareHandler();
        middlewares.forEach(middleware=>this.middlewareHandler.use(middleware));
        this.description="";
    }

    setDescription(description:string){
        this.description=description;
        return this;
    }

    setUsage(usage:string){
        this.usage=usage;
        return this;
    }

    abstract run(msg: any, client: any, params:any) : any;
    abstract matches(commandText: string): boolean;
}