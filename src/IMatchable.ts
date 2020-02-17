export interface IMatchable{
    matches(msg:any,parsedCommandText:string) : boolean;
}