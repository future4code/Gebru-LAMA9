import express from "express";
import { RegisterBandsBusiness } from "../business/RegisterBandsBusiness";
import { RegisterBandsController } from "../controller/RegisterBandsController";
import { RegisterBandsDatabase } from "../data/RegisterBandsDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";



export const registerBandRouter = express.Router()

const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

const registerBandDatabase = new RegisterBandsDatabase();
const registerBandsBusiness = new RegisterBandsBusiness(registerBandDatabase, idGenerator, authenticator);
const registerBandsController = new RegisterBandsController(registerBandsBusiness);

registerBandRouter.get("/", (res, req) => registerBandsController.getBandByIdController(res, req))
registerBandRouter.post("/cadastro", (res, req) => registerBandsController.registerBandController(res, req))