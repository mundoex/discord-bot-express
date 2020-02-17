export class BotMiddleware{

private static BAD_WORDS:Array<string>=["retarded","nigger","faggot","retard"];

    static NotABot(msg:any,client:any,params:any,next:Function){
        return !msg.author.bot ? next() : undefined;
    }

    static LanguageFilter(msg:any,client:any,params:any,next:Function){
        const found = params.some((word:string)=> BotMiddleware.BAD_WORDS.indexOf(word.toLowerCase()) >= 0);
        return found ? next() : msg.channel.send(`Bad word said by: ${msg.author.username}`)
    }
}