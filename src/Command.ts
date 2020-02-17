import {match, MatchFunction} from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";

export class Command extends AbstractCommand{
    commandString:string;
    matchFunction:MatchFunction;
    params:any;
    description:string;
        /*
        Pops the last element of the middlewares
        The last element is the function that is going to be the runFunction
        Adds the remaining functions that are the actual middlewares to the middlewares handler
        */
    constructor(commandString:string, middlewares:Function[]){
        super(middlewares);
        this.commandString=commandString;
        this.matchFunction=match(this.commandString);
        this.params=undefined;
        this.description="";
    }

    matches(msg:any,parsedCommandText:string){
        let result=this.matchFunction(parsedCommandText);
        result!==false ? this.params=result.params : this.params=undefined;
        return this.params!==undefined;
    }

    run(msg:any, client:any, params:any) : any{
        return this.middlewareHandler.handle(msg,client,params,(msg:any,client:any,params:any)=>{
            params=this.params;
            return this.runFunction(msg,client,params);
        });
    }

    setDescription(description:string){
        this.description=description;
    }
}