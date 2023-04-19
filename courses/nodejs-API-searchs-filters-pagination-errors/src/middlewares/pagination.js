import BadRequest from "../errors/BadRequest.js";

async function pagination(req, res, next) {
    try {
        let { limit = 5, page = 1, ordination = "_id:-1" } = req.query;

        let [ordinationField, order] = ordination.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        order = parseInt(order);

        const result = req.result;

        if (limit > 0 && page > 0) {
            const booksResult = await result.find()
                .sort({ [ordinationField]: order })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            res.status(200).json(booksResult);
        } else {
            next(new BadRequest());
        }
    } catch (error) {
        next(error);
    }
}

export default pagination;