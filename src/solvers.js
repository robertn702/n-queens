/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
//  n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++){
    solution.togglePiece(i, i);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed
// such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var f = [];
  function factorial(d) {
    if (d === 0 || d === 1) {
      return 1;
    }
    if (f[d] > 0) {
      return f[d];
    }
    return f[d] = factorial(d-1) * d;
  }
  // var solutionCount = 1; //fixme
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});
  if (n === 0) {
    return solution.rows();
  }

  var solutionFinder = function(iRow){
    // iRow = iRow || 0;
    for (var iCol = 0; iCol < n; iCol++){
      solution.togglePiece(iRow, iCol);
      if (!solution.hasAnyQueenConflictsOn(iRow, iCol)) {
        if (iRow === n - 1) {
          return true;
        }

        if (solutionFinder(iRow + 1)){
          return true;
        }
      }
      solution.togglePiece(iRow, iCol);
    }

    return false;
  };
  solutionFinder(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such
// that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n});
  var solutionCount = 0;

  if (n === 0) {
    return 1;
  }

  var solutionFinder = function(iRow){
    iRow = iRow || 0;
    for (var iCol = 0; iCol < n; iCol++){
      solution.togglePiece(iRow, iCol);
      if (!solution.hasAnyQueenConflictsOn(iRow, iCol)) {
        if (iRow === n - 1) {
          solutionCount++;
        } else {
          solutionFinder(iRow + 1);
        }
      }
      solution.togglePiece(iRow, iCol);
    }
  };
  solutionFinder();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  return solutionCount;
};
