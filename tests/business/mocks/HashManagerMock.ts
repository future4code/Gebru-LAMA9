import { IHashManger } from "../../../src/ports/Ports";


export class HashManagerMock implements IHashManger {
   async hash(text: string): Promise<string> {
        return "hashManagerMock"
    }
  async compare(text: string, hash: string): Promise<boolean> {
       return text === hash
    }
    
}