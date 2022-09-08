import { User, UserRole } from "../../../src/model/User";
import { IUserRepository } from "../../../src/repository/userRepository";


export class UserDatabaseMock implements IUserRepository {
    async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void>{
     console.log("usuário criado")
    }
   async getUserByEmail(email: string): Promise<any>  {
        if(email === "email@email.com") {
          return new User("id", "email", "name", "password", UserRole.NORMAL)
        } else {
            return undefined
        }
           
        
    } 

    
}