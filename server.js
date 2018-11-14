var http = require('http');
var url = require('url');
var qs = require('qs');
var formidable = require('formidable');

var router = require('./router');
var handler = require('./handler');

var port = 3000;

function start() {
	
	function onRequest(request, response) {
		
		console.log('Request received ...');
		console.log('  url: ' + request.url);
		console.log('  method: ' + request.method);
		
		var pathname = url.parse(request.url).pathname;
		console.log('  uri: ' + pathname);

		var queryData = url.parse(request.url).query;
		if ( ! queryData ) { queryData = ''; }
		if ( queryData ) {
			request.queryString = queryData;
			request.queryData = qs.parse(queryData);
			console.log('Query Data:');
			console.log(queryData);
			console.log(request.queryData);
		} else {
			request.queryString = '';
			request.queryData = null;
		}
		
		var postData = '';
		if ( request.method == 'POST' ) {
		
			var form = new formidable.IncomingForm();
			form.parse(request, function(error, fields, files) {
				if ( error ) {
					handler.respError(response, error);
				} else {
					request.postString = '+++';
					request.postData = fields;
					request.postFile = files;
					dealRequest();
				}
			});
			
			/*
			request.setEncoding('utf8');
			
			request.on('data', function(data) {
				// console.log('  Received POST data chunk: ' + data);
				postData += data;
				if ( postData.length > 1e7 ) { // 10MB
					response.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
					response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
				}
			});
			
			request.on('end', function() {
				if ( postData ) {
					request.postString = postData;
					request.postData = qs.parse(postData);
					console.log('Post Data:');
					console.log(postData);
					console.log(request.postData);
				} else {
					request.postString = '';
					request.postData = null;
				}
				dealRequest();
			});
			*/
			
		} else {
		
			dealRequest();
		
		}
		
		function dealRequest() {
			var handlerAction = router.route(pathname);
		
			if ( typeof handlerAction === 'function' ) {
				handlerAction(request, response);
			} else {
				handler.web500(response);
			}
		}
			
	}
	
	http.createServer(onRequest).listen(port);
	console.log('Server has started on port ' + port + ' ...');
}

exports.start = start;