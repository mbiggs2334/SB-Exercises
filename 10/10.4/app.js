//problem 1
function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

//problem 1 refactored for ES2015
const filterOutOdds2 = (...args) => args.filter(num => num % 2 === 0);

//findMin function
const findMin = (...args) => Math.min(...args);

// mergeObjects function
const mergeObject = (obj1, obj2) => ({...obj1, ...obj2});

//doubleAndReturnArgs function
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(num => num * 2)];

/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (...items) => {
    let numberOfIdx = (Math.floor(Math.random() * items.length));
    items.splice(numberOfIdx, 1);
    return items;
};

/** Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => ({...obj, [key]: val });

/** Return a new object with a key removed. */
const removeKey = (obj, key) => {
    newObj = {...obj};
    delete newObj[key];
    return newObj;
};

/** Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({...obj1, ...obj2});

/** Return a new object with a modified key and value. */
const update = (obj, key, val) => {
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
};