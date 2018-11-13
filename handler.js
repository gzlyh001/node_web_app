var exec = require('child_process').exec;
var fs = require('fs');

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while ( new Date().getTime() < startTime + milliSeconds );
}

function respError(response, error) {
	response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write(error + '\n');
	response.end();
}

function index(request, response) {
	
	/*
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	
	response.write('Hello home');
	response.write('\n');
	if ( request.queryString ) {
		var queryString = request.queryString;
		var queryData = request.queryData;
		response.write('Query Data: \n');
		Object.keys(queryData).forEach(function(key) {
			console.log('    ' + key + ' => ' + queryData[key]);
			response.write(key + ' => ' + queryData[key] + '\n');
		});
	}
	if ( request.postData ) {
		var postString = request.postString;
		var postData = request.postData;
		response.write('POST Data: \n');
		Object.keys(postData).forEach(function(key) {
			console.log('    ' + key + ' => ' + postData[key]);
			response.write(key + ' => ' + postData[key] + '\n');
		});
	}
	*/
	
	fs.readFile(__dirname + '/tpl/home.tpl', 'utf8', function(error, contents) {
		if ( error ) {
			respError(response, error);
		} else {
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			response.write(contents, 'utf8');
			response.end();
		}
	});
	
}

// an example of blocking action
function blocking(request, response) {
	
	response.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf-8',
		'Transfer-Encoding': 'chunked',
		'X-Content-Type-Options': 'nosniff'
	});
	
	response.write('Sleeping 10 seconds ...' + "\n");
	
	exec('sleep 10 && echo Sleep 10 done! && dir',
		//{ timeout: 10000, maxBuffer: 1000*1024 },
		function(error, stdout, stderr) {
			response.write(stdout);
			response.end();
	});
}

function show(request, response) {
	
	fs.readFile(__dirname + '/images/test.png', 'binary', function(error, file) {
		if ( error ) {
			respError(response, error);
		} else {
			response.writeHead(200, {'Content-Type': 'image/png'});
			response.write(file, 'binary');
			response.end();
		}
	});
	
}

function upload(request, response) {
	
	// TODO ...
	
}

function web404(request, response) {
	
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('404 Not found');
	response.end();
}

exports.index = index;
exports.blocking = blocking;
exports.show = show;
exports.upload = upload;
exports.web404 = web404;
