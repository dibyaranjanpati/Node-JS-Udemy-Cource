const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username) => {
  console.log(`hello ${username} and wellcome to the Events in node js`);
});
eventEmitter.on("greet", (username) => {
  console.log(`hey  ${username} and node js is here `);
});

eventEmitter.once("pushnotify", () => {
  console.log("this is run only once");
});

eventEmitter.emit("greet", "Div");
// eventEmitter.emit("greet", "subham");
// eventEmitter.emit("pushnotify");
// eventEmitter.emit("pushnotify");
// eventEmitter.emit("greet", "dibya");

// const myListener = () => console.log("i am a test listener");
// eventEmitter.on("test", myListener);
// eventEmitter.emit("test");
// eventEmitter.removeListener("test", myListener);
// eventEmitter.emit("test");

// console.log(eventEmitter.listeners("greet"));
