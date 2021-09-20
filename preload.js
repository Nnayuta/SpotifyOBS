const fs = require('fs')
const { StartSpotify } = require('./spotify');
const { placeholder_musicName_path, placeholder_artistName_path, acess_TOKEN_path, placeholder_imagem_path } = require('./files');

const TOKEN = fs.readFileSync(acess_TOKEN_path).toString();
const fileMusic = fs.readFileSync(placeholder_musicName_path).toString();
const fileArtist = fs.readFileSync(placeholder_artistName_path).toString();
const filePlaceholderImage = fs.readFileSync(placeholder_imagem_path).toString();

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sToken').value = TOKEN;

    let startbutton = document.getElementById('sButton');

    startbutton.onclick = function () {
        StartSpotify();
        startbutton.innerText = 'CLOSE';
        startbutton.disabled = true;
    }

    let placeMusica = document.getElementById('placeMusica');
    let placeArtista = document.getElementById('placeArtista');
    let placeImage = document.getElementById('placeImage');

    placeMusica.value = fileMusic.trim();
    placeArtista.value = fileArtist.trim();
    placeImage.value = filePlaceholderImage;

    let placeButton = document.getElementById('placeSave');

    placeButton.onclick = function () {
        let musicWrite = placeMusica.value;
        let artistWrite = placeArtista.value;
        let imageWrite = placeImage.value;

        fs.writeFile(placeholder_musicName_path, `${musicWrite}                             `, (err) => {
            if (err) throw err;
        });

        fs.writeFile(placeholder_artistName_path, `${artistWrite}                             `, (err) => {
            if (err) throw err;
        });

        fs.writeFile(placeholder_imagem_path, `${imageWrite}`, (err) => {
            if (err) throw err;
        });
    }

})