import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
    constructor(error) {
        const errorMessage = Object.values(error.errors)
            .map(error => error.message)
            .join("; ");

        super(`the following errors are found: ${errorMessage}`, 400);
    }
}

export default ValidationError;