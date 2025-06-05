// pm2.config.js
module.exports = {
    apps: [
        { name: "api", script: "index.js" },
        { name: "kafka-admin", script: "./kafka/KafkaAdmin.js" },
        { name: "kafka-consumer", script: "KafkaConsumerRunner.js" },
        { name: "cron-jobs", script: "./Jobs/cron.js" }
    ]
};
