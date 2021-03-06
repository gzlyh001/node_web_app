var exec = require('child_process').exec;
var fs = require('fs');
var mysql = require('mysql');

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

function json(request, response) {
	fs.readFile(__dirname + '/tpl/c51.json', 'utf8', function(error, contents) {
		if ( error ) {
			respError(response, error);
		} else {
			var c51 = JSON.parse(contents);
			response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
			response.write(JSON.stringify(c51), 'utf8');
			response.end();
		}
	});
}

function mysql_select(request, response) {

	var conn = mysql.createConnection({
		host	: 'localhost',
		user	: 'root',
		password: 'root',
		database: 'checkout51'
	});
	
	conn.connect();

	var sql = "SELECT * FROM `tb_offer`";

	conn.query(sql, function(error, results) {

		if ( error ) {
			//throw error;
			response.writeHead(200, {'content-type': 'text/plain'});
			response.write('DB ERROR: ' + error.message);
			response.end();
			return;
		} else {
			
			/*
			for ( var i = 0, len = results.length; i < len; i++ ) {
				//console.log(results[i]);
				console.log('===== ' + (i+1) + ' =====');
				for ( var key in results[i] ) {
					console.log( key + ' : ' + results[0][key]);
				}
			}*/
			
			var ret = { "batch_id" : 0, "offers" : results };
			
			response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
			response.write(JSON.stringify(ret), 'utf8');
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
		
		if ( request.postFile ) {
			var files = request.postFile;
			// fs.renameSync(files.file.path, __dirname + '/images/' + files.file.name);
			var readStream = fs.createReadStream(files.file.path);
			var writeStream = fs.createWriteStream(__dirname + '/images/' + files.file.name);
			readStream.pipe(writeStream);
			readStream.on('end', function() {
				fs.unlinkSync(files.upload.path);
			});
		}

		response.writeHead(200, {'content-type': 'text/plain'});
		// response.write('received upload:\n\n');
		// response.end(sys.inspect({query: request.queryData, post: request.postData, files: request.postFile}));
		response.end('Uploaded!');
		
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
exports.json = json;
exports.mysql = mysql_select;
exports.form = form;
exports.upload = upload;
exports.web404 = web404;
exports.web500 = web500;
exports.respError = respError;