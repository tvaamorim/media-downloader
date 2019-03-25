const readlineSync = require('readline-sync');
const SERIE = 'serie';
const MOVIE = 'movie';

const input = () => {
    const suportedMediaTypes = [SERIE,MOVIE];
    const suportedMediaQuality = ['720p','1080p', '2160p'];

    const mediaTypeIndex = readlineSync.keyInSelect(suportedMediaTypes, 'Witch type of media do you want to download?');
    const mediaName = readlineSync.question(`What is the name of the ${suportedMediaTypes[mediaTypeIndex]}: `);
    let serieSerie, serieEpisodes;
    if (suportedMediaTypes[mediaTypeIndex] === SERIE) {
        serieSerie = readlineSync.questionInt(`Witch serie of ${mediaName}: `);
        serieEpisodes = readlineSync.question(`What episodes do you want of ${mediaName} S${serieSerie}: Range[1-5] All: 0 Specific[1,4,7]: `);    
    }
    const mediaQualityIndex = readlineSync.keyInSelect(suportedMediaQuality, 'Witch quality do you want to download?');

    console.log(`We will download the ${suportedMediaTypes[mediaTypeIndex]}, ${mediaName} S${serieSerie} E${serieEpisodes} in ${suportedMediaQuality[mediaQualityIndex]}`)
  
};

module.exports = input;
