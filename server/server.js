const express = require("express");
const spotifyWebApi = require('spotify-web-api-node');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000/dashboard',
        clientId: '5c42b63580e74a5d98548a11638db40f',
        clientSecret: 'f7e812c4d6e14139b4b13c4f270b56d4',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            console.log('The access token has been refreshed!');
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        }).catch(() => {
            res.sendStatus(400);
        })



})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000/dashboard',
        clientId: '5c42b63580e74a5d98548a11638db40f',
        clientSecret: 'f7e812c4d6e14139b4b13c4f270b56d4'
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        console.log(data);
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }).catch(() => {
        res.sendStatus(400);
    })
})

app.listen(3001);