import { User } from "../model/User"


export interface IUserRepository {
    createUser(
        id: string,
        email: string,
        name: string,
        password: string,
        role: string
      ): Promise<void>

    getUserByEmail(email: string): Promise<User>
}
