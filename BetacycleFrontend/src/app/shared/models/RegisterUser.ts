/**
 * New class created bt User and Credentials
 * Used in the registration
 */

import { Credentials } from "./credential";
import { User } from "./user";

export class RegisterUser{
    user: User = new User()
    cred: Credentials = new Credentials()
}