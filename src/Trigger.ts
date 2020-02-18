import { AbstractCommand } from "./AbstractCommand";

export class Trigger extends AbstractCommand{
    triggerMatchingFunction:Function;

    constructor(triggerMatchingFunction:Function, middlewares:Function[]){
        super(middlewares);
        this.triggerMatchingFunction=triggerMatchingFunction;
    }

    matches(parsedCommandText:string) : boolean{
        return this.triggerMatchingFunction(parsedCommandText);
    }

    run(msg:any,client:any,params:any){
        return this.middlewareHandler.handle(msg,client,params,(msg:any,client:any,params:any)=>{
            return this.runFunction(msg,client,params);
        });
    }
}