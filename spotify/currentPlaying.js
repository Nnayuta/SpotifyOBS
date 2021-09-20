const fs = require('fs');

const { currentMusic_path } = require('../files');

function currentPlaying(playing) {
    fs.writeFile(currentMusic_path, `${playing}                             `, (err) => {
        if (err) throw err;
    });
}

exports.currentPlaying = currentPlaying;