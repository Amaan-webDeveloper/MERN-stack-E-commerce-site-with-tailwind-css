import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

// app.use(cors())
// app.use(
//     cors(
//         {
//             origin: process.env.CORS_ORIGIN,
//             credentials: true
//         }
//     )
// )

app.use(express.json({}))//limit:"20kb"
app.use(express.urlencoded({ extended: true }))//,limit:"20kb"
app.use(express.static("public"))
app.use(cookieParser())


// importing routes 
import userRouter from "./src/routes/user.routes.js"
import Category from "./src/routes/category.routes.js";
import productRouter from "./src/routes/product.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", Category)
app.use("/api/v1/product",productRouter)


export { app }