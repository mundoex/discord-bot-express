"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Middleware {
    constructor() {
        this.middlewares = [];
    }
    use(fn) {
        this.middlewares.push(fn);
    }
    executeMiddleware(middlewares, data, next) {
        const composition = middlewares.reduceRight((next, fn) => {
            // collect next data
            fn(data, next);
        }, next);
        composition(data);
    }
    run(data) {
        this.executeMiddleware(this.middlewares, data, (info, next) => {
            console.log(data);
        });
    }
}
exports.Middleware = Middleware;
