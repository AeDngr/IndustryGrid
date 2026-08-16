import stats from "./stats.js";

import {
    getAllFactoryInfo,
    buildFactory
} from "./factory/factory.js";


export function initUI(){


    document.body.innerHTML=`

<div id="header">

<div>
🏭 IndustryGrid
</div>

<div>
💰 <span id="money"></span>
🪙 <span id="coin"></span>
</div>

</div>


<div id="menu">

<button id="menuBtn">
☰
</button>


<div id="menuList">

<button id="factoryBtn">
🏭 공장
</button>

</div>


</div>


<div id="main">

</div>

`;



updateHeader();



document
.getElementById("factoryBtn")
.onclick=showFactory;



}



function updateHeader(){


document
.getElementById("money")
.textContent=
stats.economy.money;


document
.getElementById("coin")
.textContent=
stats.economy.coin;


}



function showFactory(){


const main=
document.getElementById("main");



const factories=
getAllFactoryInfo();



main.innerHTML=`

<h2>🏭 공장</h2>


<p>
보유 공장:
${factories.length}
</p>


<button id="buildFactory">
공장 건설
</button>


<div id="factoryGrid">

</div>

`;



createGrid();



document
.getElementById("buildFactory")
.onclick=()=>{


buildFactory(
"basicFactory",
5,
5
);


updateHeader();

showFactory();


};


}



function createGrid(){


const grid=
document.getElementById("factoryGrid");



for(let y=0;y<10;y++){


for(let x=0;x<10;x++){


const tile=
document.createElement("div");


tile.className="tile";


grid.appendChild(tile);


}

}


}
