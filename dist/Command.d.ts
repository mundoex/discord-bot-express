import { MatchFunction } from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";
export declare class Command extends AbstractCommand {
    commandString: string;
    matchFunction: MatchFunction;
    params: any;
    constructor(commandString: string, middlewares: Function[]);
    matches(parsedCommandText: string): boolean;
    run(msg: any, client: any, params: any): any;
}
