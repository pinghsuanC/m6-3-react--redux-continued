const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const port = 5678;
const request = require("request");
const fetch = require("isomorphic-fetch");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/spotify_access_token", (req, res, next) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;
  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );
  // fetch info from spotify
  // note: fetch will not work!
  // https://stackoverflow.com/questions/53218678/spotify-api-bad-request-on-api-token-authorization-error-400
  var postQuery = "grant_type=client_credentials";
  request(
    {
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postQuery.length,
      },
      body: postQuery,
    },
    function (err, response, data) {
      if (!err && response.statusCode === 200) {
        // ============================================= TODO: later chain the access here so it's not exposed!
        //console.log(response.body);
        res.send(response.body);

        /*body format: 
      {
        "access_token": "BQDv6Qj511_TWDsieMg02qyAsUgUwHYv2R_i9FpDRmSO_r3Y1qLUWFq8rJJk2uKwJShGK_LJYBamdhSMZ8o",
        "token_type": "Bearer",
        "expires_in": 3600,
        "scope": ""
      }
      */
      } else {
        console.log(err);
      }
    }
  );

  // TODO: use authString in a request to Spotify!
  //res.send({ todo: true });
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
