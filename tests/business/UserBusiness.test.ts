import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginInputDTO, UserRole } from "../../src/model/User"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { HashManagerMock } from "./mocks/HashManagerMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"
import { UserDatabaseMock } from "./mocks/UserDatabaseMock"


const userDatabasMock = new UserDatabaseMock()
const authenticatorMock = new AuthenticatorMock()
const hashManagerMock = new HashManagerMock()
const idGeneretorMock = new IdGeneratorMock()
const userBusiness = new UserBusiness(userDatabasMock,idGeneretorMock, hashManagerMock, authenticatorMock )

describe.skip( "testando o createUser da business",() =>{
    test("1. caso de error: nome não é inválido", async() => {
        try {
           expect.assertions(3);

           const input = {
             name: "",
             email: "email@email.com",
             password:  "password" ,
             role: UserRole.NORMAL
           }

           await userBusiness.createUser(input)
            
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("É necessário preencher todos os compos")
            expect(error.code).toBe(422);
        }
    });

    test("2. caso de error: o email é inválido ", async() => {
        try {
           expect.assertions(3);

           const input = {
             name: "nome",
             email: "",
             password:  "password" ,
             role: UserRole.NORMAL
           }

           await userBusiness.createUser(input)
            
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("É necessário preencher todos os compos")
            expect(error.code).toBe(422);
        }
    });

    test("3. caso de error: o password é inválido ", async() => {
        try {
           expect.assertions(3);

           const input = {
             name: "nome",
             email: "email@email.com",
             password:  "" ,
             role: UserRole.NORMAL
           }

           await userBusiness.createUser(input)
            
        } catch (error: any) {
            expect(error).toBeDefined()
            expect(error.message).toBe("É necessário preencher todos os compos")
            expect(error.code).toBe(422);
        }
    });

    test("caso de sucesso: token gerado", async() => {
        try {
           expect.assertions(2);

           const input = {
             name: "nome",
             email: "email.com",
             password:  "password" ,
             role: UserRole.NORMAL
           }

         const result = await userBusiness.createUser(input)
         expect(result).toBeDefined()
         expect(result).toEqual("token")
            
        } catch (error: any) {}
    });
});

describe.skip("Testando o getUserByemail (login) business", () => {
  test("1. caso de error: email não encontrado!", async() => {
    expect.assertions(3)
    try {
      const input: LoginInputDTO = {
        email: "email@email",
        password: "password"
      }
      await userBusiness.getUserByEmail(input)
      
    } catch (error: any) {
      expect(error).toBeDefined()
      expect(error.message).toEqual("Invalid email!")
      expect(error.code).toBe(401)
    }
  });

  test("2. caso de error: senha incorreta!", async() => {
    expect.assertions(3)
    try {
      const input: LoginInputDTO = {
        email: "email@email.com",
        password: "passwordd"
      }
      await userBusiness.getUserByEmail(input)
      
    } catch (error: any) {
      expect(error).toBeDefined()
      expect(error.message).toEqual("Invalid Password!")
      expect(error.code).toBe(401)
    }
  });

  test("3. retorna um token de acesso!", async() => {
    expect.assertions(2)
    try {
      const input: LoginInputDTO = {
        email: "email@email.com",
        password: "password"
      } 
      const result = await userBusiness.getUserByEmail(input)
     
      expect(result).toBeDefined()
      expect(result).toEqual({ accessToken: "token" });
    
    } catch (error: any) {} 
  });
});