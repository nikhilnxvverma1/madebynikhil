var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	console.log("Came to contact js");
	console.log("name is "+req.body.senderName);
	console.log("email is "+req.body.email);
	console.log("message is "+req.body.message);

	res.send("true");

};
