import { AbstractCommand } from "./AbstractCommand";
export declare class Trigger extends AbstractCommand {
    triggerMatchingFunction: Function;
    constructor(triggerMatchingFunction: Function, triggerFunction: Function);
    matches(commandText: string): boolean;
    run(msg: any, client: any): any;
}
