import { AbstractCommand } from "./AbstractCommand";
import { CommandInterpreter } from "./command-matcher/CommandInterpreter";

export class Command extends AbstractCommand{
    commandString:string;
    params:any;
        
    constructor(commandString:string, middlewares:Function[]){
        super(middlewares);
        this.commandString=commandString;
        this.params=undefined;
    }

    matches(userInputText:string){
        let result=CommandInterpreter.interprete(this.commandString, userInputText);
        this.params=result;
        return result!==undefined;
    }

    run(msg:any, client:any, params:any) : any{
        return this.middlewareHandler.handle(msg,client,params,(msg:any,client:any,params:any)=>{
            params=this.params;
            return this.runFunction(msg,client,params);
        });
    }
}