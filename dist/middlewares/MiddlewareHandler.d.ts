export declare class MiddlewareHandler {
    stack: Array<Function>;
    constructor();
    use(middlewareFunction: Function): void;
    handle(msg: any, client: any, params: any, callback: Function): void;
}
