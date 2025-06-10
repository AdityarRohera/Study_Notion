import {createClient} from 'redis';

// redis setup
const client = createClient();

const redisConnect = async () => {
    try {
        client.on('error', (err) => console.error('Redis Client Error:', err));

        await client.connect();
        console.log('Connected to Redis');
        return client;
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
};

export default redisConnect;