const { refresh_TOKEN_path } = require('../files')
const fs = require('fs');

function saveRefreshToken(refreshtoken) {
    fs.writeFile(refresh_TOKEN_path, refreshtoken, (err) => {
        if (err) throw err;
        console.log('< [TOKEN] Refresh Salvo');
    });
}

exports.saveRefreshToken = saveRefreshToken;