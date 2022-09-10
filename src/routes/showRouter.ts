import express from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { ShowDatabase } from "../data/ShowDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export const showRouter = express.Router();


const idGenerator = new IdGenerator();
const authenticator = new Authenticator();
const showDatabase = new ShowDatabase();
const showBusiness = new ShowBusiness(showDatabase, idGenerator, authenticator);
const showController = new ShowController(showBusiness);


showRouter.post("/create/:bandId", (res, req) => showController.createShowController(res, req));
