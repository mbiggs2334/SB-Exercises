
class NumbersArray {
    constructor(numbers){
        this.stringNums = numbers,
        this.getIntegersFromString(numbers)
    };
    
    getIntegersFromString(nums){
        this.intNums = nums.split(',').filter(n => n !== ' ' ? n : null).map(n => parseInt(n));
        this.checkForNaN(this.intNums);
        this.getMean(this.intNums);
        this.getMedian(this.intNums);
        this.getMode(this.intNums);
    };

    getMean(nums){
        
        this.mean = nums.reduce((num, nxt) => num + nxt) / nums.length;
    };

    getMedian(nums){
        let median;
        function compareNumbers(a,b){
            return a - b;
        };
        let sortedNums = nums.sort(compareNumbers);
        if(sortedNums.length % 2 === 0){
            this.median = (sortedNums[sortedNums.length / 2] + sortedNums[(sortedNums.length / 2) - 1]) / 2;
        } else {
            this.median = sortedNums[Math.ceil(sortedNums.length / 2) - 1]
        };
    };

    getMode(nums){
        let numMap = new Map();
        let mode = nums[0];
        nums.forEach(num => {
            if(numMap.has(num)){
                numMap.set(num, numMap.get(num) + 1);
            } else {
                numMap.set(num, 1);
            };
        });
        for(let key of numMap.keys()){
            if(numMap.get(mode) < numMap.get(key)){
                mode = key;
            };
        };
        this.mode = mode;
    };

    checkForNaN(nums){
        let idx = [];

        for(let i = 0; i < nums.length; i++){
            if(isNaN(nums[i])) {
                idx.push(this.stringNums.split(',').filter(n => n !== ' ' ? n : null)[i]);
            };
        };

        if(idx.length > 0){
            if(idx.length === 1){
                let error = new Error(`${idx} is not a valid number.`);
                error.status = 400;
                throw error;
            } else {
                let error = new Error(`${idx} are not valid numbers.`);
                error.status = 400;
                throw error;
            }            
        };    
    };

    
};



module.exports = NumbersArray;