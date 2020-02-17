import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";

export abstract class AbstractCommand implements IRunnable,IMatchable{
    runFunction:Function;
    
    constructor(runFunction:Function){
        this.runFunction=runFunction;
    }

    abstract run(msg: any, client: any, params:any) : any;
    abstract matches(msg:any,commandText: string): boolean;
}