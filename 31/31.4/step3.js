const fs = require('fs');
const axios = require('axios');

function cat(data, output){
    fs.readFile(data, 'utf-8', (err, data) => {
        if(err){
            console.log(`ERROR: Couldn't read file.1`);
            process.exit(1);
        } else {
            writeOutput(data, output);
            return data;
        };
    });
};

function writeOutput(data, output){
    if(output){
        fs.writeFile(output, data, 'utf-8', (err) => {
            if(err){
                console.log(`ERROR: Couldn't write ${data} to ${output}1`);
                process.exit(1);
            } else {
                process.exit(0);
            };
        });
    } else {
        console.log(data);
    };
};

async function webCat(url, path){
    try {
        const res = await axios.get(url);
        writeOutput(res.data, path);
    } catch {
        console.log(`ERROR: Couldn't complete request.`);
        process.exit(1);
    };
};


function checkInputOnOut(){
    if(process.argv.length > 5 || process.argv.length === 4){
        if(process.argv.length > 5){
            let additionalParameters = process.argv.length - 3;
            console.log(`ERROR: '--out' only accepts 2 additional parameters, and ${additionalParameters} were given.`);
            process.exit(1);
        } else {
            console.log(`ERROR: '--out' requires 2 additional parameters and only 1 was given.`)
            process.exit(1);
        };
    };
};

function outInput(){
    checkInputOnOut();
    if(process.argv[4].indexOf('http') !== -1){
        webCat(process.argv[4], process.argv[3]);
    } else {
        cat(process.argv[4], process.argv[3]);
    };
};

function catInput(){
    if(process.argv[2].indexOf('http') !== -1){
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    };
};




if(process.argv[2] === '--out'){
    outInput();
} else {
    catInput();
};