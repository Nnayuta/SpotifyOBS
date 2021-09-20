const fs = require('fs');
const { getMusicImage } = require('./getMusicImage');
const { currentPlaying } = require('./currentPlaying');

const {currentArtist_path, placeholder_musicName_path, placeholder_imagem_path, placeholder_artistName_path} = require('../files');

function notCurrentPlaying() {

    let place_music = fs.readFileSync(placeholder_musicName_path).toString();
    let place_img = fs.readFileSync(placeholder_imagem_path).toString();

    currentPlaying(place_music);
    cleanArtist();
    getMusicImage(place_img)
    
}

function cleanArtist() {
    let clean = fs.readFileSync(placeholder_artistName_path);

    fs.writeFile(currentArtist_path, `${clean.toString()}`, (err) => {
        if (err) throw err;
    });
}

exports.notCurrentPlaying = notCurrentPlaying;