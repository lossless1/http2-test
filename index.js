const http2 = require("http2");
const fs = require("fs");

const server = http2.createSecureServer({
  key: fs.readFileSync("localhost-privkey.pem"),
  cert: fs.readFileSync("localhost-cert.pem")
});

server.on("error", error => {
  throw new Error(error);
});

server.on("stream", (stream, headers) => {
  console.log(headers);
  // stream.on("ping", console.log);
  // stream.on("data", console.log);
  stream.respond({
    "content-type": "text/html",
    ":status": 200
  });
  stream.end("<b>Hello world</b>");
});

server.listen(8443);
