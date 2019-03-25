import readlineSync from 'readline-sync';
import {
    getStateModel,
    suportedMediaTypes,
    suportedMediaQuality,
} from '../const.js';


 const input = async () => {
    const state = getStateModel();

    state.mediaType = await suportedMediaTypes[askTheMediaType()];
    state.mediaQuality = await suportedMediaQuality[askTheMediaQuality()];
    state.mediaName = await askTheMediaName(state.mediaType);

    if( state.mediaType === SERIE) {
        const serieAndEpisode = await askTheSeriesAndEpisode(state);
        state.serieSerie = serieAndEpisode[0];
        state.serieEpisodes = serieAndEpisode[1];
        state.mediaNames = await generateDownloadName(state.mediaName, state.serieSerie, state.serieEpisodes)
    } else {
        state.mediaNames.push(mediaName);
    }

    console.log(`We will download the ${state.mediaType}, ${state.mediaName} in ${state.mediaQuality}`)
    return state;
};




const askTheMediaType = () => 
    readlineSync.keyInSelect(suportedMediaTypes, 'Witch type of media do you want to download?');

// TODO verificar nome com IMDB
const askTheMediaName = (mediaType) => 
    readlineSync.question(`What is the name of the ${mediaType}: `);

const askTheSeriesAndEpisode = async (state) => {
    let serieSerie, serieEpisodes;
    if (state.mediaType === SERIE) {
        serieSerie = readlineSync.questionInt(`Witch serie of ${state.mediaName}: `);
        serieEpisodes = readlineSync.question(`What episodes do you want of ${state.mediaName} S${serieSerie}: Range[1-5] | All: 0 | Specific[1,4,7]: `);    
    }
    return [serieSerie, serieEpisodes]
}

const askTheMediaQuality = () => 
    readlineSync.keyInSelect(suportedMediaQuality, 'Witch quality do you want to download?');

const generateDownloadName = async (mediaName, serieSerie, serieEpisodes) => {
    const episodesArray = []
    if(serieEpisodes.indexOf('-') > -1){
        const range = serieEpisodes.split('-');
        const dif = range[1] - range[0];
        for(let count = range[0]; count <= range[1]; count++){
            episodesArray.push(`${mediaName} S${pad(serieSerie,2)}E${pad(count,2)}`);
        } 
    } else if(serieEpisodes === '0') {
        // TODO no IMDB pegar a quantidade de episodios
        const maxEpisodes = 24
        for(let count = 1; count <= maxEpisodes; count++){
            episodesArray.push(`${mediaName} S${pad(serieSerie,2)}E${pad(count,2)}`);
        } 
    } else {
        const range = serieEpisodes.split(',');
        const dif = range[1] - range[0];
        for(let episode of range){
            episodesArray.push(`${mediaName} S${pad(serieSerie,2)} E${pad(episode,2)}`);
        } 
    }
    return episodesArray;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = input;
