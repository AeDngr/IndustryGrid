const stats = {

player:{
    level:1,
    exp:0,
    maxExp:100
},


economy:{
    money:10000,
    coin:10
},


inventory:{

    resources:{
        iron:0,
        copper:0,
        coal:0
    },


    items:{},


    machines:{
        miner:0,
        furnace:0,
        assembler:0
    }

}

};


export default stats;

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

}

machines:{

    owned:{

        miner:0,
        furnace:0,
        assembler:0

    },


    installed:{

        miner:0,
        furnace:0,
        assembler:0

    },


    working:{

        miner:0,
        furnace:0,
        assembler:0

    },


    list:{

        miner:{

            name:"철광 채굴기",

            type:"resource",

            level:1,

            speed:1,

            efficiency:100

        },


        furnace:{

            name:"용광로",

            type:"process",

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

        }

    }

        }

production:{

    totalProduced:0,

    totalSold:0,

    history:{}

},


research:{

    unlocked:[],

    progress:{}

},


achievement:{

    unlocked:[],

    completed:0

},


contract:{

    active:[],

    completed:0

}

};
