export class BotMiddleware{

private static BAD_WORDS:Array<string>=["retarded","nigger","faggot","retard"];

    static NotABot(msg:any,client:any,params:any,next:Function){
        return !msg.author.bot ? next() : undefined;
    }
}