const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`ERROR: Couldn't read file.`);
            process.exit(1);
        } else {
            console.log(data);
            process.exit(0);
        };
    });
};



async function webCat(url){
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch {
        console.log(`ERROR: Couldn't complete request.`);
    };
};

if(process.argv[2].indexOf('http') !== -1){
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
};