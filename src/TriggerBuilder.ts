export class TriggerBuilder{
    static StartsWith(word:string) : Function{
        return new RegExp(`^${word}`).test;
    }

    static EndsWith(word:string) : Function{
        return new RegExp(`${word}$`).test;
    }

    static Includes(word:string) : Function{
        return new RegExp('\\b' + word + '\\b').test;
    }

    static Regex(regex:RegExp) : Function{
        return regex.test;
    }

    static Matches(word:string) : Function{
        return (commandText:string)=>{return word===commandText;}
    }
}