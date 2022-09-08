import { UserRole } from "../../../src/model/User";
import { IAuthenticator } from "../../../src/ports/Ports"
import { AuthenticationData } from "../../../src/services/Authenticator";


export class AuthenticatorMock implements IAuthenticator {
   generateToken(input: AuthenticationData): string {
       return "token"
    }
   getData(token: string): AuthenticationData {
        return {id: "id", role: UserRole.NORMAL}
    }
    
}