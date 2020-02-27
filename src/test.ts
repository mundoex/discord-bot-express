import { CommandInterpreter } from "./command-manager/CommandInterpreter";

var cmdString="8ball shake :times";
var text="8ball shake";
var params=CommandInterpreter.interprete(cmdString,text);
console.log("Test1",params);

var cmdString="8ball shake again";
var text="8ball shake";
var params=CommandInterpreter.interprete(cmdString,text);
console.log("Test2",params);
