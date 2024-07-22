import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "worker-kafka",
    brokers: ["localhost:9092"]
})
const ZAPIER_TOPIC_NAME = "zap-events"

async function main() {
    const consumer = kafka.consumer({ groupId: "worker-consumer-main" });
    await consumer.connect();

    await consumer.subscribe({
        topic: ZAPIER_TOPIC_NAME,
        fromBeginning: true
    })
    consumer.run({
        autoCommit: false,

        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset : message.offset,
                value: message.value?.toString()
            })

            await new Promise(r => setTimeout(r, 500));
            const zapId = message.value?.toString();

            console.log("processing done")

            await consumer.commitOffsets([{
                topic: ZAPIER_TOPIC_NAME,
                partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])
        }
    })
}
main()
