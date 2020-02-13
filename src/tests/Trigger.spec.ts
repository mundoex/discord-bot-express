import "jasmine";
import {Trigger} from "../Trigger";
import {TriggerBuilder} from "../TriggerBuilder";

describe(">Trigger Tests", function() {
    var runFunc=(msg:any,client:any)=>{return msg};
    var trigger1=new Trigger(TriggerBuilder.StartsWith("ola"),runFunc);
    var commandCall1="ola mundo";
    var commandCall2="mundo ola";

    it("Should be able to check if trigger was created",function() {
        expect(trigger1).toBeDefined();
        expect(trigger1).toBeInstanceOf(Trigger);
    });

    it("Should be able to check if matches a commandCall",function() {
        expect(trigger1.matches(commandCall1)).toBe(true);
        expect(trigger1.matches(commandCall2)).toBe(false);
    });

    it("Should be able to check if runFunction Works",function() {
        expect(trigger1.run("msg","")).toEqual("msg");
    });

});