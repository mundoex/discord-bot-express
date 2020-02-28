import "jasmine";
import {Command} from "../Command";
describe(">Command Tests", function() {
    var runFunc=(msg:any,client:any,params:any)=>{return msg};

    it("Command Nothing",function() {
        let commandNothing=new Command("hello world",[runFunc]);
        let messageTrue="hello world";
        let messageFalse="world hello";
        expect(commandNothing).toBeDefined();
        expect(commandNothing).toBeInstanceOf(Command);
        expect(commandNothing.matches(messageTrue)).toBeTrue();
        //expect(commandNothing.matches(messageFalse)).toBeFalse();
    });

    it("Command Arg",function() {
        let commandArg=new Command("value of :coin",[runFunc]);
        let messageTrue="value of euro";
        let messageFalse="value of";
        expect(commandArg).toBeDefined();
        expect(commandArg).toBeInstanceOf(Command);
        //expect(commandArg.matches(messageFalse)).toBeFalse();
        expect(commandArg.matches(messageTrue)).toBeTrue();
        expect(commandArg.params.coin).toEqual("euro");
    });

    it("Command Args",function() {
        let commandArgs=new Command("pick :option1 :option2",[runFunc]);
        let messageTrue="pick euro dollar";
        let messageFalse="pick euro";
        expect(commandArgs).toBeDefined();
        expect(commandArgs).toBeInstanceOf(Command);
        //expect(commandArgs.matches(messageFalse)).toBeFalse();
        expect(commandArgs.matches(messageTrue)).toBeTrue();
        expect(commandArgs.params.option1).toEqual("euro");
        expect(commandArgs.params.option2).toEqual("dollar");
    });

    it("Command Optional",function() {
        let commandOpt=new Command("drive ?velocity",[runFunc]);
        let messageTrue="drive";
        let messageFalse="dont drive";
        let messageTrue2="drive fastAF";
        expect(commandOpt).toBeDefined();
        expect(commandOpt).toBeInstanceOf(Command);
        expect(commandOpt.matches(messageTrue)).toBeTrue();
        expect(commandOpt.matches(messageFalse)).toBeFalse();
        expect(commandOpt.matches(messageTrue2)).toBeTrue();
        expect(commandOpt.params.velocity).toEqual("fastAF");
    });
});