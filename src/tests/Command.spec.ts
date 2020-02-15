import "jasmine";
import {Command} from "../Command";
import {CommandBuilder} from "../CommandBuilder";
import {replaceSpacesWithSlashes} from "../utils";

describe(">Command Tests", function() {
    var runFunc=(msg:any,client:any,params:any)=>{return params};
    //command functions
    it("Should check if a command string gets parsed",function() {
        var cmd=new Command(`ball shake ${CommandBuilder.Optional("times")}`,runFunc);
        expect(cmd).toBeDefined();
        expect(cmd.commandString).toEqual("ball/shake/:times?")
    });

    //Example commands
    it("Should check if a command with optional works",function() {
        var cmd=new Command(`ball shake ${CommandBuilder.Optional("times")}`,runFunc);
        var cmdTextWithOption=replaceSpacesWithSlashes("ball shake 2");
        var cmdTextWithoutOption=replaceSpacesWithSlashes("ball shake");
        expect(cmd).toBeDefined();
        expect(cmd.matches(cmdTextWithOption)).toBeTrue();
        expect(cmd.matches(cmdTextWithoutOption)).toBeTrue();
    });

    it("Should check if a command with arg works",function() {
        var cmd=new Command(`quem tem razao ${CommandBuilder.Arg("option1")} ou ${CommandBuilder.Arg("option2")} \%3F`,runFunc);
        var cmdText1=replaceSpacesWithSlashes("quem tem razao david ou laranjeira ?");
        var cmdText2=replaceSpacesWithSlashes("quem tem razao david ou ?");
        expect(cmd).toBeDefined();
        expect(cmd.matches(cmdText1)).toBeTrue();
        expect(cmd.matches(cmdText2)).toBeFalse();
    });

    it("Should check if a command with args works",function() {
        var cmd=new Command(`pikachu ${CommandBuilder.Args("messages")}`,runFunc);
        var cmdText1=replaceSpacesWithSlashes("pikachu pickaxe axe");
        var cmdText2=replaceSpacesWithSlashes("pikachu axe");
        expect(cmd).toBeDefined();
        expect(cmd.matches(cmdText1)).toBeTrue();
        expect(cmd.matches(cmdText2)).toBeTrue();
    });

});