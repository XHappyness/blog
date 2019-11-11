const http = require("http");

const serve = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>hello word</h1>")
});

serve.listen(3000, () => {
    console.log("listening on 3000 port");
})
