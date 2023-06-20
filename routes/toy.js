var express = require('express');
const ToyModel = require('../models/ToyModel');
var router = express.Router();

router.get ('/', async(req,res)=>{
    var toys = await ToyModel.find({});
    var total = await ToyModel.count();
    res.render('toy/index',{ toys : toys ,  total : total});
});

//search function
router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    var toys = await ToyModel.find({ name: new RegExp(keyword, "i") })
    res.render('toy/index', { toys: toys })
 })
 
 //sort function
 router.get('/ascending', async (req, res) => {
    var toys = await ToyModel.find().sort({ amount: 1 })
    res.render('toy/index', { toys: toys })
 })
 
 router.get('/descending', async (req, res) => {
    var toys = await ToyModel.find().sort({ amount: -1 })
    res.render('toy/index', { toys: toys })
 })

 router.get('/list', async (req, res) => {
    var toys = await ToyModel.find({});
    res.render('toy/list', { toys: toys });
  })
  
  router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    await ToyModel.findByIdAndDelete(id)
    .then(() => { console.log ('Delete toys succeed !')})
    .catch((err) => { console.log ('Delete toys failed !')});
    res.redirect('/');
  })
  
  router.get('/drop', async(req, res) => {
    await ToyModel.deleteMany({})
    .then(() => { console.log ('Delete all toys succeed !')});
    
    res.redirect('/toy');
  })
  
  router.post('/order', async (req, res) => {
    var id = req.body.id;
    var toy = await ToyModel.findById(id);
    var amount_quantity = req.body.amount_quantity;
    var price = req.body.price;
    var total_price = price * amount_quantity;
    res.render('/order_confirm', { toy: toy, amount_quantity : amount_quantity, total_price : total_price});
  })
  
  router.get('/add', (req, res) => {
    res.render('toy/add');
  })
  
  router.post('/add', async (req, res) => {
    var toy = req.body;
    await ToyModel.create(toy)
    .then(() => { console.log ('Add new toy succeed !')});
    res.redirect('/');
  })
  
  router.get('/edit/:id', async (req, res) => {
    var toy = await ToyModel.findById(req.params.id);
    res.render('toy/edit', { toy : toy});
  })
  
  router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var updatedToy = req.body; 
  
    await ToyModel.findByIdAndUpdate(id, updatedToy)
      .then(() => { 
        console.log('Edit toy succeeded!');
        res.redirect('/toy');
      })
      .catch((err) => { 
        console.log('Edit toy failed!');
        res.redirect('/toy');
      });
  });

// Login Route
router.get('/login', (req, res) => {
  res.render('Toy/login'); // Render the login form from the Toy folder
});

router.post('/login', (req, res) => {
  // Check the user credentials and log them in
  const { username, password } = req.body;

  // Here, you would typically authenticate the user against your user model or a database
  // For demonstration purposes, let's assume the username is "admin" and the password is "password"

  if (username === 'username' && password === 'password') {
    req.session.user = username; // Store the username in the session
    res.redirect('/toy'); // Redirect to the dashboard or any other authenticated page
  } else {
    res.redirect('/login'); // Redirect back to the login page if the credentials are incorrect
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.redirect('/login'); // Redirect to the login page or any other public page
});

module.exports = router;
