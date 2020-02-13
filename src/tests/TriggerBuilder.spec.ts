import "jasmine";
import {TriggerBuilder} from "../TriggerBuilder";

describe(">TriggerBuilder Tests", function() {
    var token="ola";
    var testString1="ola mundo";
    var testString2="mundo ola";
    var testString3="mundo qwe";

    it("Should be able to check if string starts with",function() {
        expect(TriggerBuilder.StartsWith).toBeDefined();
        expect(TriggerBuilder.StartsWith(token)(testString1)).toBe(true);
        expect(TriggerBuilder.StartsWith(token)(testString2)).toBe(false);
    });

    it("Should be able to check if string ends with",function() {
        expect(TriggerBuilder.EndsWith).toBeDefined();
        expect(TriggerBuilder.EndsWith(token)(testString1)).toBe(false);
        expect(TriggerBuilder.EndsWith(token)(testString2)).toBe(true);
    });

    it("Should be able to check if string includes",function() {
        expect(TriggerBuilder.Includes).toBeDefined();
        expect(TriggerBuilder.Includes(token)(testString1)).toBe(true);
        expect(TriggerBuilder.Includes(token)(testString3)).toBe(false);
    });

    it("Should be able to check if string regex matches",function() {
        var regex=new RegExp("ola|qwe");
        expect(regex).toBeDefined();
        expect(regex).toBeInstanceOf(RegExp);
        var func=TriggerBuilder.Regex(regex);
        expect(func).toBeDefined();
        expect(func).toBeInstanceOf(Function);
        expect(regex.test(testString1)).toBe(true);
        expect(func(testString1)).toBe(true);
    });

    it("Should be able to check if string matches",function() {
        expect(TriggerBuilder.Matches).toBeDefined();
        expect(TriggerBuilder.Matches(testString1)(testString1)).toBe(true);
        expect(TriggerBuilder.Matches(testString1)(testString3)).toBe(false);
    });

});