const { producer } = require("./utils/producer");

const data = [];
for (var i = 0; i < 1000; i++) {
    data.push({
        count: i,
    });
}

// produces a list of messages in queue
producer(data);