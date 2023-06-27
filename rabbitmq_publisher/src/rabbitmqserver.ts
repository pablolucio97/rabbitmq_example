import { Channel, connect, Connection } from 'amqplib'
import 'dotenv/config'

export class RabbitMQServer {
    private connection: Connection;
    private channel: Channel;

    async startConnection() {
        const connectionUrl = process.env.RABBIT_URL || ''
        this.connection = await connect(connectionUrl)
        this.channel = await this.connection.createChannel()
    }

    async publishMessage(queue: string, message: string) {
        return this.channel.sendToQueue(queue, Buffer.from(message))
    }

}