import { ShowBusiness } from "../../src/business/ShowBusiness";
import { DayWeek, IShowDTO } from "../../src/model/Show";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./mocks/ShowDatabaseMock";



const idGeneretorMock = new IdGeneratorMock();
const authenticatorMock = new AuthenticatorMock();
const showDatabaseMock = new ShowDatabaseMock();

const showBusiness = new ShowBusiness(showDatabaseMock, idGeneretorMock, authenticatorMock);


describe("Testando a class showBusiness função createShowBusiness", () => {
    test("Caso de error 1: USUÁRIO DO TIPO NORMAL NÃO PODE ADICIONAR BANDA! ", async () => {
        expect.assertions(3);
        try {

            const token = "NORMAL";
            const input: IShowDTO = {
                weekDay: DayWeek.SABADO,
                startTime: 14,
                endTime: 18,
                bandId: "bandId",
            }

            await showBusiness.createShowBusiness(token, input)

        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toEqual("Somente ADMINs pode cadastrar shows!");
            expect(error.code).toEqual(401);
        }
    });

    test("Caso de error 2: ERROR NO FORMATO DA DATA! ", async () => {
        expect.assertions(3);
        try {

            const token = "NORMAL";
            const input: IShowDTO = {
                weekDay: DayWeek.SABADO,
                startTime: 14.30,
                endTime: 17,
                bandId: "bandId",
            }

            await showBusiness.createShowBusiness(token, input)

        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toEqual("Só horás exatas são válidas!");
            expect(error.code).toEqual(402);
        }
    });

    test("Caso de error 3: HORÁRIO INVÁLIDO! ", async () => {
        expect.assertions(3);
        try {

            const token = "ADMIN";
            const input: IShowDTO = {
                weekDay: DayWeek.SABADO,
                startTime: 7,
                endTime: 9,
                bandId: "bandId"
            }

            await showBusiness.createShowBusiness(token, input)

        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toEqual("show só pode começar as 8 hrs até 22 hrs");
            expect(error.code).toEqual(402);
        }
    });

    test.skip("Caso de sucesso: SHOW CADASTRADO! ", async () => {
        expect.assertions(2);
        try {

            const token = "ADMIN";
            const input: IShowDTO = {
                weekDay: DayWeek.SABADO,
                startTime: 8,
                endTime: 10,
                bandId: "bandId"
            }

          const result = await showBusiness.createShowBusiness(token, input)
            console.log(result)
            expect(result).toBeDefined()
            expect(result).toEqual({ message: "cadastrado com sucesso!" });

        } catch (error: any) {
            console.log(error)
        }
    });
})