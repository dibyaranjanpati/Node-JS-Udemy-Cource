const ChatRoom = require("./chatRoom");

const chat = new ChatRoom();

chat.on("join", (user) => {
  console.log(`${user} has join the chat`);
});
chat.on("message", (user, message) => {
  console.log(`${user} : ${message}`);
});
chat.on("leave", (user) => {
  console.log(`${user} has left the chat`);
});

// simulating the chat

chat.join("Div");
chat.join("subham");

chat.sendMessage("Div", "hey subham , and hello to everyone");
chat.sendMessage("subham", "hey div , and hello to everyone");

chat.leave("Div");
chat.sendMessage("Div", "this message wont be sent");
chat.leave("subham");
