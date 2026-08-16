const stats={


gameStarted:false,


player:{

    level:1,

    exp:0,

    maxExp:100

},



economy:{

    money:10000,

    coin:10

},



settings:{

    language:"ko",

    autoSave:true

}


};


export default stats;

inventory:{


resources:{

    iron:0,

    copper:0,

    coal:0,

    stone:0,

    wood:0

},



items:{

    ironPlate:0,

    copperWire:0,

    gear:0,

    circuit:0

},



machines:{

    miner:2,

    conveyor:2,

    furnace:0,

    assembler:0,

    sellStation:2

}


},



recipes:{

    unlocked:[

        "ironPlate"

    ],


    list:{

        ironPlate:{

            input:{

                iron:2

            },

            output:1

        },


        copperWire:{

            input:{

                copper:2

            },

            output:1

        },


        gear:{

            input:{

                ironPlate:2

            },

            output:1

        },


        circuit:{

            input:{

                copperWire:2,

                gear:1

            },

            output:1

        }

    }

      }

storage:{

    capacity:100,

    items:{}

},



factories:{

    list:[],

    totalBuilt:0,

    activeFactories:0

},



building:{

    gridSize:{

        width:20,

        height:20

    },


    objects:[]

},



land:{

    unlockedArea:{

        width:10,

        height:10

    },


    locked:[],


    owned:[]



}

machines:{


owned:{

    miner:2,

    conveyor:2,

    furnace:0,

    assembler:0,

    sellStation:2

},



installed:{

    miner:0,

    conveyor:0,

    furnace:0,

    assembler:0,

    sellStation:0

},



working:{

    miner:0,

    conveyor:0,

    furnace:0,

    assembler:0,

    sellStation:0

},



list:{


    miner:{

        name:"채굴기",

        type:"mining",

        level:1,

        speed:1,

        efficiency:100

    },


    conveyor:{

        name:"컨베이어",

        type:"transport",

        level:1,

        speed:1,

        efficiency:100

    },


    furnace:{

        name:"용광로",

        type:"processing",

        level:1,

        speed:1,

        efficiency:100

    },


    assembler:{

        name:"조립기",

        type:"assembly",

        level:1,

        speed:1,

        efficiency:100

    },


    sellStation:{

        name:"판매소",

        type:"selling",

        level:1,

        speed:1,

        efficiency:100

    }


}


},



production:{


totalProduced:0,

totalProcessed:0,

history:{}


},



sales:{


totalSold:0,

totalRevenue:0,

history:{}


}

research:{

    unlocked:[],

    progress:{},

    list:{}

},



achievement:{

    unlocked:[],

    completed:0,

    rewards:{}

},



contract:{

    active:[],

    completed:0,

    history:{}

},



statistics:{

    playTime:0,

    totalMoneyEarned:0,

    totalMachinesBuilt:0,

    totalFactoriesBuilt:0,

    totalResourcesMined:0

},



save:{

    version:"0.3",

    lastSaved:null

}


};


export default stats;
