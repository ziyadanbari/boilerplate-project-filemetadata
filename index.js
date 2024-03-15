var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", async (req, res) => {
  const file = req?.files?.upfile;
  if (!file) return res.json({ error: "no file uploaded" });
  const { size, name, mimetype: type } = file || {};
  return res.json({ size, name, type });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
