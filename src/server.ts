import express from "express"
import { catchError } from "./middlewares/catchError.middlewares";
import routes from './routes';
import logger from "./utils/logger"

type serverParam = {
    protocol: string, 
    host: string, 
    port: number
}

export const launchServer = (param:serverParam) => {
    const httpServer = express()
    httpServer.use(express.json())
    httpServer.use(routes)
    httpServer.use(catchError)
    httpServer.listen(
        param.port,
        () => { logger.info(`Server started at ${param.protocol}://${param.port}:${param.host}`)}
    )
}