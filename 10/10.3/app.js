//Problem 1
function double(arr) {
  return arr.map(function (val) {
    return val * 2;
  });
}
//refactored to arrow funcs
const func = (arr) => arr.map((val) => val * 2);

//Problem 2
function squareAndFindEvens(numbers) {
  var squares = numbers.map(function (num) {
    return num ** 2;
  });
  var evens = squares.filter(function (square) {
    return square % 2 === 0;
  });
  return evens;
}
//refactored to arrow funcs
const func2 = (numbers) => {
  const squares = numbers.map((num) => num ** 2);
  const evens = squares.filter((square) => square % 2 === 0);
  return evens;
};
