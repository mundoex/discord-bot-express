"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotMiddleware {
    static NotABot(msg, client, params, next) {
        return !msg.author.bot ? next() : undefined;
    }
    static LanguageFilter(msg, client, params, next) {
        const found = params.some((word) => BotMiddleware.BAD_WORDS.indexOf(word.toLowerCase()) >= 0);
        return found ? next() : msg.channel.send(`Bad word said by: ${msg.author.username}`);
    }
}
exports.BotMiddleware = BotMiddleware;
BotMiddleware.BAD_WORDS = ["retarded", "nigger", "faggot", "retard"];
