import { MatchFunction } from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";
export declare class Command extends AbstractCommand {
    commandString: string;
    matchFunction: MatchFunction;
    params: any;
    description: string;
    constructor(commandString: string, middlewares: Function[]);
    matches(msg: any, parsedCommandText: string): boolean;
    run(msg: any, client: any, params: any): any;
    setDescription(description: string): void;
}
