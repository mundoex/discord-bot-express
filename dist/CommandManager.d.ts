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
    checkForMatches(msg: any, client: any, tokens: Array<string>): any;
    handleMessage(msg: any, client: any): void;
    command(commandString: string, ...middlewares: Array<Function>): Command;
    trigger(triggerMatchingFunction: Function, ...middlewares: Array<Function>): Trigger;
    shouldTrigger(): boolean;
    hasPrefix(): boolean;
    parseMessage(commandText: string): string;
    removePrefixFromMessage(commandText: string): string;
    addDefaultHelper(): void;
    addListAll(): void;
    commandAlreadyExists(): boolean;
    generateCommandListFile(): void;
}
export declare const CommandManagerInstance: CommandManager;
export {};
