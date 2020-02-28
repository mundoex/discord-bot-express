export class CommandBuilder{
    static Arg(argName:string) : string{
        return `:${argName}`
    }

    static Args(argsName:string) : string{
        return `:${argsName}*`
    }

    static Optional(optName:string) : string{
        return `?${optName}`;
    }

    static Optionals(optName:string) : string{
        return `?${optName}*`;
    }

}