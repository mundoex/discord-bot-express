import "jasmine";
import {CommandInterpreter} from "../command-manager/CommandInterpreter";
describe(">CommandInterpreter Tests", function() {

    it("CommandInterpreter 1",function() {
        var cmdString="voice say :text";
        var text="voice say hello";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.text).toEqual("hello");
    });

    it("CommandInterpreter 2",function() {
        var cmdString="voice say hello";
        var text="voice say hello";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
    });

    it("CommandInterpreter 3",function() {
        var cmdString="8ball shake ?times";
        var text="8ball shake 3";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.times).toEqual("3");
    });

    it("CommandInterpreter 4",function() {
        var cmdString="rodrigo music :command :youtubeLink";
        var text="rodrigo music play www.youtube.com";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.command).toEqual("play");
        expect(params.youtubeLink).toEqual("www.youtube.com");
    });

    it("CommandInterpreter 5",function() {
        var cmdString="rodrigo vote my name jeff? :options*";
        var text="rodrigo vote my name jeff? yes no";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.options[0]).toEqual("yes");
        expect(params.options[1]).toEqual("no");
    });

    it("CommandInterpreter 6",function() {
        var cmdString="8ball shake ?times";
        var text="8ball shake";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.times).toBeUndefined();
    });

    it("CommandInterpreter 7",function() {
        var cmdString="8ball pick ?times*";
        var text="8ball pick a b c d";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.times[0]).toEqual("a");
        expect(params.times[1]).toEqual("b");
        expect(params.times[2]).toEqual("c");
        expect(params.times[3]).toEqual("d");
    });

    it("CommandInterpreter 8",function() {
        var cmdString="8ball shake *times";
        var text="8ball shake";
        var params=CommandInterpreter.interprete(cmdString,text);
        expect(params).toBeDefined();
        expect(params.shake).toBeUndefined();

    });
});