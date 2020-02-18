import "jasmine";
import {Trigger} from "../Trigger";
import {TriggerBuilder} from "../TriggerBuilder";
describe(">Trigger Tests", function() {
    var runFunc=(msg:any,client:any,params:any)=>{return msg};

    it("Trigger Starts With",function() {
        let triggerStartsWith=new Trigger(TriggerBuilder.StartsWith("hello"),[runFunc]);
        let messageTrue="hello world";
        let messageFalse="world hello";
        expect(triggerStartsWith).toBeDefined();
        expect(triggerStartsWith).toBeInstanceOf(Trigger);
        expect(triggerStartsWith.matches(messageTrue)).toBeTrue();
        expect(triggerStartsWith.matches(messageFalse)).toBeFalse();
    });

    it("Trigger Ends With",function() {
        let triggerEndsWith=new Trigger(TriggerBuilder.EndsWith("hello"),[runFunc]);
        let messageTrue="world hello";
        let messageFalse="world hello qwe";
        expect(triggerEndsWith).toBeDefined();
        expect(triggerEndsWith).toBeInstanceOf(Trigger);
        expect(triggerEndsWith.matches(messageTrue)).toBeTrue();
        expect(triggerEndsWith.matches(messageFalse)).toBeFalse();
    });

    it("Trigger Includes",function() {
        let triggerIncludes=new Trigger(TriggerBuilder.Includes("hello"),[runFunc]);
        let messageTrue="world hello";
        let messageFalse="world generate hi";
        expect(triggerIncludes).toBeDefined();
        expect(triggerIncludes).toBeInstanceOf(Trigger);
        expect(triggerIncludes.matches(messageTrue)).toBeTrue();
        expect(triggerIncludes.matches(messageFalse)).toBeFalse();
    });

    it("Trigger Regex",function() {
        let triggerRegex=new Trigger(TriggerBuilder.Regex(new RegExp("^Ameno")),[runFunc]);
        let messageTrue="AmenoLol";
        let messageFalse="LOLAmeno";
        expect(triggerRegex).toBeDefined();
        expect(triggerRegex).toBeInstanceOf(Trigger);
        expect(triggerRegex.matches(messageTrue)).toBeTrue();
        expect(triggerRegex.matches(messageFalse)).toBeFalse();
    });

    it("Trigger Match",function() {
        let triggerMatches=new Trigger(TriggerBuilder.Matches("hello world"),[runFunc]);
        let messageTrue="hello world";
        let messageFalse="hello world 2";
        expect(triggerMatches).toBeDefined();
        expect(triggerMatches).toBeInstanceOf(Trigger);
        expect(triggerMatches.matches(messageTrue)).toBeTrue();
        expect(triggerMatches.matches(messageFalse)).toBeFalse();
    });

    it("Trigger Custom",function() {
        let myFunc=(commandText:string)=>{
            return commandText.endsWith("world") && commandText.startsWith("hello");
        }
        let triggerCustom=new Trigger(myFunc,[runFunc]);
        let messageTrue="hello world";
        let messageFalse="hello world 2";
        expect(triggerCustom).toBeDefined();
        expect(triggerCustom).toBeInstanceOf(Trigger);
        expect(triggerCustom.matches(messageTrue)).toBeTrue();
        expect(triggerCustom.matches(messageFalse)).toBeFalse();
    });



});