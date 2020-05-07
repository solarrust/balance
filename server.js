const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(require("prerender-node"));

app.use(express.static(path.join("build"), { index: false }));

app.get("/share/:uuid", function(req, res) {
  const { uuid } = req.params;

  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Balance</title>

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Balance: test your life" />
    <meta
      property="og:description"
      content="Be in a balance in all spheres of your life!"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:website"
      content="https://balance-test.herokuapp.com/"
    />
    <meta
      property="og:image"
      content="https://ucarecdn.com/<% uuid %>/-/preview/share.jpeg"
    />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="628" />
  </head>
  <body>
    <script>
      // let uuid = "test";
      // let link = document.createElement("meta");
      // link.setAttribute("property", "og:image");
      // link.content = \`https://ucarecdn.com/${uuid}/-/preview/1200x628/\`;
      // document.getElementsByTagName("head")[0].appendChild(link);
      // window.location.href = "/";
    </script>
    <img src="https://ucarecdn.com/<% uuid %>/-/preview/1200x628/share.jpeg" alt="">
  </body>
</html>
  `;

  const newHtml = html.replace(/<% uuid %>/g, uuid);
  // const data = fs.readFileSync(path.join(__dirname, "build", "share.html"));
  // if (data) {
  //   res.write(data.toString().replace("uuid", uuid));
  //   res.end();
  // }
  res.send(newHtml);
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
