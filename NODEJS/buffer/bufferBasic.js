const { Buffer } = require("buffer");

// const buf = Buffer.alloc(4);
// console.log(buf);

// const buf = Buffer.from("Hey Div");
// console.log(buf);
// console.log(buf.toString());

// const buf = Buffer.from("hey Div");
// console.log(buf.toString());
// console.log(buf.toString("utf-8", 0, 4));

// const buf = Buffer.from("Div");
// console.log(buf);
// buf[0] = 0x4a;
// console.log(buf);
// console.log(buf.toString());

const buf1 = Buffer.from("hey Div");
const buf2 = Buffer.from(" How are you");
const merge = Buffer.concat([buf1, buf2]);
console.log(merge.toString());
console.log(merge.length);
