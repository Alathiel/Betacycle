/** Class used for the payment info of the user
 * @param idPayment Id of the Payment number
 * @param numberCard Number of the creditcard
 * @param numberCarSalt Salt of the number that will be addend in backend
 * @param cVV CVV of the credit card
 * @param cVVSalt Salt of the cvv that will be addend in backen
 * @param name First name on the card
 * @param surnameCard Surname on the card
 * @param circuitCard Circuit of the credit card
 * @param expirationDate credit card expiration date
 * @param userId Id from the User
 *  */
export class Payment{
    idPayment:number=0
    numberCard:string=''
    numberCarSalt:string=''
    cVV: string = ''
    cVVSalt: string = ''
    nameCard:string=''
    surnameCard:string=''
    circuitCard:string=''
    expirationDate:string=''
    userId:number=0
}