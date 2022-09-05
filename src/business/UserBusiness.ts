import { UserInputDTO, LoginInputDTO } from "../model/User";
import IdGenerator from "../services/IdGenerator";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";
import { IUserRepository } from "../repository/userRepository";


export class UserBusiness {
    constructor(
        private userDatabase: IUserRepository
    ) { }

    async createUser(user: UserInputDTO) {

        const id = IdGenerator.generate();

        const hashPassword = await HashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = Authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        const hashCompare = await HashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = Authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}