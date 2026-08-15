import stats from "./stats.js";
import {updateUI} from "./ui.js";


export function startGame(){

window.addEventListener(
"testReward",
rewardTest
);


updateUI();

}



function rewardTest(){

stats.addMoney(100);


stats.player.exp+=20;


checkLevel();


updateUI();

}



function checkLevel(){

let need=
stats.player.level*100;


if(stats.player.exp>=need){

stats.player.level++;

stats.player.exp-=need;

}

}
