mocha.setup('bdd');
chai.should();

describe('testFunc', function() {
  it('works!', function(){
    testFunc().should.equal(true);
  });
});


window.addEventListener('load', function(){
  mocha.run();
});
