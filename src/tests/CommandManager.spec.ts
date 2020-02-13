import "jasmine";
import {CommandManagerInstance as CommandManager} from "../CommandManager";

describe(">CommandManager Tests", function() {

    it("Should be able to check if command manager exists",function() {
        expect(CommandManager).toBeDefined();
    });

    it("Should be able to check if command manager prefix was set",function() {
        CommandManager.setPrefix(undefined);
        expect(CommandManager.prefix).toEqual("");
        CommandManager.setPrefix("Bot ");
        expect(CommandManager.prefix).toEqual("Bot ");
    });

    it("Should be able to check if command manager trigger rate was set",function() {
        CommandManager.setTriggerRate(101);
        expect(CommandManager.triggerRate).toEqual(100);
        CommandManager.setTriggerRate(-1);
        expect(CommandManager.triggerRate).toEqual(0);
        CommandManager.setTriggerRate(75);
        expect(CommandManager.triggerRate).toEqual(75);
    });

    it("Should be able to check if command manager removes prefix",function() {
        CommandManager.setPrefix("Bot ");
        var parsedMsgContent="ola mundo";
        var msg={content:CommandManager.prefix+"ola mundo"};
        expect(CommandManager.removePrefixFromMessage(msg.content)).toBe(parsedMsgContent);
    });
});