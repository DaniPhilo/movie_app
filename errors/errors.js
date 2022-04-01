class BadRequest extends Error {
    constructor(message, type) {
        super();
        this.name = 'Bad Request';
        this.message = message;
        this.type = type;
        this.status = 400;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super();
        this.name = 'Unauthorized';
        this.message = message;
        this.type = 'authentication';
        this.status = 401
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super();
        this.name = 'Forbidden';
        this.message = message;
        this.type = 'authentication';
        this.status = 403
    }
}

class NotFoundError extends Error {
    constructor(name, message, type, status) {
        super();
        this.name = 'Not Found';
        this.message = 'Route does not exist'
        this.type = 'simple'
        this.status = 404
    }
}

module.exports = {
    NotFoundError,
    BadRequest,
    AuthenticationError,
    ForbiddenError
}