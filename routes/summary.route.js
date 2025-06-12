import express from "express";
import { getSummary} from "../controller/summary.controller.js"

const router = express();

router.get("/getSummary/:userId" , getSummary);

export default router;