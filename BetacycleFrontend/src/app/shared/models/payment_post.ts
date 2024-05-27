export class PaymentPost{
    idPayment:number=0
    numberCard:string=''
    numberCardSalt:string=""
    cVV: string = ''
    cVVSalt: string = ''
    nameCard:string=''
    surnameCard:string=''
    circuitCard:string=''
    expirationDate:string=''
    userId:number=0
    user:cred=new cred()
}

class cred
{
    email: string = ""
    password: string = ""
    passwordSalt: string = ""
    lastmodified:string=''
}