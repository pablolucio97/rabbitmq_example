import express from 'express'
import {RabbitMQServer} from './RabbitMQServer'
import { Message } from 'amqplib'

const PORT = 3335

const app = express()


app.listen(PORT, () => {

    (async () => {
        const rabbitMQServer = new RabbitMQServer()
        await rabbitMQServer.startConnection()
        .then(() => {
            console.log(`Server running on port ${PORT}`)
        })

        await rabbitMQServer.consume('learning_rabbit', (message: Message) => {
            console.log(message.content.toString())
        })
    })()
})