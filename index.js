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


open({
	
	filename: './perfect.db',
	driver: sqlite3.Database	
}).then(async function (db) {
	
	await db.migrate();
	const perfect = await db.all('select * from perfect')

	app.get('/', async function(req, res) {
 	 
 res.render('index', {
	perfect,
	smallPizza: pizzas.getTotalSmall(),
	mediumPizza: pizzas.getTotalMedium(),
	largePizza: pizzas.getTotalLarge(),
	totals: pizzas.getGrandTotal(),
	smallQty: pizzas.getsmallQ(),
	mediumQty: pizzas.getmedQ(),
	largeQty: pizzas.getlargeQ(),
});

		});
	
	app.post('/sBuy',async function(req, res) {
	pizzas.sPizza(req.body.small);
	if(pizzas.getTotalSmall() != 0 && pizzas.getsmallQ() !=0){
		const orders = 'insert into perfect(smallQty,smallPizza,totals) values(?,?,?)';	
		await db.run(orders,pizzas.getsmallQ(),pizzas.getTotalSmall(),pizzas.getGrandTotal());;
	}	
	res.redirect('/')
	});

	app.post('/srBuy', function(req, res) {
		pizzas.srPizza(req.body.sremove)
		res.redirect('/')
		});

	app.post('/mrBuy', function(req, res) {
	 	pizzas.mrPizza(req.body.mremove)
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
	app.post('/lrBuy', function(req, res) {
		pizzas.lrPizza(req.body.lremove)
		res.redirect('/')
		});
	app.post('/orders', function(req,res){
	res.render('orders',{perfect})
	})
	
	app.get('/orders', async function(req,res){
	// const orders = 'insert into perfect(smallQty,smallPizza,totals) values(?,?,?)';	
	// await db.run(orders,pizzas.getsmallQ(),pizzas.getTotalSmall(),pizzas.getGrandTotal());;
	res.render('orders',{perfect})
	

	})

	app.post('/payment/:id', async function(req,res){
		const orderId = req.params.id;
		const update = 'update perfect set smallQty=?, totals=? where id=?';
		await db.run(update,smallQty,totals, orderId);
		res.redirect('/payment');
	})
	app.post('/delete/:id', async (req, res) => {

	const orderId = req.params.id;
   const dlete = 'delete from perfect where id=?';
	await db.run(dlete,orderId);
   res.redirect('/orders');
	   
 })

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
	
})



// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});