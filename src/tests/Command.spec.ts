import "jasmine";
import {Command} from "../Command";
import {CommandBuilder} from "../CommandBuilder";

describe(">Command Tests", function() {
    var runFunc=(msg:any,client:any,params:any)=>{return params};
    var command1=new Command(`quem tem razao ${CommandBuilder.Arg("option1")} ou ${CommandBuilder.Arg("option2")} ?`,runFunc);
    var commandCall="quem tem razao david ou laranjeira ?";

    it("Should be able to check if command was created",function() {
        expect(command1).toBeDefined();
    });

    it("Should be able to check if matches a commandCall",function() {
        expect(command1.matches(commandCall)).toBe(true);
    });

    it("Should be able to check if params exist",function() {
        command1.matches(commandCall);
        expect(command1.params.option1).toBeDefined();
        expect(command1.params.option2).toBeDefined();
    });

    it("Should be able to check if params are right",function() {
        command1.matches(commandCall);
        expect(command1.params.option1).toEqual("david");
        expect(command1.params.option2).toEqual("laranjeira");
    });

    it("Should be able to check if runFunction Works",function() {
        command1.matches(commandCall);
        expect(command1.run("msg","client")).toEqual(command1.params);
    });

});