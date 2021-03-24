const fs = require('fs');

const [,, ...cmdArgs] = process.argv;


// check argv length
if (process.argv.length < 2) {
    console.log('Usage: node my_ls.js [options] [path]');
    process.exit(-1);
}

// Options
let options = {all: false,
	       almostAll: false};

const parseOpt = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
	if (arr[i] === "-a") {
	    options.all = true;
	} else if (arr[i] === '-A') {
	    options.almostAll = true;
	} else {
	    newArr.push(arr[i]);
	}
    }
    return newArr;
}

// Array without options
const woOpt = parseOpt(cmdArgs);
// console.log(woOpt)

// const path = process.argv[2];

// Loop
if (process.argv.length === 2) {
    fs.readdirSync("./");
    process.exit(0);
} else {
    for (path of woOpt) {
	if (options.all && !options.almostAll) {
	    console.log('.');
	    console.log('..');
	}
	for (file of fs.readdirSync(path)) {
	    if (!options.all && file.startsWith("."))
		continue;
	    console.log(file);
	}
    }
    process.exit(0);
}


