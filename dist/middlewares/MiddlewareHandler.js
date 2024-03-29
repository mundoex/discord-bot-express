"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHandler = void 0;
class MiddlewareHandler {
    constructor() {
        this.stack = new Array();
    }
    use(middlewareFunction) {
        if (typeof middlewareFunction !== 'function')
            throw new Error('Middleware must be a function!');
        this.stack.push(middlewareFunction);
    }
    handle(msg, client, params, callback) {
        let idx = 0;
        const next = (err) => {
            // If an error occurred, bypass the rest of the pipeline. In Express,
            // you would still need to look for error handling middleware, but
            // this example does not support that.
            if (err != null) {
                return setImmediate(() => callback(err));
            }
            if (idx >= this.stack.length) {
                return setImmediate(() => callback(msg, client, params));
            }
            // Not the same as an internal Express layer, which is an object
            // wrapper around a middleware function. Using the same nomenclature
            // for consistency.
            const layer = this.stack[idx++];
            setImmediate(() => {
                try {
                    // Execute the layer and rely on it to call `next()`
                    layer(msg, client, params, next);
                }
                catch (error) {
                    next(error);
                }
            });
        };
        next();
    }
}
exports.MiddlewareHandler = MiddlewareHandler;
