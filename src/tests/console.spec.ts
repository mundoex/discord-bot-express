import {Command} from "../Command";
import {CommandBuilder} from "../CommandBuilder";
import {match, MatchFunction} from "path-to-regexp";
var cmd=new Command(`quem tem razao ${CommandBuilder.Arg("option1")} ou ${CommandBuilder.Arg("option2")} %3F`,undefined);
//console.log(cmd.commandString);

var q:MatchFunction=match("quem/tem/razao/:option1/ou/:option2/%3F",{encode:encodeURI});
console.log(q("quem/tem/razao/david/ou/laranjeira/?"));