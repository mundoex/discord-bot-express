export class BotMiddleware{
    static NotABot(msg:any,client:any,params:any,next:Function){
        return !msg.author.bot ? next() : undefined;
    }
}