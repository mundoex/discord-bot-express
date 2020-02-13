import "jasmine";
import {CommandBuilder} from "../CommandBuilder";

describe(">CommandBuilder Tests", function() {
    it("Should be able to check if string is arg",function() {
        expect(CommandBuilder.Arg).toBeDefined();
        expect(CommandBuilder.Arg("token")).toEqual(":token");
    });

    it("Should be able to check if string is args",function() {
        expect(CommandBuilder.Args).toBeDefined();
        expect(CommandBuilder.Args("token")).toEqual(":token(.*)");
    });

    it("Should be able to check if string is optional",function() {
        expect(CommandBuilder.Optional).toBeDefined();
        expect(CommandBuilder.Optional("token")).toEqual(":token?");
    });

});