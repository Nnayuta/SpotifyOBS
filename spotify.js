const fs = require('fs');
const { getToken } = require('./spotifyAPI/gettoken');
const { getPlayBack } = require('./spotify/getplayback');

const { last_data_token_path } = require('./files');

function StartSpotify() {


    getToken();

    setTimeout(() => {
        getPlayBack();
    }, 5000);

}

exports.StartSpotify = StartSpotify;



    /*
    Função antiga de verificar o token!

        const current_time = Date.now();
        const lastData = Number(fs.readFileSync(last_data_token_path));
        const cooldown_amount = 3600 * 1000;
        const expiration_time = lastData + cooldown_amount;
    
        if (current_time > expiration_time) {
            fs.writeFile(last_data_token_path, current_time.toString(), (err) => {
                if (err) throw err;
            });
    
            getToken();
        } else {
            console.log('Seu token ainda é atual');
        }
    
        setTimeout(() => {
            getPlayBack();
        }, 5000);
    
        */