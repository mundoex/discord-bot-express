import { Command } from "./Command";
import { Trigger } from "./Trigger";
import { MiddlewareHandler } from "./middlewares/MiddlewareHandler";
import {replaceSpacesWithSlashes} from "./utils";
class CommandManager{
    commandsList:Array<Command>;
    triggersList:Array<Trigger>;
    middlewareHandler:MiddlewareHandler;
    triggerRate:number;
    prefix:string;
    
    constructor(){
        this.commandsList=new Array<Command>();
        this.triggersList=new Array<Trigger>();
        this.triggerRate=100;
        this.prefix="";
        this.middlewareHandler=new MiddlewareHandler();
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

    use(middlewareFunction:Function){
        this.middlewareHandler.use(middlewareFunction);
    }

    checkForMatches(msg:any,client:any,tokens:Array<string>){
        //check for commands
        const slashedMsgContent=replaceSpacesWithSlashes(msg.content);
        for(let i=0;i<this.commandsList.length;i++){
            if(this.commandsList[i].matches(msg, slashedMsgContent)){
                return this.commandsList[i].run(msg,client,tokens);
            }
        }
        //check for triggers
        if(this.shouldTrigger()){
            for(let j=0;j<this.triggersList.length;j++){
                if(this.triggersList[j].matches(msg, msg.content)){
                    return this.triggersList[j].run(msg,client,tokens);
                }
            }
        }
    }

    /*
    create variable without prefix
    create variable with the message split into tokens so each middleware call doesnt have to tokenize the message
    */
    handleMessage(msg:any, client:any){
        const tokens=msg.content.split(" ");
        return this.middlewareHandler.handle(msg,client,tokens,
            (msgFromMiddleware:any,clientFromMiddleware:any,params:any)=>{  
                return this.checkForMatches(msgFromMiddleware,clientFromMiddleware,params);
            });
    }

    command(commandString:string, ...middlewares:Array<Function>) : Command {
        const slashedCommandString=replaceSpacesWithSlashes(this.prefix+commandString);
        let newLength=this.commandsList.push(new Command(slashedCommandString, middlewares));
        return this.commandsList[newLength-1];
    }

    trigger(triggerMatchingFunction:Function, ...middlewares:Array<Function>) : Trigger {
        let newLength=this.triggersList.push(new Trigger(triggerMatchingFunction, middlewares));
        return this.triggersList[newLength-1];
    }

    shouldTrigger() : boolean{
        return this.triggerRate<=randomBetween(0,100);
    }

    hasPrefix(){
        return this.prefix!=="";
    }

    parseMessage(commandText:string) : string{
        return this.removePrefixFromMessage(commandText);
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