import { startGame } from "./js/game.js";

import { initUI } from "./js/ui.js";


function start(){


    startGame();


    initUI();


}



window.addEventListener(

    "DOMContentLoaded",

    start

);
