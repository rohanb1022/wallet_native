import express from "express"
import { addTransaction , deleteTransation, getAllTransaction } from "../controller/user.controller.js"
const router = express();

router.post("/addTransaction" , addTransaction)
router.get("/getAllTransaction/:userId" , getAllTransaction)
router.delete("/delTransaction/:id" , deleteTransation)

export default router;
