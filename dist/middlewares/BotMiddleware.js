"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotMiddleware = void 0;
class BotMiddleware {
    static NotABot(msg, client, params, next) {
        return !msg.author.bot ? next() : undefined;
    }
}
exports.BotMiddleware = BotMiddleware;
