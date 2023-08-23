import express, {Request, Response} from "express"
import { PrismaClient } from "@prisma/client"
import PostRouter from './routes/post.route'

export const prisma = new PrismaClient()

const app = express()
const PORT = 8080

async function main() {
    app.use(express.json())

    app.use("/api/v1/post", PostRouter)

    app.all('*', (req : Request, res : Response) => {
        res.status(404).json({ error : `Route ${req.originalUrl} not found`})
    })

    app.listen(PORT, () => {
        console.log(`server listening on port : ${PORT}`);
        
    })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
    
  })