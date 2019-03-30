import readlineSync from 'readline-sync';
import {
    SERIE,
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
        state.mediasInfos = await generateDownloadName(state.mediaName, state.serieSerie, state.serieEpisodes)
    } else {
        state.mediasInfos.push({ name: state.mediaName });
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

const generateDownloadName = async (mediaName, serie, serieEpisodes) => {
    const episodesArray = []
    if(serieEpisodes.indexOf('-') > -1){
        const range = serieEpisodes.split('-');
        const dif = range[1] - range[0];
        for(let episode = range[0]; episode <= range[1]; episode++){
            episodesArray.push({ 
                name: `${mediaName} S${pad(serie,2)}E${pad(episode,2)}`,
                serie,
                episode
            });
        } 
    } else if(serieEpisodes === '0') {
        // TODO no IMDB pegar a quantidade de episodios
        const maxEpisodes = 24
        for(let episode = 1; episode <= maxEpisodes; episode++){
            episodesArray.push({ 
                name: `${mediaName} S${pad(serie,2)}E${pad(episode,2)}`,
                serie,
                episode,
            });
        } 
    } else {
        const range = serieEpisodes.split(',');
        const dif = range[1] - range[0];
        for(let episode of range){
            episodesArray.push({
                name: `${mediaName} S${pad(serie,2)} E${pad(episode,2)}`,
                serie,
                episode,
            });
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
