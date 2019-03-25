import PirateBay from 'thepiratebay';

const pirateBay = () => {

const search = async () => {
    const searchResults = await PirateBay.search('The Walking Dead S09E06 720p', {
      category: 'video',
      page: 0,
      orderBy: 'seeds',
      sortBy: 'desc',
      filter: {
        verified: false
      },
    })
    console.log(searchResults)
    console.log('---------------------');
    const torrent = await PirateBay.getTorrent(searchResults[0].id);
    
    console.log(torrent)
  }

search();

}

module.exports = pirateBay;
