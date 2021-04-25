export class ApiError {
    message: string;
    code: string;

    constructor(code, message) {
        this.message = message;
        this.code = code;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }
}
