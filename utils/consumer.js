const amqp = require('amqplib');
const queue = "notification";

exports.consumer = async () => {
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    amqp.connect('amqp://localhost')
        .then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            return ch.assertQueue(queue, { durable: true }).then(function (ok) {
                return ch.consume(queue, async function (payload) {
                    if (payload !== null) {
                        const message = JSON.parse(payload.content.toString());

                        // Write your code to handle message
                        console.log(message);

                        ch.ack(payload);
                    }
                });
            });
        }).catch(err => {
            throw err;
        });
}