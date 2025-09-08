
const Redis = require('ioredis');
const redisNor = new Redis({ host:'redis', port: 6379 });

const fetchMessagesFromRedis = async () => {
    return await redisNor.lrange("messages", 0, -1)
}

async function updateMessagesInRedis(messages) {

     // Clear existing data in Redis
    await redisNor.del('messages');

    // Convert messages to JSON strings and push them to the Redis list
    const jsonMessages = messages.map(message => JSON.stringify(message));
    await redisNor.rpush('messages', ...jsonMessages);
}


module.exports = { fetchMessagesFromRedis, updateMessagesInRedis }