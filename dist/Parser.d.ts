export declare enum WordType {
    Arg = 0,
    Args = 1,
    Opt = 2,
    Opts = 3,
    Word = 4
}
export declare class CommandWord {
    type: WordType;
    word: string;
    private static readonly ARG_PREFIX;
    private static readonly OPT_PREFIX;
    private static readonly MULTI_SUFFIX;
    constructor(word: string, type: WordType);
    private static stringToCommandWord;
    static generateCommandWords(commandTokens: Array<string>): Array<CommandWord>;
}
export declare class CommandInterpreter {
    static interprete(): void;
    static handle(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any | boolean;
    static generateParams(cmdWords: Array<CommandWord>): any;
    static handleWord(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any;
    static handleArg(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any;
    static handleArgs(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any;
    static handleOpt(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any;
    static handleOpts(tokens: Array<string>, cmdWords: Array<CommandWord>, params: any): any;
}
