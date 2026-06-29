import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import greetingRoute from "./route/greetingRoute.js"
import offlineChatRoute from "./route/offlineChatRoute.js"
import onlineChatRoute from "./route/onlineChatRoute.js"
import testRoute from "./route/testRoute.js"
import dotenv from "dotenv";


const app = express()

dotenv.config();
app.use(cors())
app.use(express.json())
app.use("/api", greetingRoute)
app.use("/api", testRoute);

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

offlineChatRoute(io)
onlineChatRoute(io)

server.listen(5000, () => {
    console.log("Server Running On Port 5000")
})