import { Request, Response } from "express";
import { RegisterBandsBusiness } from "../business/RegisterBandsBusiness";
import { BandDTO } from "../model/Band";



export class RegisterBandsController {
    constructor(
        private resgisterBandsBusiness: RegisterBandsBusiness
    ) {}

    public async registerBandController (req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string
            const {name, musicGenre, responsible} = req.body;
            const registerBand: BandDTO = {
                name, musicGenre, responsible
            }

            await this.resgisterBandsBusiness.registerBand(token, registerBand)

            res.status(201).send({message: "Banda registrada com sucesso!"})

        } catch (error: any) {
            res.send({ error: error.message }).status(error.code)
        }
    }

    public async getBandByIdController(req: Request, res: Response): Promise<void>{
        try {
            const name = req.query.name as string;
         
            const bands = await this.resgisterBandsBusiness.getBandById(name)

            res.status(200).send(bands);
            
        } catch (error: any) {
            res.send({ error: error.message }).status(error.code)
        }
    }
}