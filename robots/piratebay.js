import PirateBay from 'thepiratebay';
import { SERIE } from '../const.js'

const pirateBay = async inputState => await searchAllMedias(inputState.mediasInfos);

const search = async (mediaInfos) => {
    console.log('Buscando por', mediaInfos.name)
    const searchResults = await PirateBay.search(mediaInfos.name, {
      category: 'video',
      page: 0,
      orderBy: 'seeds',
      sortBy: 'desc',
      filter: {
        verified: false
      },
    })
    console.log(searchResults[0])
    mediaInfos.magnetLink = searchResults[0].magnetLink;
  }

const searchAllMedias = async mediasInfos => {
  for(let mediaInfos of mediasInfos){
    await search(mediaInfos);
  }
  return mediasInfos;
}
module.exports = pirateBay;
