module.exports.checkSimilarity = function(one, two) {
    var longer = one;
    var shorter = two;
    if (one.length < two.length) {
      longer = two;
      shorter = one;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - degreeOfDifference(longer, shorter)) / parseFloat(longerLength);
}

function degreeOfDifference(one, two) {
    one = one.toUpperCase();
    two = two.toUpperCase();

    var costs = new Array();
    for (var i = 0; i <= one.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= two.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (one.charAt(i - 1) != two.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[two.length] = lastValue;
    }
    return costs[two.length];
}