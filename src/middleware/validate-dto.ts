import { ApiError } from './../error/api-error';

function validateDto(schema) {
    return async (req, res, next) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    };
}

export default validateDto;
