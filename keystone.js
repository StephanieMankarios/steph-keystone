// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'steph-keystone',
	'brand': 'steph-keystone',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.html',
	'custom engine': cons.nunjucks,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'UserModel',

		'wysiwyg additional options': { 'external_plugins': { 'uploadimage': '/js/lib/uploadimage/plugin.min.js' } },
	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg cloudinary images': true,
	'wysiwyg importcss': '/styles/tinymce.css',
	'wysiwyg additional buttons': 'searchreplace visualchars,'
 + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
 +' emoticons media, preview print ',
'wysiwyg additional plugins': 'example, table, advlist, anchor,'
 + ' autolink, autosave, charmap, contextmenu, '
 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
 + ' paste, preview, print, searchreplace, textcolor,'
 + ' visualblocks, visualchars, wordcount, image'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	'user-models': 'user-models',
});


// TEST FOR BROWSER-SYNC LIVE RELOAD
if (keystone.get('env') === 'development') {
		keystone.set('sass options', {
        debug: true,
        force: true
    });
}
keystone.set('cloudinary secure', true);


// Start Keystone to connect to your database and initialise the web server
keystone.start();
