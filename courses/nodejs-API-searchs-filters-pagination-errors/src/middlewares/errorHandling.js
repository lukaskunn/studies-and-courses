import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";
import NotFoundError from "../errors/NotFoundError.js";

// eslint-disable-next-line no-unused-vars
function errorHandling(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
        new BadRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else if (error instanceof NotFoundError) {
        error.sendResponse(res);
    } else {
        new ErrorBase().sendResponse(res);
    }
}

export default errorHandling;