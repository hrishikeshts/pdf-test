const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
var wkhtmltopdf = require("wkhtmltopdf");
const PORT = 4000;

const app = express();
app.use(
    Cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

wkhtmltopdf("http://google.com/", { pageSize: "letter" }).pipe(
    fs.createWriteStream("out.pdf")
);

app.listen(PORT, () => {
    console.log("Express app listening on port 4000");
});
