const amqp = require('amqplib');
const queue = "notification";

exports.producer = async (data) => {
    amqp.connect('amqp://localhost')
        .then(function (conn) {
            return conn.createChannel().then(function (ch) {
                return ch.assertQueue(queue, { durable: true }).then(function (ok) {
                    data.forEach(message => {
                        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                    });
                    return ch.close();
                });
            }).then((ok) => {
                conn.close();
            });
        }).catch(err => {
            throw err;
        });
}

