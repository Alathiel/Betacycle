/**
 * Class for the Error
 * @param statusCode Error code
 * @param url Url where the error been
 * @param message Error message
 * @param userId IdUser of who(if is logged) generate the error
 */
export class ErrorLog{
    statusCode: string = ''
    url:string = ''
    message:string = ''
    userId: string = ''
}