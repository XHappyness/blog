const http = require("http");
const serverHandle = require("../app");
const PORT = 3000;

const serve = http.createServer(serverHandle);

serve.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}/ `);
})
