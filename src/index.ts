/**
 * Required External Modules
 */
import * as dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import { tinderCardsRouter } from "./controllers/tinderCardsController"
import { errorHandler } from "./middleware/error.middleware"
import { notFoundHandler } from "./middleware/not-found.middleware"

dotenv.config()
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT, 10) || 7001

const app = express()
/**
 *  App Configuration
 */
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use("/api/cards", tinderCardsRouter)

app.use(errorHandler)
app.use(notFoundHandler)


/**
 * DB Config  
 */
mongoose.connect(process.env.MONGO_URI as string)
/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})