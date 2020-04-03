import { Command } from "./Command";
import { Trigger } from "./Trigger";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";
declare class CommandManager {
    commandsList: Array<Command>;
    triggersList: Array<Trigger>;
    middlewareHandler: MiddlewareHandler;
    triggerRate: number;
    prefix: string;
    constructor();
    setTriggerRate(newTriggerRate: number): void;
    setPrefix(newPrefix: string): void;
    use(middlewareFunction: Function): void;
    private checkForMatches;
    handleMessage(msg: any, client: any): void;
    command(commandString: string, ...middlewares: Array<Function>): Command;
    trigger(triggerMatchingFunction: Function, ...middlewares: Array<Function>): Trigger;
    shouldTrigger(): boolean;
    hasPrefix(): boolean;
    removePrefixFromMessage(commandText: string): string;
}
export declare const CommandManagerInstance: CommandManager;
export {};
