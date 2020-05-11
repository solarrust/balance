const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

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
      property="twitter:image"
      content="https://ucarecdn.com/<% uuid %>/-/preview/share.jpeg"
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
      document.addEventListener('DOMContentLoaded', () => {
        window.location.href = "/";
      });
    </script>
  </body>
</html>
  `;

  const newHtml = html.replace(/<% uuid %>/gi, uuid);
  res.send(newHtml);
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 80);
