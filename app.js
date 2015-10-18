
// module
(function(){

  function UpvoteTrendTracker(){};

  function saveData(N, K, upvotes){
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

  function scoreSubranges(sequence){
    var score = 0;
    for (var rangeSize = sequence.length; rangeSize > 1; rangeSize--) {
      var numberOfSubranges = sequence.length - rangeSize + 1;

      for (var subrange = 0; subrange < numberOfSubranges; subrange++){
        var subrangeSlice = sequence.slice(subrange, subrange + rangeSize);
        if (this.isNonDecreasing(subrangeSlice)){ score++; }
        if (this.isNonIncreasing(subrangeSlice)){ score--; }
      }
    }
    return score;
  }

  function scoreWindows(upvoteCounts){
    var scores = [];
    var numberOfWindows = this.totalDays - this.windowSize + 1;

    for (var w = 0; w < numberOfWindows; w++){
      var windowSlice = upvoteCounts.slice(w, w + this.windowSize)
      scores.push(this.scoreSubranges(windowSlice));
    }

    return scores;
  }

  function analyzeTrends(N, K, upvotes){

    this.saveData(N, K, upvotes);
    return this.scoreWindows(this.upvotes);
  }

  _.extend(UpvoteTrendTracker.prototype, {
    saveData: saveData,
    validateN: validateN,
    validateK: validateK,
    isNonIncreasing: isNonIncreasing,
    isNonDecreasing: isNonDecreasing,
    scoreSubranges: scoreSubranges,
    scoreWindows: scoreWindows,
    analyzeTrends: analyzeTrends
  });

  window.UpvoteTrendTracker = UpvoteTrendTracker;

})();

window.addEventListener('load', function(){

  // Demonstration

  var upvoteTrendTracker = new UpvoteTrendTracker();

  var N = 5,
      K = 3,
      upvotes = [1, 2, 3, 1, 1];

  console.log(N + ' days worth of data');
  console.log('windows of ' + K + ' days');
  console.log('collected upvote data:', upvotes);
  console.log('resulting metrics: ', upvoteTrendTracker.analyzeTrends(N, K, upvotes));
});
