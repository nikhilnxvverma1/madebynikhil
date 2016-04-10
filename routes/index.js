/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var i18n=require('i18n');
var bodyParser=require('body-parser');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
// keystone.pre('routes',i18n);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	app.use(bodyParser.json());//to support json encoded bodies
	app.use(bodyParser.urlencoded({extended:true}));//to support url encoded bodies
	
	// Views
	app.get('/', routes.views.index);
	app.post('/contact', routes.views.contact);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/projects', routes.views.projects);
	app.get('/apps/carry-the-flame', routes.views.carryTheFlame);
	app.get('/apps/sudoku-all-solver', routes.views.sudokuAllSolver);
	app.get('/apps/laying-bricks', routes.views.layingBricks);
	app.get('/apps/snakes-ergo', routes.views.snakesErgo);
	
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
