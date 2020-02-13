export class TriggerBuilder{
    static StartsWith(word:string) : Function{
        return (commandText:string) : boolean => { return commandText.startsWith(word);};
    }

    static EndsWith(word:string) : Function{
        return (commandText:string) : boolean => { return commandText.endsWith(word);};
    }

    static Includes(word:string) : Function{
        return (commandText:string) : boolean => { return commandText.includes(word);};
    }

    static Regex(regex:RegExp) : Function{
        return (commandText:string) : boolean => { return commandText.match(regex)!==null;};
    }

    static Matches(word:string) : Function{
        return (commandText:string)=>{return word===commandText;}
    }
}