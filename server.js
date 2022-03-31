const express = require("express");

const app = express();
const port = 8001

app.use(express.static("public"));

app.listen(port);

console.log("Server started at http://localhost:" + port);
