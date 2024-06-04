/**Class that contain address info and used for address operation 
 * @param userId User Id
 * @param city City of the addre
 * @param address1 Address(Via/Street/Piazza/Square Address 121)
 * @param cap Cap of the address
 * @param province Province of the address(Only two characters in caps)
 * @param nation Nation of the address
 * @param addressId AddressId that will be incremented in post
*/
export class Address
{
    userId: number = 0;
    city: string = '';
    address1: string = '';
    cap: string = '';
    province: string = '';
    nation: string = '';
    addressId: number = 0;
}