import { UserInputDTO, LoginInputDTO } from "../model/User";
import { IUserRepository } from "../repository/userRepository";
import { IAuthenticator, IHashManger, IIDGenerator } from "../ports/Ports";
import { BaseError } from "../error/BaseError";


export class UserBusiness {
    constructor(
        private userDatabase: IUserRepository,
        private idGenerator: IIDGenerator,
        private hashManager : IHashManger,
        private authenticator: IAuthenticator
    ) { }

    async createUser(user: UserInputDTO) {

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        if(! user.name || !user.email || !user.password) {
            throw new BaseError("É necessário preencher todos os compos", 422)
        }

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if(!user.email || !user.password) {
            throw new BaseError("Preencha o campo 'email' e 'passoword'", 422)
        }

        if(!userFromDB) {
            throw new BaseError("Invalid email!", 401)
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new BaseError("Invalid Password!", 401);
        }

        return accessToken;
    }
}