import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";
export declare abstract class AbstractCommand implements IRunnable, IMatchable {
    runFunction: Function;
    constructor(runFunction: Function);
    abstract run(msg: any, client: any): any;
    abstract matches(commandText: string): boolean;
}
