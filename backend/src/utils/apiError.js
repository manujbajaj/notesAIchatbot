
class apiError extends Error{
    constructor(statusCode,message){
        super(message)
        this.message=message
        this.statusCode=statusCode
    }
}

export {apiError}