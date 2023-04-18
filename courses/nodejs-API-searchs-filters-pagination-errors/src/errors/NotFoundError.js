import ErrorBase from "./ErrorBase.js";

class NotFoundError extends ErrorBase {
    constructor(message = "Page not found") {
        super(message, 404);
    }
}

export default NotFoundError;