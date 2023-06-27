import 'dotenv/config'
import { Channel, Connection, Message, connect } from 'amqplib'

export class RabbitMQServer {
    private connection: Connection
    private channel: Channel

    async startConnection() {
        const connectionURL = process.env.RABBIT_URL || ''
        this.connection = await connect(connectionURL)
        this.channel = await this.connection.createChannel()
    }

    async consume(queue: string, callback: (message: Message) => void) {
        return this.channel.consume(queue, (message: any | null) => {
            callback(message)
        })
    }
}