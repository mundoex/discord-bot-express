import { WordType } from "./WordType";
export declare class CommandWord {
    type: WordType;
    word: string;
    private static readonly ARG_PREFIX;
    private static readonly OPT_PREFIX;
    private static readonly MULTI_SUFFIX;
    static DELIMITTER: string;
    constructor(word: string, type: WordType);
    private static stringToCommandWord;
    static generateCommandWords(commandTokens: Array<string>): Array<CommandWord>;
}
