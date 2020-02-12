import { AbstractCommand } from "./AbstractCommand";

export class Trigger extends AbstractCommand{
    triggerMatchingFunction:Function;

    constructor(triggerMatchingFunction:Function, triggerFunction:Function){
        super(triggerFunction);
        this.triggerMatchingFunction=triggerMatchingFunction;
    }

    matches(commandText:string) : boolean{
        return this.triggerMatchingFunction(commandText);
    }

    run(msg:any,client:any){
        return this.runFunction(msg,client);
    }
}