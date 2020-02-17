import {match, MatchFunction} from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";
import { MiddlewareHandler } from "./MiddlewareHandler";

export class Command extends AbstractCommand{
    commandString:string;
    matchFunction:MatchFunction;
    params:any;
    description:string;
    middlewareHandler:MiddlewareHandler;
        /*
        Pops the last element of the middlewares
        The last element is the function that is going to be the runFunction
        Adds the remaining functions that are the actual middlewares to the middlewares handler
        */
    constructor(commandString:string, middlewares:Function[]){
        super(middlewares.pop());
        this.commandString=commandString;
        this.matchFunction=match(this.commandString);
        this.params=undefined;
        this.description="";
        this.middlewareHandler=new MiddlewareHandler();
        middlewares.forEach(middleware=>this.middlewareHandler.use(middleware));
    }

    matches(msg:any,parsedCommandText:string){
        let result=this.matchFunction(parsedCommandText);
        result!==false && !msg.author.bot ? this.params=result.params : this.params=undefined;
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

function needsReplace(commandText:string) {
    return commandText.includes(" ");
}