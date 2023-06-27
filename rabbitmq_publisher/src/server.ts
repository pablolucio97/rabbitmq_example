import express from 'express'
import { RabbitMQServer } from './rabbitmqserver'

const app = express()
const PORT = 3333

app.listen(PORT, () => {
    (async () => {
        const rabbitMQServer = new RabbitMQServer()
        await rabbitMQServer.startConnection()
            .then(() => {
                console.log(`Server running on ${PORT}`)
                console.log('RabbitMQ server connected')
            })

        const messageSent = await rabbitMQServer.publishMessage('learning_rabbit', 'oi2')
        console.log(messageSent)
    })()
})