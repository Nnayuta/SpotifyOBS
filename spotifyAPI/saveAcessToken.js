const { acess_TOKEN_path } = require('../files');
const fs = require('fs');

function saveAcessToken(accesstoken) {
    fs.writeFile(acess_TOKEN_path, accesstoken, (err) => {
        if (err) throw err;
        console.log('< [TOKEN] Acess Salvo');
    });
}
exports.saveAcessToken = saveAcessToken;