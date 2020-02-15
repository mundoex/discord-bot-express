var arg:string=":";
var args:string=":*"
var opt:string="?";
function matchFunction(commandText:string,delimitter:string=" ") {
    var stash:string;
    var currentChar:string;
    var arr:Array<string>;
    for(var i:number=0;i<commandText.length;i++){
        currentChar=commandText.charAt(i);
        switch(currentChar){
            case(delimitter):
                arr.push(stash);
                stash="";
                break;
            case(arg):

            break;
            case(args):
            break;
            case(opt):
            break;
            default:
                stash+=currentChar;
                break;
        }

    }
}

/*
COMMAND: ball shake ?times ## INPUT: ball shake 2
COMMAND: who right :op1 ou :op2 ? ## INPUT: who right david ou miguel ?
COMMAND: pick one *array ## INPUT: pick one banana laranja uvas ananas
*/