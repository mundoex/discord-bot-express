import { CommandWord } from "./CommandWord";
export declare class CommandInterpreter {
    static DELIMITTER: string;
    static interprete(commandString: string, text: string): any;
    static handle(tokens: Array<string>, stack: Array<CommandWord>, params: any): any;
    static generateParams(cmdWords: Array<CommandWord>): any;
    private static handleWord;
    private static handleArg;
    private static handleArgs;
    private static handleOpt;
    private static handleOpts;
}
