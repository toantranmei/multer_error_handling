const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json({limit: "500MB", extended: true}));
app.use(bodyParser.urlencoded({limit: "500MB", extended: true}));
app.use(logger("dev"));

app.use("/api", require("./routes"));
app.use("/", (_req, res) => {
    res.end("API Running...");
} );

server.listen(3000, function () {
    console.log("Server listening on port 3000");
});