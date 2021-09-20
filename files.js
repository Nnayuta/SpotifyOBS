
const dir = './obs'
const dir_placeholder = `${dir}/placeholder`

const token_dir = './token'

// Place holders

const placeholder_musicName_path = `${dir}/placeholder/music.nayu`;
const placeholder_artistName_path = `${dir}/placeholder/artist.nayu`;
const placeholder_imagem_path = `${dir}/placeholder/image.nayu`;

exports.placeholder_musicName_path = placeholder_musicName_path;
exports.placeholder_artistName_path = placeholder_artistName_path;
exports.placeholder_imagem_path = placeholder_imagem_path;

// TOKEN's e Hora do ultimo token gerado

const acess_TOKEN_path = `${token_dir}/access_token.nayu`;
const refresh_TOKEN_path = `${token_dir}/refresh_token.nayu`;
const last_data_token_path = `${token_dir}/last_data_token.nayu`;

exports.acess_TOKEN_path = acess_TOKEN_path;
exports.refresh_TOKEN_path = refresh_TOKEN_path;
exports.last_data_token_path = last_data_token_path;

//PLAYING

const currentArtist_path = `${dir}/currentArtist.txt`;
const currentMusic_path = `${dir}/currentMusic.txt`;
const currentImage_Path = `${dir}/musicaAtual.png`;

exports.currentArtist_path = currentArtist_path;
exports.currentMusic_path = currentMusic_path;
exports.currentImage_Path = currentImage_Path;

const fs = require('fs')
const { getMusicImage } = require('./spotify/getMusicImage');

function createFiles() {

    //verificar se existe a pasta obs dentro do diretorio padrao do programa
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    } catch (err) {
        console.log(err)
    }
    //verificar se existe a pasta placeholder dentro de obs
    try {
        if (!fs.existsSync(dir_placeholder)) {
            fs.mkdirSync(dir_placeholder)
        }
    } catch (err) {
        console.log(err)
    }

    try {
        if (!fs.existsSync(token_dir)) {
            fs.mkdirSync(token_dir)
        }
    } catch (err) {
        console.log(err)
    }

    // TOKEN ARQUIVOS

    try {
        fs.readFileSync(last_data_token_path);
        fs.readFileSync(acess_TOKEN_path);
        fs.readFileSync(refresh_TOKEN_path);
    } catch {
        fs.writeFile(last_data_token_path, '', (err) => {
            if (err) throw err;
        });
        fs.writeFile(acess_TOKEN_path, '', (err) => {
            if (err) throw err;
        });

        fs.writeFile(refresh_TOKEN_path, '', (err) => {
            if (err) throw err;
        });
    }

    // PlaceHolder Arquivos

    //Verifica se o arquivo de imagem existe se não cria uma padrao
    try {
        fs.readFileSync(placeholder_imagem_path);
    } catch {
        fs.writeFile(placeholder_imagem_path, 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png', (err) => {
            if (err) throw err;
        });
    }

    // Verifica se o arquivo de placeholder musica existe e não cria uma padrao

    try {
        fs.readFileSync(placeholder_musicName_path);
    } catch {
        fs.writeFile(placeholder_musicName_path, '', (err) => {
            if (err) throw err;
        });
    }

    //Verifica se o arquivo de placeholder de artista existe se não cria um padrao

    try {
        fs.readFileSync(placeholder_artistName_path);
    } catch {
        fs.writeFile(placeholder_artistName_path, '', (err) => {
            if (err) throw err;
        });
    }


    // Playing

    //Cria a imagem padrao

    try {
        fs.readFileSync(currentImage_Path);
    } catch {
        setInterval(() => {
            let url = fs.readFileSync(placeholder_imagem_path).toString();
            getMusicImage(url);
        }, 2000);
    }

    //Cria o Arquivo de texto de musica padrao.

    try {
        fs.readFileSync(currentMusic_path);
    } catch {
        fs.writeFile(currentMusic_path, '', (err) => {
            if (err) throw err;
        });
    }

    //Cria o arquivo de texto de artista padrao
    try {
        fs.readFileSync(currentArtist_path);
    } catch {
        fs.writeFile(currentArtist_path, '', (err) => {
            if (err) throw err;
        });
    }
}

exports.createFiles = createFiles;