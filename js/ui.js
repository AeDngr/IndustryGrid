import stats from "./stats.js";

import {
    getFactories,
    buildFactory,
    canPlaceFactory
} from "./factory/factory.js";


function createUI(){

    const app=document.body;


    app.innerHTML=`
    
    <div id="header">
        <span>IndustryGrid</span>
        <span>
        💰 ${stats.economy.money}
        🪙 ${stats.economy.coin}
        </span>
    </div>


    <div id="menu">

        <button id="factoryMenu">
        🏭 공장
        </button>

    </div>


    <div id="content"></div>

    `;


    document
    .getElementById("factoryMenu")
    .onclick=showFactory;


}



function showFactory(){

    const content=
    document.getElementById("content");


    const factories=
    getFactories();


    content.innerHTML=`

    <h2>🏭 공장</h2>


    <p>
    보유 공장:
    ${factories.length}
    </p>


    <button id="buildButton">
    공장 건설
    </button>


    <div id="factoryArea"></div>

    `;


    document
    .getElementById("buildButton")
    .onclick=startBuildMode;


}



function startBuildMode(){

    const area=
    document.getElementById("factoryArea");


    area.innerHTML="";


    const title=document.createElement("h3");

    title.textContent=
    "배치할 위치를 선택하세요";

    area.appendChild(title);



    const grid=
    document.createElement("div");


    grid.id="grid";


    for(let y=0;y<10;y++){


        for(let x=0;x<10;x++){


            const tile=
            document.createElement("button");


            tile.className="tile";


            tile.onclick=()=>{

                placeFactory(x,y);

            };


            grid.appendChild(tile);

        }

    }


    area.appendChild(grid);

}



function placeFactory(x,y){


    if(
        !canPlaceFactory(
            "basicFactory",
            x,
            y
        )
    ){

        alert("건설 불가능한 위치");

        return;

    }


    const factory=
    buildFactory(
        "basicFactory",
        x,
        y
    );


    if(factory){

        alert(
        "공장 건설 완료"
        );

        showFactory();

    }

}



createUI();
