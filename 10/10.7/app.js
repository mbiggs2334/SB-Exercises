//problem 1
new Set([1,1,2,2,3,4]) // {1,2,3,4}

//problem 2
[...new Set("referee")].join("") // 'ref'

//problem 3
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false); // {arr => true, arr => false}

//problem 4
//hasDuplicate function
const hasDuplicate = arr => {
    let set = new Set(arr);
    return set.size < arr.length ? true : false;
};

//problem 5
//vowelCount functon
const vowelCount = str => {
    let map = new Map();
    const vowels = 'aeiou';
    for(let char of str){
        let lowerCase = char.toLowerCase();
        if(vowels.includes(lowerCase)){
          if(map.has(lowerCase)){
            map.set(lowerCase, map.get(lowerCase) + 1);
          } else {
            map.set(lowerCase, 1);
          }
        }
      }
      return map;
};