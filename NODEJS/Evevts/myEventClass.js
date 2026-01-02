const EventEmitter = require("events");

class Chat extends EventEmitter {
  sendMessage(msg) {
    console.log(`message sent ${msg}`);
    this.emit("messageRecieve", msg);
  }
}

const chat = new Chat();

chat.on("messageRecieve", (msg) => {
  console.log(`message recieve ${msg}`);
});

chat.sendMessage("Dibya");
