import express from "express"
import dotenv from "dotenv"
import { initDB } from "./config/db.js";
import transactionRouter from "./routes/user.routes.js"
import summaryRouter from "./routes/summary.route.js"
import ratelimiter from "./middlewear/rateLimiter.js";
import job from "./config/cron.js";

app.use(express.json());
app.use(ratelimiter);

const app = express();


dotenv.config();

if(process.env.NODE_ENV == "production") job.start();

app.get("/api/health" , (req , res) => {
    res.status(200).json({status : "ok"})
})

app.get("/" , (req , res) => {
    res.send("app is working")
})  

app.use("/api/transactions" , transactionRouter)
app.use("/api/summary" , summaryRouter)

initDB().then(()=> {
    app.listen(process.env.PORT , () => {
        console.log("application is running on port 5001"); 
    })
})