import { AbstractCommand } from "./AbstractCommand";

export class Trigger extends AbstractCommand{
    triggerMatchingFunction:Function;

    constructor(triggerMatchingFunction:Function, triggerFunction:Function){
        super(triggerFunction);
        this.triggerMatchingFunction=triggerMatchingFunction;
    }

    matches(msg:any, parsedCommandText:string) : boolean{
        return this.triggerMatchingFunction(parsedCommandText) && !msg.author.bot;
    }

    run(msg:any,client:any){
        return this.runFunction(msg,client);
    }
}