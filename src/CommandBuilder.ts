import {replaceSpacesWithSlashes} from "./utils";

export class CommandBuilder{
    static Arg(argName:string) : string{
        return `:${argName}`
    }

    static Args(argsName:string) : string{
        return `:${argsName}(.*)`
    }

    static Optional(optName:string) : string{
        return `:${optName}?`;
    }

} 

export function Build(commandText:string) : string{
    return replaceSpacesWithSlashes(commandText);
}