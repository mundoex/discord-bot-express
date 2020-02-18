import {match, MatchFunction} from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";

export class Command extends AbstractCommand{
    commandString:string;
    matchFunction:MatchFunction;
    params:any;
        
    constructor(commandString:string, middlewares:Function[]){
        super(middlewares);
        this.commandString=commandString;
        this.matchFunction=match(this.commandString);
        this.params=undefined;
    }

    matches(parsedCommandText:string){
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
}