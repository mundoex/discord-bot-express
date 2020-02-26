import { CommandInterpreter } from "./command-manager/CommandInterpreter";

var cmdString="8ball shake ?times";
var text="8ball shake 3";
var params=CommandInterpreter.interprete(cmdString,text);
console.log(params);
