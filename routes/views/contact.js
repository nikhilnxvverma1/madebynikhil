var keystone = require('keystone');
var express=require('express');
var app=express();

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	
	var senderName=req.body.senderName;
	var email=req.body.email;
	var message=req.body.message;

	//Mail options
  	mailOptions = {
		from:email , //grab form data from the request body object
		to: 'nikhilnxvverma1@aol.com',
		subject: 'Website contact form',
		text: message
  	};

	//   console.log("app is "+app.locals.toString());
	

	//use the global smtp transporter (defined in app.locals) tp send the mail
	smtpTransport.sendMail(mailOptions,function(error,response){
		//Email not sent
		if (error) {
			console.log("Contact form Error:"+error);
			res.send("false");
		}
		// Email sent
		else {
			console.log("Email Sent to AOL");
			res.send("true");
		}
	});

	

};
