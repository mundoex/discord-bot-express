"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Trigger_1 = require("./Trigger");
const MiddlewareHandler_1 = require("./MiddlewareHandler");
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
    use(fn) {
        this.middlewareHandler.use(fn);
    }
    checkForMatches(msg, client, parsedMessage, tokens) {
        //check for commands
        for (let i = 0; i < this.commandsList.length; i++) {
            if (this.commandsList[i].matches(msg, parsedMessage)) {
                return this.commandsList[i].run(msg, client, tokens);
            }
        }
        //check for triggers
        if (this.shouldTrigger()) {
            for (let j = 0; j < this.triggersList.length; j++) {
                if (this.triggersList[j].matches(msg, parsedMessage)) {
                    return this.triggersList[j].run(msg, client);
                }
            }
        }
    }
    /*
    If message as prefix
    create variable without prefix
    create variable with the message split into tokens so each middleware call doesnt have to tokenize the message
    */
    handleMessage(msg, client) {
        const parsedMessage = this.parseMessage(msg.content);
        const tokens = parsedMessage.split(" ");
        return this.middlewareHandler.handle(msg, client, tokens, (msgFromMiddleware, clientFromMiddleware, params) => {
            return this.checkForMatches(msgFromMiddleware, clientFromMiddleware, parsedMessage, params);
        });
    }
    command(commandString, ...middlewares) {
        let newLength = this.commandsList.push(new Command_1.Command(commandString, middlewares));
        return this.commandsList[newLength - 1];
    }
    trigger(triggerMatchingFunction, triggerFunction) {
        let newLength = this.triggersList.push(new Trigger_1.Trigger(triggerMatchingFunction, triggerFunction));
        return this.triggersList[newLength - 1];
    }
    shouldTrigger() {
        return this.triggerRate <= randomBetween(0, 100);
    }
    hasPrefix() {
        return this.prefix !== "";
    }
    parseMessage(commandText) {
        return this.removePrefixFromMessage(commandText);
    }
    removePrefixFromMessage(commandText) {
        return this.hasPrefix() ? commandText.replace(this.prefix, "") : commandText;
    }
    addDefaultHelper() {
    }
    addListAll() {
    }
    commandAlreadyExists() {
        return true;
    }
    generateCommandListFile() { }
}
function randomBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}
exports.CommandManagerInstance = new CommandManager();
