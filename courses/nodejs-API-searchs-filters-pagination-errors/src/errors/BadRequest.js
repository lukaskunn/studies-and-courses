import ErrorBase from "./ErrorBase.js";

class BadRequest extends ErrorBase {
    constructor(message = "One or more params are incorrect") {
        super(message, 400);
    }
}

export default BadRequest;