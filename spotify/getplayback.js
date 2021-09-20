const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
// Funcoes
const { updateMusic } = require('./updateMusic');
const { notCurrentPlaying } = require('./notCurrentPlaying');

const { acess_TOKEN_path } = require('../files');

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.URL,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
});

function getPlayBack() {

    let playingMusic = '';
    let notChangedMusic = false;

    let paused = 1;
    let unpaused = 1;

    setInterval(() => {
        //ACESSTOKEN
        const acessTOKEN = fs.readFileSync(acess_TOKEN_path).toString();
        spotifyApi.setAccessToken(acessTOKEN);

        spotifyApi.getMyCurrentPlaybackState()
            .then(function (data) {
                if (data.body) {
                    if (data.body.is_playing) {

                        if (playingMusic != data.body.item.name) {
                            updateMusic(data);
                            playingMusic = data.body.item.name;
                            console.log(`> [PLAYING] - ${playingMusic}`);
                        }
                        else if (notChangedMusic == true && paused == 1) {
                            updateMusic(data);
                            console.log(`> [UNPAUSE] - ${playingMusic}`);
                            paused = 0;
                            unpaused = 1;
                        }

                    } else {
                        notCurrentPlaying();
                        if (playingMusic && unpaused == 1) {
                            console.log(`> [PAUSE] - ${playingMusic}`);
                            notChangedMusic = true;
                            paused = 1;
                            unpaused = 0;
                        }
                    }
                }
            }, function (err) {
                console.log(err);
            });

    }, 1000); // verifica a cada meio segundo
}

exports.getPlayBack = getPlayBack;