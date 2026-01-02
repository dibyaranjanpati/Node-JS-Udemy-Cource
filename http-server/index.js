// const http = require("http");

// const server = http.createServer(function (req, res) {
//   console.log("getting a incoming request");

//   res.writeHead(200);
//   res.end("Thanks for visiting the server and working watch");
// });

// server.listen(8000, function () {
//   console.log("server is running in port 8000");
// });
// console.log("its running ");

// Challenge: Build a Custom Task with Native HTTP Server in Node.js

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const methord = req.method;
  const path = req.url;

  const log = `\n [${Date.now()}]: ${methord} ${path}`;
  fs.appendFileSync("note.txt", log, "utf-8");
  switch (methord) {
    case "GET":
      {
        switch (path) {
          case "/":
            return res.writeHead(200).end("hello from the server");
          case "/contact-us":
            return res
              .writeHead(200)
              .end("hello my self Div A software developer");
          case "/tweet":
            return res.writeHead(200).end(`tweet 1 \n tweet 2`);
        }
      }
      break;
    case "POST": {
      switch (path) {
        case "/tweet":
          return res.writeHead(200).end("your tweet was created");
      }
    }
  }
  return res.writeHead(404).end("you are losst");
});
server.listen(8000, function () {
  console.log("server is running in port 8000");
});
