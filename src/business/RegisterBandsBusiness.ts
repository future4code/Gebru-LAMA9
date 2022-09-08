import { BaseError } from "../error/BaseError";
import { BandDTO, IBand } from "../model/Band";
import { IAuthenticator, IIDGenerator } from "../ports/Ports";
import { IRegisterBandsRepository } from "../repository/registerBandsRepository";


export class RegisterBandsBusiness {
    constructor(
        private registerDatabase: IRegisterBandsRepository,
        private idGenerator: IIDGenerator,
        private authenticator: IAuthenticator
    ){}

    async registerBand (token: string, inputBand: BandDTO): Promise<void> {
        try {
            const {name, musicGenre, responsible} = inputBand;

            if(!name || !musicGenre || !responsible){
                throw new BaseError("É necessário preenhcer todos os campos", 422);
            }

            const id = this.idGenerator.generate()
            const tokenData = this.authenticator.getData(token);

            if(tokenData.role !== "ADMIN") {
                throw new BaseError("Somente ADMINs pode cadastrar bandas!", 401);
            }
          
            const bandDb = await this.registerDatabase.getRegisterBandbyName(name);

            if(bandDb?.name === name) {
                throw new BaseError("Nome da banda já existe!", 401);
            }

            const band: IBand = {
             id,
             name,
             musicGenre,
             responsible
            }

            await this.registerDatabase.registerBands(band);

        } catch (error: any) {
            throw new BaseError(error.message, error.code);
        }
    }

    async getBandById (name: string, id: string): Promise<IBand>{
        try {
            if(!name || !id) {
                name = "%",
                id = "%"
            }

           const bandAll = await this.registerDatabase.getRegisterBandbyId(name, id)

           if(!bandAll) {
            throw new BaseError("Informe o id o nome da banda na query!", 402)
           }

           return bandAll
        } catch (error: any) {
            throw new BaseError(error.message, error.code);
        }
    }
}