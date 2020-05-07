const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(require("prerender-node"));

app.use(express.static(path.join("build"), { index: false }));

app.get("/share/:uuid", function(req, res) {
  let uuid = req.params.uuid;
  let currentURL = `${window.location.protocol}//${window.location.hostname}`;
  // res.render(path.join(__dirname, "../build", "share.html"), { uuid: uuid });
  let data = fs.readFileSync(path.join(__dirname, "build", "share.html"));
  if (data) {
    res.send(data.toString().replace("uuid", uuid));
    res.send(data.toString().replace("%PUBLIC_URL%", currentURL));
  }
});

// app.get("/api/getList", (req, res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log("Sent list of items");
// });

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 80);
