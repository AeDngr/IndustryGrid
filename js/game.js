import stats from "./stats.js";

import {
    buildFactory
} from "./factory/factory.js";


export function startGame(){


    if(stats.gameStarted){

        return;

    }



    stats.machines.owned.miner=2;

    stats.machines.owned.conveyor=2;

    stats.machines.owned.sellStation=2;



    stats.inventory.machines.miner=2;

    stats.inventory.machines.conveyor=2;

    stats.inventory.machines.sellStation=2;



    buildFactory(
        "basicFactory",
        2,
        2
    );



    stats.gameStarted=true;


}
