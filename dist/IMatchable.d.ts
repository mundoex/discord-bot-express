export interface IMatchable {
    matches(parsedCommandText: string): boolean;
}
