import { Command } from "./Command";
import { Trigger } from "./Trigger";
declare class CommandManager {
    commandsList: Array<Command>;
    triggersList: Array<Trigger>;
    triggerRate: number;
    prefix: string;
    constructor();
    setTriggerRate(newTriggerRate: number): void;
    setPrefix(newPrefix: string): void;
    handleMessage(msg: any, client: any, next: any): any;
    command(commandString: string, ...middlewares: any): Command;
    trigger(triggerMatchingFunction: Function, triggerFunction: Function): Trigger;
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
