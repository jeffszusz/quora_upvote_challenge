(function() {

  mocha.setup('bdd');
  chai.should();

  describe('upvoteTrendTracker', function() {

    var uTracker,
        N = 5,
        K = 3,
        upvotes = [1, 2, 3, 1, 1];

    before(function(){

      uTracker = new UpvoteTrendTracker();

    });

    describe('UpvoteTrendTracker', function(){

      it('should be an object', function(){
        uTracker.should.be.an('object');
      })

      it('should become populated with data when used', function(){
        uTracker.analyzeTrends(N, K, upvotes);
        uTracker.totalDays.should.equal(5);
        uTracker.windowSize.should.equal(3);
        uTracker.upvotes.should.eql(upvotes);
      });

    });

    describe('constraint validation', function(){

      describe('@validateN', function(){

        it('should fail validation if N is not greater than 1', function(){
          uTracker.validateN(0).should.be.false;
        });

        it('should fail validation if N is not less than 100,000', function(){
          uTracker.validateN(100000).should.be.false;
        });

        it('should pass if N is greater than 1 & less than 100,000', function(){
          uTracker.validateN(2).should.equal(true, 'greater than 1');
          uTracker.validateN(99999).should.equal(true, 'less than 100,000');
        });

      });

      describe('@validateK', function(){

        it('should fail validation if K is not greater than 1', function(){
          uTracker.validateK(0).should.be.false;
        });

        it('should fail validation if K is not less than N', function(){
          uTracker.validateK(100000).should.be.false;
        });

        it('should pass if K is greater than 1 & less than N', function(){
          uTracker.validateK(2, 5).should.equal(true, 'greater than 1');
          uTracker.validateK(99, 100).should.equal(true, 'less than N');
        });
      });
    });

    describe('scoring', function(){

      describe('@isNonIncreasing', function(){

        it('should return true given a sequence where each number is at least \
          as large as the next', function(){
            uTracker.isNonIncreasing([5,4,3,3,1]).should.be.true;
        });

        it('should return false given a sequence where any number is smaller \
          than the next', function(){
            uTracker.isNonIncreasing([5,4,3,4,1]).should.be.false;
        });

      });

      describe('@isNonDecreasing', function(){

        it('should return true given a sequence where each number is at least \
          as large as the previous', function(){
            uTracker.isNonDecreasing([1,2,2,3,4]).should.be.true;
        });

        it('should return false given a sequence where any number is smaller \
          than the previous', function(){
            uTracker.isNonDecreasing([1,2,3,2,4]).should.be.false;
        });

      });

      describe('@scoreSubranges', function(){
        it('should find the number of non-decreasing subranges minus the number\
          of non-increasing subranges', function(){
            uTracker.scoreSubranges([1,2,3]).should.equal(3);
            uTracker.scoreSubranges([2,3,1]).should.equal(0);
            uTracker.scoreSubranges([3,1,1]).should.equal(-2);
        });
      });

      describe('@scoreWindows', function(){
        it('should score each window found in a dataset', function(){
          uTracker.totalDays = 5;
          uTracker.windowSize = 3;
          uTracker.scoreWindows(upvotes).should.eql([3,0,-2]);
        });
      });

    })

    describe('@analyzeTrends', function(){

      it('should extract the given data', function(){
        uTracker.analyzeTrends(N, K, upvotes);
        uTracker.totalDays.should.be.defined;
        uTracker.windowSize.should.be.defined;
        uTracker.upvotes.should.be.defined;
      });

      it('should return an array of N - K + 1 integers', function(){
        uTracker.analyzeTrends(N, K, upvotes).should.be.an('array');
        uTracker.analyzeTrends(N, K, upvotes).length.should.equal(N-K+1);
      });

      it('should return expected output when given sample input', function(){
        uTracker.analyzeTrends(N, K, upvotes).should.eql([3,0,-2]);
      });


    });


  });

  window.addEventListener('load', function(){
    mocha.run();
  });

})();
