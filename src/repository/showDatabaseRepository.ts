import { IShow, IShowDB } from "../model/Show";


export interface IShowDatabaseRepository {
    createShow(show: IShow): Promise<void>
    getShow(startTime: number): Promise<IShowDB>
}