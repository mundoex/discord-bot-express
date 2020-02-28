import { AbstractCommand } from "./AbstractCommand";
import { CommandMatcher } from "./command-matcher/CommandMatcher";
export declare class Command extends AbstractCommand {
    commandString: string;
    commandMatcher: CommandMatcher;
    params: any;
    constructor(commandString: string, middlewares: Function[]);
    matches(userInputText: string): boolean;
    run(msg: any, client: any, params: any): any;
}
