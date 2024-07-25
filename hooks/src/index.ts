// this file =define the express a that will catch the request 

import express from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const app = express();

app.use(express.json())
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // here we are adding the data into the zapRun and zapRunOut Box simultaneously using transaction

    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        })

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })


    res.json({
        message: "Webhook received"
    })


})

app.listen(3000 ,()=>{
    console.log("app is listening at port 3000")
})
