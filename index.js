const express = require('express');
const exphbs  = require('express-handlebars');
const pizza = require('./pizza');
const pizzaPer = require('./pizza');
var session = require('express-session')
const pizzas = pizzaPer();

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT =  process.env.PORT || 3018;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.get('/login', (req,res)=>{
	res.render('login')
});
 
app.post('/login', (req,res)=>{
	if(req.body.username){
		req.session.username = req.body.username;
	res.redirect('/')

	}else{
		res.redirect('/login')
	}

});



open({
	
	filename: './perfect.db',
	driver: sqlite3.Database	
}).then(async function (db) {
	
	await db.migrate();

	app.get('/', function(req, res) {
		res.render('index', {
			smallPizza: pizzas.getTotalSmall(),
			mediumPizza: pizzas.getTotalMedium(),
			largePizza: pizzas.getTotalLarge(),
			totals: pizzas.getGrandTotal(),
			smallQty: pizzas.getsmallQ(),
			mediumQty: pizzas.getmedQ(),
			largeQty: pizzas.getlargeQ(),
			Counter: req.session.Counter
		});
	});
	
	
	app.post('/sBuy', function(req, res) {
	pizzas.sPizza(req.body.small)
	res.redirect('/')
	});
	app.post('/mBuy', function(req, res) {
	pizzas.mPizza(req.body.medium)
	res.redirect('/')
	});
	
	app.post('/lBuy', function(req, res) {
	pizzas.lPizza(req.body.large)
	res.redirect('/')
	});
	
	app.get('/orders/:id', function(req,res){
		res.render('/')
	})
	
})



// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});