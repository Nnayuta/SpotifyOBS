const { getMusicImage } = require('./getMusicImage');
const { currentPlaying } = require('./currentPlaying');
const { currentArtist } = require('./currentArtist');

function updateMusic(data) {

    //SALVA O NOME DA MUSICA ATUAL
    currentPlaying(data.body.item.name);
    //SALVA A IMAGEM DA MUSICA ATUAL
    getMusicImage(data.body.item.album.images[0].url)
    //Salva o nome de todos os artistas em um arquivo
    currentArtist(data.body.item);

    console.log(`> [MUSIC UPDATE] Atualizando informações das musicas!`)
}


exports.updateMusic = updateMusic;