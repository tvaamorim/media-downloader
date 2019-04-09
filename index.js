import input from './robots/input.js';
import piratebay from './robots/piratebay.js';
import downloadManager from './robots/download-manager.js';

const start = async () => {
    const inputState = await input();
    // Passando como referencia, n precisa do return
    const mediaInfos = await piratebay(inputState);
    downloadManager(mediaInfos);


    console.log(JSON.stringify(inputState));
};

start();