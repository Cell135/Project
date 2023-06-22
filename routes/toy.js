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
    var order_quantity = req.body.order_quantity;
    var price = req.body.price;
    var total_price = price * order_quantity;
    res.render('toy/order_confirm', { toy: toy, order_quantity : order_quantity, total_price : total_price});
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

module.exports = router;