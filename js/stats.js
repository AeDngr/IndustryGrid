const stats={
player:{
name:"Player",
level:1,
exp:0,
playTime:0,
joinDate:null,
lastLogin:null
},

economy:{
money:10000,
coin:10,
totalMoneyEarned:0,
totalMoneySpent:0,
totalCoinEarned:10,
totalCoinSpent:0,
storePurchase:0,
researchInvestment:0,
salesProfit:0
},

production:{
totalProduced:0,
totalSold:0,
totalDiscarded:0,
hourlyProduction:0,
hourlyProfit:0,
factoriesRunning:0
},

resources:{
owned:{},
mined:{},
used:{},
purchased:{},
storage:0,
maxStorage:100
},

products:{
produced:{},
sold:{},
unlocked:[],
recipesUnlocked:[]
},

factories:{
owned:[],
levels:{},
productionCount:{},
operationTime:{},
totalOperationTime:0
},

research:{
unlocked:[],
completed:[],
points:0,
pointsUsed:0
},

market:{
sales:0,
purchases:0,
contractsCompleted:0,
contractsFailed:0,
contractReward:0
},

achievements:{
unlocked:[],
rewardReceived:0,
rareCompleted:0
},

automation:{
machines:0,
upgrades:0,
autoSell:0,
autoBuy:0,
profit:0,
savedTime:0
},

crafting:{
combineCount:0,
successCount:0,
failCount:0,
bestRecipe:""
},

  logistics:{
movedResources:0,
processedResources:0,
storageUsed:0,
storageUpgradeCount:0
},

efficiency:{
production:0,
factory:0,
resource:0,
investment:0,
automation:0
},

growth:{
levelUpCount:0,
unlockedContents:0,
progress:0
},

session:{
totalSessions:0,
averageTime:0,
longest:0,
shortest:0,
lastLocation:""
},

records:{
highestMoney:10000,
highestLevel:1,
highestProduction:0,
highestSale:0,
highestProfit:0
},

rare:{
firstCoinDate:null,
firstResearchDate:null,
firstFactoryDate:null,
firstAutomationDate:null,
rareItemCount:0
},

system:{
version:"1.0",
lastUpdate:null,
eventCount:0,
errorCount:0,
resetCount:0
}
};


stats.addMoney=function(a){
stats.economy.money+=a;
stats.economy.totalMoneyEarned+=a;

if(stats.economy.money>stats.records.highestMoney)
stats.records.highestMoney=stats.economy.money;
};


stats.spendMoney=function(a){
if(stats.economy.money>=a){
stats.economy.money-=a;
stats.economy.totalMoneySpent+=a;
return true;
}

return false;
};


stats.addCoin=function(a){
stats.economy.coin+=a;
stats.economy.totalCoinEarned+=a;
};


stats.spendCoin=function(a){
if(stats.economy.coin>=a){
stats.economy.coin-=a;
stats.economy.totalCoinSpent+=a;
return true;
}

return false;
};


stats.addProduction=function(i,a){
stats.production.totalProduced+=a;

stats.products.produced[i]=
(stats.products.produced[i]||0)+a;

if(stats.production.totalProduced>
stats.records.highestProduction)

stats.records.highestProduction=
stats.production.totalProduced;
};


stats.addSale=function(i,a,m){
stats.production.totalSold+=a;

stats.economy.money+=m;

stats.economy.totalMoneyEarned+=m;

stats.economy.salesProfit+=m;

stats.products.sold[i]=
(stats.products.sold[i]||0)+a;

stats.market.sales++;
};

stats.addResource=function(n,a){
stats.resources.owned[n]=
(stats.resources.owned[n]||0)+a;
};


stats.useResource=function(n,a){

if((stats.resources.owned[n]||0)>=a){

stats.resources.owned[n]-=a;

stats.resources.used[n]=
(stats.resources.used[n]||0)+a;

return true;

}

return false;

};


stats.completeResearch=function(n){

if(!stats.research.completed.includes(n))

stats.research.completed.push(n);

};


stats.addFactory=function(n){

if(!stats.factories.owned.includes(n)){

stats.factories.owned.push(n);

stats.factories.levels[n]=1;

}

};


stats.unlockAchievement=function(n){

if(!stats.achievements.unlocked.includes(n))

stats.achievements.unlocked.push(n);

};


stats.addRecipe=function(n){

if(!stats.products.recipesUnlocked.includes(n))

stats.products.recipesUnlocked.push(n);

};


stats.addAutomation=function(){

stats.automation.machines++;

};


stats.updateStorage=function(amount){

stats.resources.storage+=amount;

if(stats.resources.storage>stats.resources.maxStorage)

stats.resources.storage=stats.resources.maxStorage;

stats.logistics.storageUsed=
stats.resources.storage;

};


stats.getData=function(){

return stats;

};


export default stats;
