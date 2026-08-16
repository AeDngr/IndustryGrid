import stats from "./stats.js";

import {
    buildFactory
} from "./factory/factory.js";


function startGame(){

    if(stats.gameStarted){
        return;
    }


    stats.inventory.machines.miner=2;
    stats.inventory.machines.conveyor=2;
    stats.inventory.machines.sellStation=2;


    stats.machines.owned.miner=2;
    stats.machines.owned.conveyor=2;
    stats.machines.owned.sellStation=2;


    buildFactory(
        "basicFactory",
        5,
        5
    );


    stats.gameStarted=true;


    console.log(
        "Factory Grid Start"
    );

}


startGame();
