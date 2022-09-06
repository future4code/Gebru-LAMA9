import { IIDGenerator } from "../../../src/ports/Ports";


export class IdGeneratorMock implements IIDGenerator {
    generate = jest.fn(()=> "id")
}