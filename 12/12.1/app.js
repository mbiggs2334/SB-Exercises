class Vehicle{
    constructor (make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk (){
        return 'Beep';
    }
    toString (){
        return `The vehicle is a ${this.make} ${this.model} from the year ${this.year}.`;
    }
}

class Car extends Vehicle {
    constructor (make, model, year){
        super(make, model, year);
        this.numWheels = 4;
    }

}

class Motorcycle extends Vehicle {
    constuctor(make, model, year){
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine(){
        return 'VROOM!!!';
    }
}

class Garage {
    constuctor(cap){
        this.capacity = cap;
        this.vehicles = [];
    }
    add(x){
        if(!(x instanceof Vehicle)){
            return 'Only vehicles are allowed in here!';
        };
        if(this.vehicles.length >= this.capacity){
            return "Sorry, we're full!";
        }
        this.vehicles.push(x);
        return 'Vehicle added!';
    }
}