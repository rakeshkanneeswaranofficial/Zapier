"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "worker-kafka",
    brokers: ["localhost:9092"]
});
const ZAPIER_TOPIC_NAME = "zap-events";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: "worker-consumer-main" });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: ZAPIER_TOPIC_NAME,
            fromBeginning: true
        });
        consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c;
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()
                });
                yield new Promise(r => setTimeout(r, 500));
                const zapId = (_c = message.value) === null || _c === void 0 ? void 0 : _c.toString();
                console.log("processing done");
                yield consumer.commitOffsets([{
                        topic: ZAPIER_TOPIC_NAME,
                        partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
            })
        });
    });
}
main();
