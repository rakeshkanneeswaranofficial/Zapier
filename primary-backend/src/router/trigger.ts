import { Router } from "express";
import { prismaClient } from "../db";


const router = Router();
router.get("/avaliable",async (req , res) => {
    const availableTriggers = await prismaClient.availableTrigger.findMany({})
    return res.json({
        availableTriggers
    })
})

export const triggerRouter = router;