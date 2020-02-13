"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Trigger_1 = require("./Trigger");
class CommandManager {
    constructor() {
        this.commandsList = new Array();
        this.triggersList = new Array();
        this.triggerRate = 100;
        this.prefix = "";
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
    handleMessage(msg, client) {
        //check for commands
        for (let i = 0; i < this.commandsList.length; i++) {
            if (this.commandsList[i].matches(msg.content)) {
                return this.commandsList[i].run(msg, client);
            }
        }
        //check for triggers
        if (this.shouldTrigger()) {
            const parsedMessageContent = this.parseMessageContent(msg.content);
            for (let j = 0; j < this.triggersList.length; j++) {
                if (this.triggersList[j].matches(parsedMessageContent)) {
                    return this.triggersList[j].run(msg, client);
                }
            }
        }
    }
    command(commandString, commandFunction) {
        this.commandsList.push(new Command_1.Command(this.prefix + commandString, commandFunction));
    }
    trigger(triggerMatchingFunction, triggerFunction) {
        this.triggersList.push(new Trigger_1.Trigger(triggerMatchingFunction, triggerFunction));
    }
    shouldTrigger() {
        return this.triggerRate <= randomBetween(0, 100);
    }
    parseMessageContent(commandText) {
        return this.prefix !== "" ? commandText.replace(this.prefix, "") : commandText;
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