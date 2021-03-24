const fs = require('fs');

const [,, ...cmdArgs] = process.argv;


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
	    console.log(options);
	    // options.all = true;
	} else {
	    newArr.push(arg);
	}
    }
    return newArr;
}

if (options['-a'])
    options['-A'] = true;

// Array without options
const woOpt = parseOpt(cmdArgs);
// console.log(woOpt)


// Loop
if (woOpt.length === 0) {
    woOpt = ['./'];
} else {
    for (path of woOpt) {
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
    process.exit(0);
}


