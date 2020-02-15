import { Command } from "./Command";
import { Trigger } from "./Trigger";
import { replaceSpacesWithSlashes } from "./utils";

class CommandManager{
    commandsList:Array<Command>;
    triggersList:Array<Trigger>;
    triggerRate:number;
    prefix:string;
    
    constructor(){
        this.commandsList=new Array<Command>();
        this.triggersList=new Array<Trigger>();
        this.triggerRate=100;
        this.prefix="";
    }

    setTriggerRate(newTriggerRate:number) : void {
        if(newTriggerRate>100){
            this.triggerRate=100;
        }else if(newTriggerRate<0){
            this.triggerRate=0;
        }else{
            this.triggerRate=newTriggerRate;
        }
    }

    setPrefix(newPrefix:string) : void {
        newPrefix===undefined || this.prefix===null ? this.prefix="" : this.prefix=newPrefix;
    }

    handleMessage(msg:any, client:any){
        //check for commands
        const parsedMessage=this.parseMessage(msg.content);
        for(let i=0;i<this.commandsList.length;i++){
            if(this.commandsList[i].matches(parsedMessage)){
                return this.commandsList[i].run(msg,client);
            }
        }
        //check for triggers
        if(this.shouldTrigger()){
            for(let j=0;j<this.triggersList.length;j++){
                if(this.triggersList[j].matches(parsedMessage)){
                    return this.triggersList[j].run(msg,client);
                }
            }
        }
    }

    command(commandString:string, commandFunction:Function){
        this.commandsList.push(new Command(commandString, commandFunction));
    }

    trigger(triggerMatchingFunction:Function, triggerFunction:Function){
        this.triggersList.push(new Trigger(triggerMatchingFunction, triggerFunction));
    }

    shouldTrigger() : boolean{
        return this.triggerRate<=randomBetween(0,100);
    }

    hasPrefix(){
        return this.prefix!=="";
    }

    parseMessage(commandText:string) : string{
        return replaceSpacesWithSlashes(this.removePrefixFromMessage(commandText));
    }

    removePrefixFromMessage(commandText:string){
        return this.hasPrefix() ? commandText.replace(this.prefix,"") : commandText;
    }

    addDefaultHelper(){

    }

    addListAll(){
        
    }

    commandAlreadyExists(){
        return true;
    }

    generateCommandListFile(){}

    

}

function randomBetween(min:number, max:number){
    return Math.floor(Math.random() * max) + min;
}

export const CommandManagerInstance = new CommandManager();