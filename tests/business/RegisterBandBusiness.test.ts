import { RegisterBandsBusiness } from "../../src/business/RegisterBandsBusiness"
import { IBand } from "../../src/model/Band"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"
import { RegisterBandDatabaseMock } from "./mocks/RegisterBandDatabaseMock"


const registerBandDatabaseMock = new RegisterBandDatabaseMock()
const authenticatorMock = new AuthenticatorMock()
const idGeneretorMock = new IdGeneratorMock()

const registerBandsBusiness = new RegisterBandsBusiness(registerBandDatabaseMock, idGeneretorMock, authenticatorMock)


describe.skip("Testando a camanda RegisterBandsBusiness", () => {
    test("função getRegisterBandbyId, verificando se retorna todos dados corretamente", async() => {
        try {
            expect.assertions(1)
            const name = "name"
         
            const band= {
                id: "id",
               name: "name",
               musicGenre: "strimusicGenreng",
               responsible: "responsible"
            }
            const result = await registerBandsBusiness.getBandById(name)
         
           expect(result).toContainEqual(band)
          
        } catch (error: any) {}
    })

    test(" caso error: da função getBandById 'Informe o id o nome da banda na query! '", async() => {
        try {
            expect.assertions(3)
            const name = ""
          
   
            await registerBandsBusiness.getBandById(name)
          
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("Informe o id o nome da banda na query!")
            expect(error.code).toBe(402)
        }
    });

    test(" caso error: da função registerBand 'É necessário preenhcer todos os campos! '", async() => {
        try {
            expect.assertions(3)
            const token = "token"
            const input = {
                name: "",
                musicGenre: "musicGenre",
                responsible: "responsible"
            }
   
            await registerBandsBusiness.registerBand(token, input)
          
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("É necessário preenhcer todos os campos")
            expect(error.code).toBe(422)
        }
    });
    
    test(" caso error: da função registerBand 'Se é do tipo ADMIN! '", async() => {
        try {
            expect.assertions(3)
            const token = "token"
            const input = {
                name: "name",
                musicGenre: "musicGenre",
                responsible: "responsible"
            }
   
            await registerBandsBusiness.registerBand(token, input)
          
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("Somente ADMINs pode cadastrar bandas!")
            expect(error.code).toBe(401)
        }
    });

})