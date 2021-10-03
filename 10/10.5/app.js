//problem 1
// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }

//problem 1 refactored for ES2015

const createInstructor = (firstName, lastName) => ({
    firstName,
    lastName
});

//problem 2
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"

//problem 2 refactored for ES2015
const instructor2 = {name: 'Matt'};
const instructorFavNum = (obj, num) => ({
    ...obj,
    [num]: 'That is my favorite!'
});

//problem 3
var instructor = {
    firstName: "Colt",
    sayHi: function(){
      return "Hi!";
    },
    sayBye: function(){
      return this.firstName + " says bye!";
    }
  }

//problem 3 refactored for ES2015
const instructor3 = {
    firstName: 'Matt',
    sayHi() {
        return 'Hi!';
    },
    sayBye() {
        return this.firstName + ' says bye!';
    }
};

const newAnimal = (species, verb, noise) => ({
    species,
    [verb]: function aniNoise(){
        return noise
    }
})