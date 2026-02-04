import qr from "qr-image";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

app.post("/submit", (req, res) => {
  const url = req.body.url;
  const qrSource = generateQRCode(url);
  res.render("qr.ejs", { qr: qrSource });
});

app.listen(port, () => {
  console.log(`QR Code generator app listening at http://localhost:${port}`);
});

function generateQRCode(url) {
  try {
    const qrimg = qr.imageSync(url, { type: "png" });
    const qrBase64 = qrimg.toString("base64");
    const qrSrc = `data:image/png;base64,${qrBase64}`;
    return qrSrc;
  } catch (error) {
    if (error) {
      console.log(error);
    }
    return null;
  }
}
