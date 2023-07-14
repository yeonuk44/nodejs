const http = require("http");
const { URL } = require("url");
const querystring = require("querystring");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  /**
   * INFO:
   * Implemente routing functionality
   */
  const { method, url } = req;

  /**
   * INFO:
   * Implemente session functionality
   */
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let session = {};

  console.log("parsedUrl", parsedUrl);

  if (method === "GET" && url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!");
  } else if (method === "GET" && url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("About Page");
  } else if (parsedUrl.pathname === "login") {
    const { username } = querystring.parse(parsedUrl.query);
    session.username = username;
    const storedUsername = session.username;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Hello ${storedUsername}`);
  } else if (parsedUrl.pathname === "logout") {
    session.username = null;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Goodbye ${session.username}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
