const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const open = require('open');
require('dotenv').config()

const { saveAcessToken } = require('./saveAcessToken');
const { saveRefreshToken } = require('./saveRefreshToken');
const { login } = require('./api');

function getToken() {

    console.log(`> [SPOTIFY]  Enviando pedido de TOKEN.`)

    const scopes = [
        'user-read-currently-playing',
        'user-read-playback-state'
    ];

    const spotifyApi = new SpotifyWebApi({
        redirectUri: login[0].url,
        clientId: login[0].clientid,
        clientSecret: login[0].clientsecret
    });

    const app = express();

    app.get('/login', (req, res) => {
        res.redirect(spotifyApi.createAuthorizeURL(scopes));
    });

    app.get('/callback', (req, res) => {
        const error = req.query.error;
        const code = req.query.code;
        const state = req.query.state;

        if (error) {
            console.error('Callback Error:', error);
            res.send(`Callback Error: ${error}`);
            return;
        }

        spotifyApi
            .authorizationCodeGrant(code)
            .then(data => {
                const access_token = data.body['access_token'];
                const refresh_token = data.body['refresh_token'];
                const expires_in = data.body['expires_in'];

                spotifyApi.setAccessToken(access_token);
                spotifyApi.setRefreshToken(refresh_token);

                res.send('Pronto pode fechar esta pagina :D');
                closeServer();

                saveAcessToken(access_token);
                saveRefreshToken(refresh_token);


                setInterval(async () => {
                    const data = await spotifyApi.refreshAccessToken();
                    const access_token = data.body['access_token'];

                    console.log('Token Atualizado...');
                    spotifyApi.setAccessToken(access_token);
                    saveAcessToken(access_token);
                }, expires_in / 2 * 1000);

            })
            .catch(error => {
                res.send(`Erro ${error}`);
            });
    });

    var server = app.listen(8888, () =>
        console.log(
            'Faça login no Spotify'
        )
    );

    function closeServer() {
        server.close();
    }

    open('http://localhost:8888/login')

    console.log(`> [SPOTIFY]  TOKEN Recebido.`)

}

exports.getToken = getToken;