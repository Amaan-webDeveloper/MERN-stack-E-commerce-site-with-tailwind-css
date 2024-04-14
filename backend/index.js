// require('dotenv').config()
// console.log(process.env)

import 'dotenv/config'
import { connectDb } from "./src/db/index.js";
import { app } from "./app.js";



connectDb()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error);
        throw error
    })
})
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("app is listening in port",process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
})
