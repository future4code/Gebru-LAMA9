
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
    week_day: DayWeek,
    startTime: number,
    start_time: number,
    bandId: string
}

export interface IShorByDay {
    week_day: string,
    name: string,
    music_genre: string
}