import input from './robots/input.js';

const start = async () => {
    const inputState = await input();

    console.log(JSON.stringify(inputState));
};

start();