import { IBand } from "../../../src/model/Band";
import { IRegisterBandsRepository } from "../../../src/repository/registerBandsRepository";


export class RegisterBandDatabaseMock implements IRegisterBandsRepository {
   async registerBands(band: IBand): Promise<void> {
        console.log("banda criada")
    }
    
   async getRegisterBandbyName(name: string): Promise<IBand> {
        const band: IBand = {
            id: "id",
            name: "name",
            musicGenre: "strimusicGenreng",
            responsible: "responsible"
        }
        return band
    }
   async getRegisterBandbyId(name: string, id: string): Promise<IBand | undefined> {
        const band: IBand = {
            id: "id",
            name: "name",
            musicGenre: "strimusicGenreng",
            responsible: "responsible"
        }
        if(band.name === name || band.id === id) {
            return band
        } else {
          return undefined
        }
    }
}