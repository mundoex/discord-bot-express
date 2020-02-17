import { IRunnable } from "./IRunnable";
import { IMatchable } from "./IMatchable";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";
export declare abstract class AbstractCommand implements IRunnable, IMatchable {
    runFunction: Function;
    middlewareHandler: MiddlewareHandler;
    constructor(middlewares: Function[]);
    abstract run(msg: any, client: any, params: any): any;
    abstract matches(msg: any, commandText: string): boolean;
}
