import { BaseError } from "../error/BaseError";
import { IBand} from "../model/Band";
import { IRegisterBandsRepository } from "../repository/registerBandsRepository";
import { BaseDatabase } from "./BaseDatabase";


export class RegisterBandsDatabase extends BaseDatabase implements IRegisterBandsRepository {
    private static USER_TABLE = "LAMA_BANDS"

    public async registerBands (band : IBand): Promise<void> {
  
        try {
            await this.getConnection()
            .insert(
                {
                 id: band.id,
                 name: band.name,
                 music_genre: band.musicGenre,
                 responsible: band.responsible
                }
            ).into(RegisterBandsDatabase.USER_TABLE)
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, 400)
        }
    }

    public async getRegisterBandbyName (name: string):Promise<IBand> {

        try {
           const bands: IBand[] = await this.getConnection()
           .select("*") 
           .where("name", "=", name)
           .from(RegisterBandsDatabase.USER_TABLE)
            return bands[0]

        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }
    public async getRegisterBandbyId(name: string ):Promise<IBand> {
       
        try {
           const bands: IBand = await this.getConnection()
           .select("*") 
           .where("name", "like", `%${name}%`)
           .from(RegisterBandsDatabase.USER_TABLE)
            return bands

        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }
}

