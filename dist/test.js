"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandInterpreter_1 = require("./command-manager/CommandInterpreter");
var cmdString = "8ball shake ?times";
var text = "8ball shake 3";
var params = CommandInterpreter_1.CommandInterpreter.interprete(cmdString, text);
console.log(params);
