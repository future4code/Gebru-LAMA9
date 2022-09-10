
export enum DayWeek{
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export interface IShow {
    id: string,
    weekDay: DayWeek,
    startTime: number,
    endTime: number,
    bandId: string
}
export interface IShowDTO {
    weekDay: DayWeek,
    startTime: number,
    endTime: number,
    bandId: string
}

export interface IShowDB {
    id: string,
    weekDay: DayWeek,
    startTime: number,
    start_time: number,
    bandId: string
}