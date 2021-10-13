const assert = require('assert');
//const { isTypedArray } = require('util/types');

const Pizzza = require('../pizza');

describe('Small Pizza', function(){
    it('should be able to check small pizza total when press buy button:', function(){
        const pizza_cart = Pizzza();
        pizza_cart.sPizza('small');
        assert.equal(30.00, pizza_cart.getTotalSmall());
    
});
describe('Medium pizza', function(){
it('should be able to check medium pizza total when press buy button:', function(){
    const pizza_cart = Pizzza();
    pizza_cart.mPizza('medium');
    assert.equal(60.00, pizza_cart.getTotalMedium());
});

describe('Large pizza', function(){
    it('should be able to check large pizza total when press buy button:', function(){
        const pizza_cart = Pizzza();
        pizza_cart.lPizza('large');
        assert.equal(90.00, pizza_cart.getTotalLarge());
    });
    
});


});
});