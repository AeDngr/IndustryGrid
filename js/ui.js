import stats from "./stats.js";


export function initUI(){

const app=document.getElementById("app");

app.innerHTML=`

<div>
<h2>테스트 UI</h2>

<div>
돈:
<span id="uiMoney"></span>
</div>

<div>
레벨:
<span id="uiLevel"></span>
</div>

<div>
EXP:
<span id="uiExp"></span>
</div>

<div>
인벤토리:
<div id="uiInventory"></div>
</div>

<button id="testButton">
테스트 생산
</button>

</div>

`;

document
.getElementById("testButton")
.onclick=()=>{

window.dispatchEvent(
new Event("testReward")
);

};


updateUI();

}



export function updateUI(){

document.getElementById("uiMoney").textContent=
stats.economy.money;


document.getElementById("uiLevel").textContent=
stats.player.level;


document.getElementById("uiExp").textContent=
stats.player.exp;


const inventory=
document.getElementById("uiInventory");


inventory.textContent=
JSON.stringify(
stats.resources.owned
);

}
