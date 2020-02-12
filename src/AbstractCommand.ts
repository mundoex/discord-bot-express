import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";

export abstract class AbstractCommand implements IRunnable,IMatchable{
    runFunction:Function;
    
    constructor(runFunction:Function){
        this.runFunction=runFunction;
    }

    abstract run(msg: any, client: any) : any;
    abstract matches(commandText: string): boolean;
}