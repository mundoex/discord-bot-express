export declare class Middleware {
    middlewares: Array<Function>;
    constructor();
    use(fn: Function): void;
    executeMiddleware(middlewares: Array<Function>, data: any, next: Function): void;
    run(data: any): void;
}
