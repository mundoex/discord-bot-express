import { AbstractCommand } from "./AbstractCommand";
export declare class Trigger extends AbstractCommand {
    triggerMatchingFunction: Function;
    constructor(triggerMatchingFunction: Function, middlewares: Function[]);
    matches(parsedCommandText: string): boolean;
    run(msg: any, client: any, params: any): void;
}
