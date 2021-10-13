module.exports = function pizzaShop(){
let totalSmall = 0;
let totalMedium = 0;
let totalLarge = 0;
let totalPizza = 0;

let sQnty = 0;
let mQnty = 0;
let lQnty = 0;
//let totalCost = 0;


function sPizza(menueOption){
if(menueOption == 'small'){
    totalSmall += 30.00
    totalPizza += 30.00
    sQnty++
}else{
    totalSmall -= 30.00
    totalPizza -= 30.00
    sQnty--
}
}
function mPizza(menueOption){
    if(menueOption == 'medium'){
        totalMedium += 60.00
        totalPizza += 60.00
        mQnty++
    }else{
        totalMedium -= 60.00
        totalPizza -= 60.00
        mQnty--
    }
}
function lPizza(menueOption){
    if(menueOption == 'large'){
        totalLarge += 90.00
        totalPizza += 90.00
        lQnty++
    }else{
        totalLarge -= 90.00
        totalPizza -= 90.00
        lQnty-- 
    }
}
function getTotalSmall(){
    return totalSmall.toFixed(2)
}
function getTotalMedium(){
    return totalMedium.toFixed(2)
}
function getTotalLarge(){
    return totalLarge.toFixed(2)
}
function getGrandTotal(){
    return totalPizza.toFixed(2)
}
function getsmallQ(){
    return sQnty
}
function getmedQ(){
    return mQnty
}
function getlargeQ(){
    return lQnty
}
return{
    sPizza,
    mPizza,
    lPizza,
    getTotalSmall,
    getTotalMedium,
    getTotalLarge,
    getGrandTotal,
    sQnty,
    getsmallQ,
    getmedQ,
    getlargeQ
    
}
}
