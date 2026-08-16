import stats from "../stats.js";


const factoryTypes={

    basicFactory:{

        name:"기본 공장",

        cost:1000,

        size:{

            width:5,

            height:5

        }

    }

};



export function getFactories(){

    return stats.factories.list;

}



export function getFactory(id){

    return stats.factories.list.find(
        factory=>factory.id===id
    );

}



export function getFactoryTypes(){

    return factoryTypes;

}

export function canBuildFactory(type){

    const factory=factoryTypes[type];


    if(!factory){

        return false;

    }


    return stats.economy.money>=factory.cost;

}



export function buildFactory(type,x,y){

    const factory=factoryTypes[type];


    if(!factory){

        return null;

    }


    if(!canBuildFactory(type)){

        return null;

    }



    const newFactory={


        id:
        "factory_"+(stats.factories.totalBuilt+1),


        type:type,


        name:
        factory.name,


        level:1,


        active:true,


        position:{

            x:x,

            y:y

        },


        size:{

            width:
            factory.size.width,


            height:
            factory.size.height

        },


        efficiency:100,


        machines:[]

    };



    stats.economy.money -= factory.cost;



    stats.factories.list.push(
        newFactory
    );



    stats.factories.totalBuilt++;


    stats.factories.activeFactories++;



    registerFactoryObject(
        newFactory
    );


    return newFactory;

}



function registerFactoryObject(factory){


    stats.building.objects.push({


        id:factory.id,


        type:"factory",


        factoryId:factory.id,


        position:{

            x:factory.position.x,

            y:factory.position.y

        },


        size:{

            width:factory.size.width,

            height:factory.size.height

        }


    });


      }

export function isPositionAvailable(x,y,width,height,ignoreId=null){


    for(const object of stats.building.objects){


        if(object.id===ignoreId){

            continue;

        }



        const ox=object.position.x;

        const oy=object.position.y;


        const ow=object.size.width;

        const oh=object.size.height;



        if(

            x < ox + ow &&

            x + width > ox &&

            y < oy + oh &&

            y + height > oy

        ){

            return false;

        }

    }


    return true;

}



export function canPlaceFactory(type,x,y){


    const factory=factoryTypes[type];


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

            factory.size.height,

            id

        )

    ){

        return false;

    }



    factory.position.x=x;

    factory.position.y=y;



    const object=
    stats.building.objects.find(
        obj=>obj.id===id
    );



    if(object){

        object.position.x=x;

        object.position.y=y;

    }



    return true;

      }

export function canInstallMachine(factoryId,machineType,x,y){


    const factory=getFactory(factoryId);


    if(!factory){

        return false;

    }


    if(
        !stats.machines.owned[machineType]
    ){

        return false;

    }



    const machineSize={

        width:1,

        height:1

    };



    return isPositionAvailable(

        x,

        y,

        machineSize.width,

        machineSize.height

    );

}



export function installMachine(factoryId,machineType,x,y){


    if(
        !canInstallMachine(
            factoryId,
            machineType,
            x,
            y
        )
    ){

        return null;

    }



    const factory=getFactory(factoryId);



    const machine={


        id:
        "machine_"+(
            stats.machines.installed[machineType]+1
        ),


        type:machineType,


        factoryId:factoryId,


        position:{

            x:x,

            y:y

        },


        status:"idle"

    };



    factory.machines.push(
        machine
    );



    stats.building.objects.push({


        id:machine.id,


        type:"machine",


        machineType:machineType,


        factoryId:factoryId,


        position:{

            x:x,

            y:y

        },


        size:{

            width:1,

            height:1

        }


    });



    stats.machines.installed[machineType]++;


    return machine;

}



export function moveMachine(id,x,y){


    const object=
    stats.building.objects.find(
        obj=>obj.id===id
    );


    if(!object){

        return false;

    }



    if(

        !isPositionAvailable(

            x,

            y,

            object.size.width,

            object.size.height,

            id

        )

    ){

        return false;

    }



    object.position.x=x;

    object.position.y=y;



    const factory=
    getFactory(
        object.factoryId
    );



    if(factory){


        const machine=
        factory.machines.find(
            m=>m.id===id
        );


        if(machine){

            machine.position.x=x;

            machine.position.y=y;

        }

    }


    return true;

}



export function removeMachine(id){


    let targetFactory=null;


    for(const factory of stats.factories.list){


        const index=
        factory.machines.findIndex(
            machine=>machine.id===id
        );


        if(index!==-1){


            targetFactory=factory;


            const machine=
            factory.machines[index];


            stats.machines.installed[
                machine.type
            ]--;


            factory.machines.splice(
                index,
                1
            );


            break;

        }

    }



    stats.building.objects=
    stats.building.objects.filter(
        object=>object.id!==id
    );


    return targetFactory!==null;

          }

export function setFactoryStatus(id,status){


    const factory=getFactory(id);


    if(!factory){

        return false;

    }



    factory.active=status;



    for(const machine of factory.machines){


        if(status){

            machine.status="working";

        }
        else{

            machine.status="idle";

        }

    }



    updateMachineStatus();


    return true;

}



export function toggleFactory(id){


    const factory=getFactory(id);


    if(!factory){

        return false;

    }



    setFactoryStatus(
        id,
        !factory.active
    );


    return true;

}



export function updateMachineStatus(){


    stats.machines.working={

        miner:0,

        conveyor:0,

        furnace:0,

        assembler:0,

        sellStation:0

    };



    for(const factory of stats.factories.list){


        if(!factory.active){

            continue;

        }



        for(const machine of factory.machines){


            if(
                machine.status==="working"
            ){


                if(
                    stats.machines.working[
                        machine.type
                    ] !== undefined
                ){

                    stats.machines.working[
                        machine.type
                    ]++;

                }

            }

        }

    }

}



export function getWorkingFactories(){


    return stats.factories.list.filter(

        factory=>factory.active===true

    );

}



export function getFactoryEfficiency(id){


    const factory=getFactory(id);


    if(!factory){

        return 0;

    }



    if(factory.machines.length===0){

        return 100;

    }



    let working=0;



    for(const machine of factory.machines){


        if(
            machine.status==="working"
        ){

            working++;

        }

    }



    return Math.floor(

        working /
        factory.machines.length
        *100

    );

}

export function getFactoryInfo(id){

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

        machines:factory.machines,

        efficiency:
        getFactoryEfficiency(id)

    };

}



export function getAllFactoryInfo(){

    return stats.factories.list.map(

        factory=>({

            id:factory.id,

            name:factory.name,

            active:factory.active,

            position:factory.position,

            machines:factory.machines.length

        })

    );

}



export function deleteFactory(id){


    const index=
    stats.factories.list.findIndex(

        factory=>factory.id===id

    );


    if(index===-1){

        return false;

    }



    const factory=
    stats.factories.list[index];



    for(const machine of factory.machines){


        stats.machines.installed[
            machine.type
        ]--;

    }



    stats.building.objects=
    stats.building.objects.filter(

        object=>object.factoryId!==id

    );



    stats.factories.list.splice(
        index,
        1
    );


    stats.factories.activeFactories--;


    return true;

}
