import {match, MatchFunction} from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";
import { replaceSpacesWithSlashes } from "./utils";

export class Command extends AbstractCommand{
    commandString:string;
    matchFunction:MatchFunction;
    params:any;

    constructor(commandString:string, commandFunction:Function){
        super(commandFunction);
        needsReplace(commandString) ? this.commandString=replaceSpacesWithSlashes(commandString) : this.commandString=commandString;
        this.matchFunction=match(this.commandString);
        this.params=undefined;
    }

    matches(commandText:string){
        let result=this.matchFunction(commandText);
        result!==false ? this.params=result.params : this.params=undefined;
        return this.params!==undefined;
    }

    run(msg:any, client:any){
        return this.runFunction(msg, client, this.params);
    }
}

function needsReplace(commandText:string) {
    return commandText.includes(" ");
}