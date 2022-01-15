const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log(`ERROR: Couldn't read file.`);
            process.exit(1);
        } else {
            console.log(data);
        };
    });
};

cat(process.argv[0]);