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
                    value: elemet.id
                }
            })
        })

        
    }

}

main();


