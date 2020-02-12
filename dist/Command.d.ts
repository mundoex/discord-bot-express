import { AbstractCommand } from "./AbstractCommand";
export declare class Command extends AbstractCommand {
    commandString: string;
    params: any;
    constructor(commandString: string, commandFunction: Function);
    matches(commandText: string): boolean;
    run(msg: any, client: any): any;
}
