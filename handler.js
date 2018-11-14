var exec = require('child_process').exec;
var fs = require('fs');

var sys = require('util');

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while ( new Date().getTime() < startTime + milliSeconds );
}

function respError(response, error) {
	response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write(error + '\n');
	response.end();
}

function showTemplate(response, tplName) {
	fs.readFile(__dirname + '/tpl/' + tplName + '.tpl', 'utf8', function(error, contents) {
		if ( error ) {
			respError(response, error);
		} else {
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			response.write(contents, 'utf8');
			response.end();
		}
	});
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
	
	showTemplate(response, 'home');
	
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

function form(request, response) {
	
	if ( request.method == 'POST' ) {
		response.writeHead(200, {'content-type': 'text/plain'});
		response.write('form submitted:\n\n');
		response.end(sys.inspect({query: request.queryData, post: request.postData}));
	} else {
	
		showTemplate(response, 'form');
		
	}
}

function upload(request, response) {
	
	if ( request.method == 'POST' ) {
		
		response.writeHead(200, {'content-type': 'text/plain'});
		response.write('received upload:\n\n');
		response.end(sys.inspect({query: request.queryData, post: request.postData, files: request.postFile}));
		
	} else {
	
		showTemplate(response, 'upload');
		
	}
	
}

function web404(request, response) {
	
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('404 Not found');
	response.end();
}

function web500(response) {
	
	respError(response, '500 Internal Error');
}

exports.index = index;
exports.blocking = blocking;
exports.show = show;
exports.form = form;
exports.upload = upload;
exports.web404 = web404;
exports.web500 = web500;
exports.respError = respError;