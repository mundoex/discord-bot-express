export declare class CommandBuilder {
    static Arg(argName: string): string;
    static Args(argsName: string): string;
    static Optional(optName: string): string;
}
export declare function Build(commandText: string): string;
