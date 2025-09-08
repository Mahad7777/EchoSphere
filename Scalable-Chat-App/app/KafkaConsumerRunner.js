require('dotenv').config();

const kafka = require("./kafka/KafkaConsumer");
const admin = require("./kafka/KafkaAdmin");

(async ()=>{
    await admin();
    await kafka();
})();