import {match, MatchFunction} from "path-to-regexp";
import { AbstractCommand } from "./AbstractCommand";

export class Command extends AbstractCommand{
    commandString:string;
    params:any;

    constructor(commandString:string, commandFunction:Function){
        super(commandFunction);
        this.commandString=commandString;
        this.params=undefined;
    }

    matches(commandText:string){
        const matchFunction:MatchFunction = match(this.commandString);
        let result=matchFunction(commandText);
        result!==false ? this.params=result.params : this.params=undefined;
        return this.params!==undefined;
    }

    run(msg:any, client:any){
        return this.runFunction(msg, client, this.params);
    }
}