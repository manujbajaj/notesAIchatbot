
class apiResponse{
    constructor(message="Successful",statusCode,data){
        this.message=message;
        this.statusCode=statusCode;
        this.data=data
    }
}

export {apiResponse}