export declare class MiddlewareHandler {
    stack: Array<Function>;
    constructor();
    use(fn: Function): void;
    handle(msg: any, client: any, params: any, callback: Function): void;
}
