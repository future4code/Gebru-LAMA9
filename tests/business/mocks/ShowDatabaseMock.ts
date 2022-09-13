import { IShow, IShowDB, IShorByDay, DayWeek } from "../../../src/model/Show";
import { IShowDatabaseRepository } from "../../../src/repository/showDatabaseRepository";



export class ShowDatabaseMock implements IShowDatabaseRepository {
   async createShow(show: IShow): Promise<any> {
      return {message: "cadastrado com sucesso!"}
    }
   async getShow(startTime: number): Promise<any> {
     
    const weekDayDB = {
        id: "id",
        week_day: DayWeek,
        startTime: 14,
        start_time: 18,
        bandId: "bandId"
    }

    return weekDayDB;
     
    }
   async getShowByDay(weekDay: string): Promise<any[]> {
        return [""]
    }

}