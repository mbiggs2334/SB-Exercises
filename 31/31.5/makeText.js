/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');

if(process.argv[2] === 'file'){
    checkUserInput('file');
    readFile(process.argv[3]);
} else if (process.argv[2] === 'url') {
    checkUserInput('url');
    urlText(process.argv[3]);
} else {
    console.log(`ERROR: '${process.argv[2]}' is not a valid method.`);
    process.exit(1);
};

async function urlText(url){
    try {
        let res = await axios.get(url);
        let output = makeText(res.data);
        console.log(output);
        process.exit(0);
    } catch {
        console.log(`ERROR: Couldn't complete request to ${url}.`)
    };
};

function makeText(data){
    let mm = new MarkovMachine(data);
    return mm.makeText();
};

function readFile(path){
    fs.readFile(path, 'utf-8', (error, data) => {
        if(error){
            console.log(`ERROR: Couldn't read file ${path}.`);
            process.exit(1);
        } else {
            data = makeText(data);
            console.log(data);
            process.exit(0);
        };
    });
};

function checkUserInput(input){
    if(process.argv.length === 3){
        console.log(`'${input}' requires at least one additional argument.`);
        process.exit(1);
    } else if(process.argv.length > 4){
        let numberGiven = process.argv.length - 4;
        console.log(`'${input}' only requires 1 argument and an additional ${numberGiven} was given.`);
        process.exit(1);
    };
};