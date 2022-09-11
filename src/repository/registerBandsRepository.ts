import { IBand } from "../model/Band";


export interface IRegisterBandsRepository {
    registerBands (band : IBand): Promise<void>
    getRegisterBandbyName (name: string):Promise<IBand>
    getRegisterBandbyId (name: string):Promise<IBand | undefined>
}