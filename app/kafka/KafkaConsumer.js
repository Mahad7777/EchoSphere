const { kafka } = require("./KafkaClient");
const { storeMessages } = require("../db/operation");

module.exports = async function () {
    const consumer = kafka.consumer({groupId:process.env.KAFKA_GROUP_ID});

    console.log("connecting to consumer");
    await consumer.connect();

    await consumer.subscribe({ topics: [process.env.KAFKA_TOPIC], fromBeginning: true })

    console.log("consumer connected successfully")


    let messages_count = 0;
    let messages = [];

    await consumer.run({
    eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
        const messages = batch.messages.map(m => JSON.parse(m.value.toString()));

        try {
        await storeMessages(messages);

        for (const message of batch.messages) {
            resolveOffset(message.offset); // Mark message as handled
        }

        await commitOffsetsIfNecessary(); // Actually commit offsets
        await heartbeat(); // Keep connection alive
        } catch (err) {
        console.error("Failed to store messages:", err.message);
        // Do NOT resolve offsets — retry will happen on next run
        }
    },
    });
    
}
