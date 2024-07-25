// ths is the processor code that will take the data form the database send to the kafka server to the below mentioned Kafka TOPIC

import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const kafka = new Kafka({
    clientId: "processor-kafka",
    brokers: ["localhost:9092"]
})
const ZAPIER_TOPIC_NAME = "zap-events"
const prisma_processor_client = new PrismaClient();
const producer = kafka.producer();


async function main() {
    await producer.connect();
    while (1) {
        const zapRuns = await prisma_processor_client.zapRunOutbox.findMany({
            where: {},
            take: 10
        })
        console.log(zapRuns)
        producer.send({
            topic: ZAPIER_TOPIC_NAME,
            messages: zapRuns.map(elemet => {
                return {
                    value: elemet.zapRunId
                }
            })
        })
        // After sending the messages it will delete the data that is sent
        const deleted_datas = await prisma_processor_client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: zapRuns.map(element => {
                        return element.id
                    })
                }
            }
        })
        console.log(deleted_datas)
        await new Promise(r => {
            setTimeout(r, 3000)
        })
    }
}

main();