import input from './robots/input.js';
import piratebay from './robots/piratebay.js';

const start = async () => {
    const inputState = await input();
    // Passando como referencia, n precisa do return
    const mediaInfos = await piratebay(inputState);

    console.log(JSON.stringify(inputState));
    console.log(mediaInfos);
};

start();