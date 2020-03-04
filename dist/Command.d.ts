import { AbstractCommand } from "./AbstractCommand";
export declare class Command extends AbstractCommand {
    commandString: string;
    params: any;
    constructor(commandString: string, middlewares: Function[]);
    matches(userInputText: string): boolean;
    run(msg: any, client: any, params: any): any;
}
