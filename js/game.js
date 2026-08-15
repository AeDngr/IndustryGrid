import stats from "./stats.js";


function updateMoney(){

const money=document.getElementById("money");

if(money){

money.textContent=
stats.economy.money.toLocaleString();

}

}


function updateCoin(){

const coin=document.getElementById("coin");

if(coin){

coin.textContent=
stats.economy.coin.toLocaleString();

}

}


function updateLevel(){

const level=document.getElementById("level");

if(level){

level.textContent=
stats.player.level;

}

}


function updateExp(){

const exp=document.getElementById("exp");

if(exp){

exp.textContent=
stats.player.exp+
"/"+
stats.player.nextExp;

}

}


function updateGameUI(){

updateMoney();

updateCoin();

updateLevel();

updateExp();

}


function addExp(amount){

stats.player.exp+=amount;


if(stats.player.exp>=stats.player.nextExp){

stats.player.level++;

stats.player.exp=0;

stats.player.nextExp=
Math.floor(stats.player.nextExp*1.2);

}

updateGameUI();

}



function gameStart(){

updateGameUI();

setInterval(()=>{

stats.player.playTime++;

},1000);

}



export {
updateGameUI,
addExp,
gameStart
};
