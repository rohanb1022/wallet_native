import express from "express"
import dotenv from "dotenv"
import { initDB } from "./config/db.js";
import transactionRouter from "./routes/user.routes.js"
import summaryRouter from "./routes/summary.route.js"
import ratelimiter from "./middlewear/rateLimiter.js";
const app = express();

app.use(ratelimiter);
app.use(express.json());

dotenv.config();

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