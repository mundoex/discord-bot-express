"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Trigger_1 = require("./Trigger");
const MiddlewareHandler_1 = require("./middlewares/MiddlewareHandler");
const utils_1 = require("./utils");
class CommandManager {
    constructor() {
        this.commandsList = new Array();
        this.triggersList = new Array();
        this.triggerRate = 100;
        this.prefix = "";
        this.middlewareHandler = new MiddlewareHandler_1.MiddlewareHandler();
    }
    setTriggerRate(newTriggerRate) {
        if (newTriggerRate > 100) {
            this.triggerRate = 100;
        }
        else if (newTriggerRate < 0) {
            this.triggerRate = 0;
        }
        else {
            this.triggerRate = newTriggerRate;
        }
    }
    setPrefix(newPrefix) {
        newPrefix === undefined || this.prefix === null ? this.prefix = "" : this.prefix = newPrefix;
    }
    use(middlewareFunction) {
        this.middlewareHandler.use(middlewareFunction);
    }
    checkForMatches(msg, client, tokens) {
        //check for commands if there is prefix
        if (msg.content.startsWith(this.prefix)) {
            msg.content = msg.content.replace(this.prefix, "");
            for (let i = 0; i < this.commandsList.length; i++) {
                if (this.commandsList[i].matches(msg.content)) {
                    return this.commandsList[i].run(msg, client, tokens);
                }
            }
        }
        //check triggers
        if (this.shouldTrigger()) {
            for (let j = 0; j < this.triggersList.length; j++) {
                if (this.triggersList[j].matches(msg.content)) {
                    this.triggersList[j].run(msg, client, tokens);
                }
            }
        }
    }
    /*
    create variable with the message split into tokens so each middleware call doesnt have to tokenize the message
    */
    handleMessage(msg, client) {
        const tokens = msg.content.split(" ");
        return this.middlewareHandler.handle(msg, client, tokens, (msgFromMiddleware, clientFromMiddleware, params) => {
            return this.checkForMatches(msgFromMiddleware, clientFromMiddleware, params);
        });
    }
    command(commandString, ...middlewares) {
        let newLength = this.commandsList.push(new Command_1.Command(commandString, middlewares));
        return this.commandsList[newLength - 1];
    }
    trigger(triggerMatchingFunction, ...middlewares) {
        let newLength = this.triggersList.push(new Trigger_1.Trigger(triggerMatchingFunction, middlewares));
        return this.triggersList[newLength - 1];
    }
    shouldTrigger() {
        return this.triggerRate >= utils_1.randomBetween(0, 100);
    }
    hasPrefix() {
        return this.prefix !== "";
    }
    removePrefixFromMessage(commandText) {
        return this.hasPrefix() ? commandText.replace(this.prefix, "") : commandText;
    }
}
exports.CommandManagerInstance = new CommandManager();
