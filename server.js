const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const targetBaseUrl = "https://solarrust.github.io/balance/";
function handleRedirect(req, res) {
  console.log(req.url);
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}

app.use(require("prerender-node"));

app.use(express.static(path.join("build"), { index: false }));

app.get("/share/:uuid", function(req, res) {
  const { uuid } = req.params;

  const html = `
  <!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
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
    <meta property="og:url" content="https://alena.rocks/balance/" />

    <meta
      property="og:description"
      content="Be in a balance in all spheres of your life!"
    />
    <meta name="twitter:card" content="summary" />
    <meta
      name="twitter:website"
      content="https://alena.rocks/balance/"
    />
    <meta
      property="twitter:image"
      content="https://ucarecdn.com/<% uuid %>/-/resize/1200/share.jpg"
    />
    <meta
      property="fb:image"
      content="https://ucarecdn.com/<% uuid %>/-/preview/share.jpeg"
    />
    <meta
      property="og:image"
      content="https://ucarecdn.com/<% uuid %>/-/resize/1200/share.jpg"
    />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </head>
  <body>
  </body>
</html>
  `;

  const newHtml = html.replace(/<% uuid %>/gi, uuid);
  const userAgent = req.headers["user-agent"];

  const reg = /HeadlessChrome|googlebot|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|facebot|facebookexternalhit|twitterbot|telegrambot|developers\.google\.com/gi;
  if (reg.test(userAgent)) {
    res.send(newHtml);
  } else {
    res.redirect("/");
  }
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", handleRedirect);

app.listen(process.env.PORT || 80);
