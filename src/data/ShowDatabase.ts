import { BaseError } from "../error/BaseError";
import { IShow, IShowDB } from "../model/Show";
import { IShowDatabaseRepository } from "../repository/showDatabaseRepository";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase implements IShowDatabaseRepository {
  
    private static LAMA_SHOWS = "LAMA_SHOWS"

    public async createShow(show: IShow): Promise<void> {
   
        try {
            await this.getConnection().insert(
                {
                    id: show.id,
                    week_day: show.weekDay,
                    start_time: show.startTime,
                    end_time: show.endTime,
                    band_id: show.bandId
                }
            ).into(ShowDatabase.LAMA_SHOWS)
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }

    public async getShow(startTime: number): Promise<IShowDB> {
        try {
          const timeStart: IShowDB[] = await this.getConnection().select("*")
            .where("start_time", "=", startTime)
            .from(ShowDatabase.LAMA_SHOWS)
            return timeStart[0]
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }
}