const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const Cors = require("cors");
const blobStream = require("blob-stream");
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

app.use("/", express.static(path.join(__dirname, "PDFs")));

app.post("/generate-pdf", (req, res) => {
    console.log(`POST data received: "${req.body.name}", "${req.body.email}"`);
    let pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(`PDFs/PDF for ${req.body.name}.pdf`));
    pdfDoc.text(`Name: ${req.body.name}`);
    pdfDoc.text(`Email: ${req.body.email}`);
    pdfDoc.end();
    res.send(`http://localhost:${PORT}/PDF for ${req.body.name}.pdf`);
});

app.listen(PORT, () => {
    console.log("Express app listening on port 4000");
});
