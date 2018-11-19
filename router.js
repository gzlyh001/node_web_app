var handler = require('./handler');

var handles = {}
handles['/'] = handler.index;
handles['/index.html'] = handler.index;
handles['/home.html'] = handler.index;
handles['/blocking.html'] = handler.blocking;
handles['/show.html'] = handler.show;
handles['/json.html'] = handler.json;
handles['/mysql.html'] = handler.mysql;
handles['/form.html'] = handler.form;
handles['/upload.html'] = handler.upload;

function route(pathname) {
	console.log('  Routing for ' + pathname + ' ...');
	
	if ( typeof handles[pathname] === 'function' ) {
		console.log('    action ' + handles[pathname].name + '() is called ...');
		return handles[pathname];
	} else {
		console.log('    No action defined for ' + pathname);
		return handler.web404;
	}
}

exports.route = route;