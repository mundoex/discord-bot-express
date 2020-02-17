export class Middleware {
    middlewares:Array<Function>;

    constructor() {
        this.middlewares = [];
    }

    use(fn:Function) {
        this.middlewares.push(fn);
    }

    executeMiddleware(middlewares:Array<Function>, data:any, next:Function) {
        const composition = middlewares.reduceRight((next:any, fn:Function) => {
            // collect next data
            fn(data, next)
        }, next);       
        composition(data);
    }

    run(data:any) {
        this.executeMiddleware(this.middlewares, data, (info:any, next:any) => {
            console.log(data);
        });
    }
}
