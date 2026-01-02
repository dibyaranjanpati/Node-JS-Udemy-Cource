const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("error", (err) => {
  console.error(`Error Ocure :${err.message}`);
});

eventEmitter.emit("error", new Error("something went Wrong"));
