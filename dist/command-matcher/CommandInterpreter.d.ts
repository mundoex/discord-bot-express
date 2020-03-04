export declare class CommandInterpreter {
    static DELIMITTER: string;
    static interprete(commandString: string, text: string): any;
    private static handle;
    private static generateParams;
    private static handleWord;
    private static handleArg;
    private static handleArgs;
    private static handleOpt;
    private static handleOpts;
}
