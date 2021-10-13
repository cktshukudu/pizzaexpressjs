
const shop = require('../pizza')
module.exports = function auth(){
const userNo = {};


function getuserConter(username){
    if(!userNo[username]){
        userNo[username] = shop();
    }else{
        return userNo[username];
    }
    
}
return{
    getuserConter
}
}