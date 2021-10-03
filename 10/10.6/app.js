//destructuring

//problem 1
let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
let { numPlanets, yearNeptuneDiscovered } = facts;

console.log(numPlanets); // 8
console.log(yearNeptuneDiscovered); // 1846

//problem 2
let planetFacts = {
  numPlanets: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659,
};

let { numPlanets, ...discoveryYears } = planetFacts;

console.log(discoveryYears); // {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

//problem 3
function getUserData({ firstName, favoriteColor = "green" }) {
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({ firstName: "Alejandro", favoriteColor: "purple" }); // 'Your name is Alejandro and you like purple'
getUserData({ firstName: "Melissa" }); // 'Your name is Melissa and you like '
getUserData({}); // 'Your name is  and  you like '

//problem 4
let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // 'Maya'
console.log(second); // 'Marisa'
console.log(third); // 'Chi'

//problem 5
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings",
];

console.log(raindrops); // 'Raindrops on roses'
console.log(whiskers); // 'Whiskers on kittens
console.log(aFewOfMyFavoriteThings); // ['Bright copper kettles', 'Warm woolen mittens', 'Brown paper packages tied up with strings']

//problem 6
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]];

console.log(numbers); // [10, 30, 20]

//refactoring

//problem 7
var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
  var a = obj.numbers.a;
  var b = obj.numbers.b;

  //problem 7 refactored for ES2015
  const obj = {
      numbers: {
          a: 1,
          b: 2
      }
  };

  const {numbers: {a, b}} = obj;

  //problem 8
  var arr = [1, 2];
  var temp = arr[0];
  arr[0] = arr[1];
  arr[1] = temp;

  //problem 8 refactored for ES2015
  const arr = [1,2];
  [arr[1],arr[0]] =  [arr[0], arr[1]];

  //raceResults function
  const raceResults = ([first, second, third, ...rest]) => ({
      first, second, third, rest
  });

