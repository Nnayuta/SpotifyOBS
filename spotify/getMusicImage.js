const fs = require('fs');
const https = require('https');

const { currentImage_Path } = require('../files');

async function getMusicImage(url) {
    const file = fs.createWriteStream(currentImage_Path);
    const request = https.get(url, function (response) {
        response.pipe(file);
    })

    console.log(`> [IMG] Salvando imagem da musica`)
}

exports.getMusicImage = getMusicImage;