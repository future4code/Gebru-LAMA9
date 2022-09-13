import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { IShowDTO } from "../model/Show";


export class ShowController {
    constructor(private showBusiness: ShowBusiness) {}

    async createShowController(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string;
            const bandId = req.params.bandId;
            const {weekDay, startTime, endTime} = req.body

            const showInput: IShowDTO = {
                weekDay,
                startTime,
                endTime,
                bandId
            }
            
            await this.showBusiness.createShowBusiness(token, showInput)

            res.status(201).send({message: "show criado com sucesso!"});

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    async getShowByDayController(req: Request, res: Response): Promise<void> {
        try {
            const weekDay = req.params.weekDay as string;

            const showByWeekDay = await this.showBusiness.getShowByWeekDayBusiness(weekDay);

            res.status(201).send({showWeekDay: showByWeekDay});
            
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}