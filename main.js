import { startGame } from "./js/game.js";
import { initUI } from "./js/ui.js";

function start(){

    initUI();
    startGame();

}

window.addEventListener(
    "DOMContentLoaded",
    start
);
