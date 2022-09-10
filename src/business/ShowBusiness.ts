import { BaseError } from "../error/BaseError";
import { DayWeek, IShorByDay, IShow, IShowDTO } from "../model/Show";
import { IAuthenticator, IIDGenerator } from "../ports/Ports";
import { IShowDatabaseRepository } from "../repository/showDatabaseRepository";


export class ShowBusiness  {
    constructor(
        private showDatabase: IShowDatabaseRepository,
        private idGenerator: IIDGenerator,
        private authenticator: IAuthenticator
        ) {}

        async createShowBusiness(token: string, band: IShowDTO): Promise<void> {
       
            try {
                const {weekDay, startTime, endTime, bandId} = band;

                if(!weekDay || !startTime || !endTime || !bandId ) {
                    throw new BaseError("É necessário preencher todos os campo", 422)
                }

                const startTimeString = startTime.toString()
                const endTimeString = endTime.toString()

                if(startTimeString.includes(".")) {
                    throw new BaseError("Só horás exatas são válidas!", 402)
                }

                if(endTimeString.includes(".")) {
                    throw new BaseError("Só horás exatas são válidas!", 402)
                }

                const verifyShowTime = await this.showDatabase.getShow(startTime)
          
                if(verifyShowTime?.start_time === startTime && verifyShowTime.week_day === weekDay) {
                    throw new BaseError("Já existe uma banda marcada para esse horário", 401)
                }

                if( startTime < 8  || startTime > 22) {
                    throw new BaseError("show só pode começar as 8 hrs até 22 hrs", 402)
                }

                if(endTime <= startTime) {
                    throw new BaseError("hora inválida", 402)
                }

                if(endTime > 23) {
                    throw new BaseError("show não pode passar das 23 horas!", 402)
                }

                // const startTimeString = startTime.toString()
                // const endTimeString = endTime.toString()

                // if(startTimeString.includes(".")) {
                //     throw new BaseError("Só horás exatas são válidas!", 402)
                // }

                // if(endTimeString.includes(".")) {
                //     throw new BaseError("Só horás exatas são válidas!", 402)
                // }

                if(!token) {
                    throw new BaseError("É necessário passar o token no herders authorization", 422)
                }

                const tokenData =  this.authenticator.getData(token)

                if(tokenData.role !== "ADMIN") {
                    throw new BaseError("Somente ADMINs pode cadastrar shows!", 401);
                }

                // const verifyShowTime = await this.showDatabase.getShow(startTime)
          
                // if(verifyShowTime?.start_time === startTime) {
                //     throw new BaseError("Já existe uma banda marcada para esse horário", 401)
                // }

                if(weekDay !== DayWeek.DOMINGO && weekDay !== DayWeek.SABADO && weekDay !== DayWeek.SEXTA){
                    throw new BaseError("Só podemos marcar shows 'SEXTA', 'SABADO' e 'DOMINGO'", 422)
                }

                const id = this.idGenerator.generate();

                const show: IShow = {
                    id,
                    weekDay,
                    startTime,
                    endTime,
                    bandId
                }

                await this.showDatabase.createShow(show)

            } catch (error: any) {
                throw new BaseError(error.message, error.code)
            }
        }

        async getShowByWeekDayBusiness(weekDay: string): Promise<IShorByDay[]> {
          
            try {
                if(!weekDay) {
                    throw new BaseError("Informe o dia da semana 'SEXTA', 'SABADO', DOMINGO', para fazer a busca", 422)
                }

                const showByDay = await this.showDatabase.getShowByDay(weekDay)
                return showByDay
                
            } catch (error: any) {
                throw new BaseError(error.message, error.code)
            }
        }
}