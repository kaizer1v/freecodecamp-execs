
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use(function(req, resp, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }))

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
app.get('/', function(req, resp) {
  resp.send('Hello Express')
})

/** 3) Serve an HTML file */
app.get('/html', function(req, resp) {
  resp.sendFile(__dirname + '/views/index.html')
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'))
// this will allow you to point to a relative path in the .html file

/** 5) serve JSON on a specific route */
/** and exec 6 compbined  */
/** 6) Use the .env file to configure the app */
app.get('/json', function(req, resp) {
  let msg = "Hello json";
  if(process.env.MESSAGE_STYLE === 'uppercase') {
    resp.json({ "message": msg.toUpperCase() })
  } else {
    resp.json({ "message": msg })
  }
})

 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, resp, next) {
  req.time = new Date().toString()
  next()
}, function(req, resp) {
  resp.json({ "time": req.time })
})

/** 9)  Get input from client - Route parameters */
app.get('/echo/:word', function(req, resp) {
  resp.json({ "echo": req.params.word })
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/params').get(function(req, resp) {
  resp.json({ "name": `${req.query.first} ${req.query.last}` })
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.route('/name').post(function(req, resp) {
  console.log('>>>>>>>>', req.body)
  resp.json({ name: `${req.body.first} ${req.body.last}` })
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
