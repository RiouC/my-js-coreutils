const fs = require('fs');
const { basename } = require('path');

const [,, ...cmdArgs] = process.argv;

let err = 0;

// check argv length
if (process.argv.length < 2) {
    console.log('Usage: node my_ls.js [options] [path]');
    process.exit(-1);
}

// Options
let options = {'-a': false,
	       '-A': false};


const parseOpt = (arr) => {
    let newArr = [];
    for (let arg of arr) {
	if (Object.keys(options).includes(arg)) {
	    options[arg] = true;
	} else {
	    newArr.push(arg);
	}
    }
    return newArr;
}


// Array without options
const woOpt = parseOpt(cmdArgs);


// Loop
if (woOpt.length === 0) {
    woOpt = ['./'];
} else {
    for (path of woOpt) {
	if (!fs.existsSync(path)) {
	    const bn = basename(process.argv[1], '.js')
	    console.log(`${bn}: cannot access ${path}: No such file or directory`);
	    err = 2;
	    continue;
	}
	const stats = fs.statSync(path);
	if (stats.isFile()) {
	    const file = fs.readFileSync(path);
	    console.log(path);
	    process.exit(0);
	}
	if (woOpt.length > 1)
	    console.log(`${path}:`);
	if (options['-a'] && !options['-A']) {
	    console.log('.');
	    console.log('..');
	}
	for (file of fs.readdirSync(path)) {
	    if (!options['-A'] && !options['-a'] && file.startsWith('.'))
		continue;
	    console.log(file);
	}
	console.log();
    }
    process.exit(err);
}

