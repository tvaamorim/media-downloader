import WebTorrent from 'webtorrent';
const client = new WebTorrent()

const downloadManager = mediasinfos => {
    for(let mediaInfos of mediasinfos) {
        client.add(mediaInfos.magnetLink, { path: `mediaDownloader/${mediaInfos.name}` }, torrent => {
          // Got torrent metadata!
          console.log('Client is downloading:', torrent.infoHash)
          console.log('Client is downloading:', torrent.filesystem)

          torrent.files.forEach( file => {
            // Display the file by appending it to the DOM. Supports video, audio, images, and
            // more. Specify a container element (CSS selector or reference to DOM node).
            //file.appendTo('body')
            //console.log(file)
          })
          torrent.on('download', function (bytes) {
            console.log('download speed: ' + torrent.downloadSpeed)
            console.log('progress: ' + torrent.progress)
          }) 
        })
    }
}




module.exports = downloadManager;
