import stats from "../stats.js";


export function getFactories(){

    return stats.factories.list;

}


export function getFactoryCount(){

    return stats.factories.totalBuilt;

}


export function getActiveFactoryCount(){

    return stats.factories.activeFactories;

}


export function getFactory(id){

    return stats.factories.list.find(
        factory=>factory.id===id
    );

}


export function getFactoryMachines(id){

    const factory=getFactory(id);

    if(!factory){
        return [];
    }

    return stats.building.objects.filter(
        object=>object.factoryId===id
    );

}

const factoryData={

    basicFactory:{

        name:"기본 공장",

        cost:1000,

        size:{
            width:5,
            height:5
        }

    }

};


export function canBuildFactory(type){

    const factory=factoryData[type];

    if(!factory){
        return false;
    }

    return stats.economy.money>=factory.cost;

}



export function buildFactory(type,x,y){

    const factory=factoryData[type];


    if(!factory){
        return null;
    }


    if(!canBuildFactory(type)){
        return null;
    }


    stats.economy.money-=factory.cost;


    const newFactory={

        id:
        "factory_"+(stats.factories.totalBuilt+1),


        name:
        factory.name,


        level:1,


        active:true,


        position:{
            x:x,
            y:y
        },


        size:{
            width:factory.size.width,
            height:factory.size.height
        },


        efficiency:100,


        machines:[]

    };


    stats.factories.list.push(
        newFactory
    );


    stats.factories.totalBuilt++;


    stats.factories.activeFactories++;


    return newFactory;

}

export function isPositionAvailable(x,y,width,height){

    for(const object of stats.building.objects){

        const objectX=object.position.x;
        const objectY=object.position.y;


        if(
            x < objectX + object.size.width &&
            x + width > objectX &&
            y < objectY + object.size.height &&
            y + height > objectY
        ){

            return false;

        }

    }


    return true;

}



export function canPlaceFactory(type,x,y){

    const factory=factoryData[type];


    if(!factory){
        return false;
    }


    return isPositionAvailable(
        x,
        y,
        factory.size.width,
        factory.size.height
    );

}



export function moveFactory(id,x,y){

    const factory=getFactory(id);


    if(!factory){
        return false;
    }


    if(
        !isPositionAvailable(
            x,
            y,
            factory.size.width,
            factory.size.height
        )
    ){

        return false;

    }


    factory.position.x=x;

    factory.position.y=y;


    return true;

}

export function addBuildingObject(object){

    stats.building.objects.push(
        object
    );


    return object;

}



export function getBuildingObjects(){

    return stats.building.objects;

}



export function getFactoryLayout(id){

    const factory=getFactory(id);


    if(!factory){

        return [];

    }


    return stats.building.objects.filter(
        object=>object.factoryId===id
    );

}



export function registerFactoryPosition(factory){

    const object={

        id:factory.id,

        type:"factory",

        objectType:"factory",

        factoryId:factory.id,


        position:{

            x:factory.position.x,

            y:factory.position.y

        },


        size:{

            width:factory.size.width,

            height:factory.size.height

        }

    };


    addBuildingObject(object);


    return object;

}

export function canUseLand(x,y,width,height){

    if(!stats.land){
        return true;
    }


    const land=stats.land;


    for(const tile of land.locked){

        if(
            x < tile.x + tile.width &&
            x + width > tile.x &&
            y < tile.y + tile.height &&
            y + height > tile.y
        ){

            return false;

        }

    }


    return true;

}



export function getFactoryEfficiency(id){

    const factory=getFactory(id);


    if(!factory){
        return 0;
    }


    let efficiency=factory.efficiency;


    const machines=getFactoryMachines(id);


    if(machines.length===0){

        return efficiency;

    }


    let working=0;


    for(const machine of machines){

        if(machine.status==="working"){

            working++;

        }

    }


    efficiency=
    Math.floor(
        efficiency *
        (working / machines.length)
    );


    return efficiency;

}



export function setFactoryStatus(id,status){

    const factory=getFactory(id);


    if(!factory){

        return false;

    }


    factory.active=status;


    return true;

}



export function getWorkingFactories(){

    return stats.factories.list.filter(
        factory=>factory.active===true
    );

      }

export function getFactoryData(){

    return {

        factories:
        stats.factories.list,

        buildings:
        stats.building.objects,

        machines:
        stats.machines

    };

}



export function getBuildableFactories(){

    return Object.keys(
        factoryData
    );

}



export function getFactoryStatus(id){

    const factory=getFactory(id);


    if(!factory){

        return null;

    }


    return {

        id:factory.id,

        name:factory.name,

        level:factory.level,

        active:factory.active,

        position:factory.position,

        size:factory.size,

        efficiency:
        getFactoryEfficiency(id)

    };

}



export function removeFactory(id){

    const index=
    stats.factories.list.findIndex(
        factory=>factory.id===id
    );


    if(index===-1){

        return false;

    }


    stats.factories.list.splice(
        index,
        1
    );


    stats.building.objects=
    stats.building.objects.filter(
        object=>object.factoryId!==id
    );


    stats.factories.totalBuilt--;


    return true;

}
