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
            //we do this to get the actual params and the tokens that come in the params eg for params:["prefix", "command", deez:"nutz"]
            const paramKeys=Object.keys(params).filter(p => isNaN(parseInt(p)));
            let middlewareParams:any={};
            for (let i = 0; i < paramKeys.length; i++) {
                const key = paramKeys[i];
                middlewareParams[key] = params[key];
            }
            params={...this.params, ...middlewareParams}
            return this.runFunction(msg, client, params);
        });
    }
}