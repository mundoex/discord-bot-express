import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";
export declare abstract class AbstractCommand implements IRunnable, IMatchable {
    runFunction: Function;
    middlewareHandler: MiddlewareHandler;
    description: string;
    usage: string;
    constructor(middlewares: Function[]);
    setDescription(description: string): this;
    setUsage(usage: string): this;
    abstract run(msg: any, client: any, params: any): any;
    abstract matches(commandText: string): boolean;
}
