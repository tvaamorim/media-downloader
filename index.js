//import input from './robots/input.js';
import piratebay from './robots/piratebay.js';

const start = async () => {
    const state = await input();
    piratebay(state);
    //console.log(JSON.stringify(inputState));
};

start();