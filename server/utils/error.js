
export const errorHandler = (statusCode, message)=>{
    const error = new Error();
    error.stastusCode = statusCode
    error.message = message
    return error
}