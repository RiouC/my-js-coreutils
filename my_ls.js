const fs = require('fs');

const [,, ...cmdArgs] = process.argv;


// check argv length
if (process.argv.length < 2) {
    console.log('Usage: node my_ls.js [path]');
    process.exit(-1);
}

// Options
let options = {all: false,
	       almostAll: false};

const parseOpt = (arr) => {
    let newArr = arr;
    for (let i = 0; i < arr.length; i++) {
	if (arr[i] === "-a") {
	    options.all = true;
	    newArr.splice(i, 1);
	} else if (arr[i] === '-A') {
	    options.almostAll = true;
	    newArr.splice(i, 1);
	}
    }
    return newArr;
}

const tab = parseOpt(cmdArgs);

const path = process.argv[2];

// Loop
if (process.argv.length === 2) {
    fs.readdirSync("./");
    process.exit(0);
}
else {
    fs.readdirSync(path);
}


const test = fs.readdirSync(path);


if (options.all && !options.almostAll) {
    console.log('.');
    console.log('..');
}

for (file of test) {
    if (!options.all && file.startsWith("."))
	continue;
    console.log(file);
}

