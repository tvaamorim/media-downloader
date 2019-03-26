
export const SERIE = 'Serie';
export const MOVIE = 'Movie';

export const suportedMediaTypes = [SERIE,MOVIE];
export const suportedMediaQuality = ['720p','1080p', '2160p'];

const stateModel = {
    mediaType: undefined,
    mediaName: undefined,
    serieSerie: undefined,
    serieEpisodes: undefined,
    mediasInfos: [],
    mediaTorrentLink: [],
    mediaQuality: undefined,
}
export const getStateModel = () => Object.assign({},  stateModel);
