
// module
(function(){

  function UpvoteTrendTracker(){};

  function extractData(data){
    var N = data[0][0],
        K = data[0][1],
        upvotes = data[1];

    if (this.validateN(N)) { this.totalDays = N; }
    else {
      throw new Error('Given value for Total Days (N) is not valid!');
    }

    if (this.validateK(K, N)) { this.windowSize = K; }
    else {
      throw new Error('Given value for Window Size (K) is not valid!');
    }

    this.upvotes = upvotes;
  }

  function validateN(n){
    return 1 < n && n < 100000;
  }

  function validateK(k, n){
    return 1 < k && k < n;
  }

  function sequenceComparatorFactory(func){
    return function(sequence){
      for (var index = 0; index < sequence.length; index++){
        if (func(index, sequence)){
          return false;
        };
      }
      return true;
    }
  }

  var isNonIncreasing = sequenceComparatorFactory(function(index, sequence){
    return sequence[index] < sequence[index + 1];
  });

  var isNonDecreasing = sequenceComparatorFactory(function(index, sequence){
    return sequence[index] < sequence[index - 1];
  })

  function analyzeTrends(data){
    this.extractData(data);
    return [1,2,3];
  }

  _.extend(UpvoteTrendTracker.prototype, {
    extractData: extractData,
    validateN: validateN,
    validateK: validateK,
    isNonIncreasing: isNonIncreasing,
    isNonDecreasing: isNonDecreasing,
    analyzeTrends: analyzeTrends
  });

  window.UpvoteTrendTracker = UpvoteTrendTracker;

})();

// main program
window.addEventListener('load', function(){
});
