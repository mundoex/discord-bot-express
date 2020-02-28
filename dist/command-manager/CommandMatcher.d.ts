import { CommandWord } from "./CommandWord";
export declare class CommandMatcher {
    commandWords: Array<CommandWord>;
    params: any;
    constructor(commandString: string);
    match(text: string): any;
    initCommandWords(commandString: string): CommandWord[];
    generateParams(): any;
}
