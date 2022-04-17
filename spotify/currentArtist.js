const fs = require('fs');

const { currentArtist_path } = require('../files');

function currentArtist(item) {
    let artistName = '';

    for (const id in item.artists) {
        artistName += `${item.artists[id]?.name}  `
    }

    console.log(`> [ARTIST]  ${artistName}`)

    escreverArtista(`${artistName}                             `)

    function escreverArtista(artista) {
        fs.writeFile(currentArtist_path, artista, (err) => {
            if (err) throw err;
        });
    }
}

exports.currentArtist = currentArtist;