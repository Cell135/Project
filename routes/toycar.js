var express = require('express');
const ToycarModel = require('../models/ToycarModel');
var router = express.Router();

router.get('/',async(req,res)=>{
    var toyscar = await ToycarModel.find({});
    var total = await ToycarModel.count();
    res.render('toycar/index',{ toyscar : toyscar , total : total});
})

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    await ToycarModel.findByIdAndDelete(id)
    .then(() => { console.log ('Delete cars succeed !')})
    .catch((err) => { console.log ('Delete cars failed !')});
    res.redirect('/');
  })
  
  router.get('/drop', async(req, res) => {
    await ToycarModel.deleteMany({})
    .then(() => { console.log ('Delete all cars succeed !')});
    
    res.redirect('/toycar');
  })
  
  
  router.get('/add', (req, res) => {
    res.render('toycar/add');
  })
  
  router.post('/add', async (req, res) => {
    var toycar = req.body;
    await ToycarModel.create(toycar)
    .then(() => { console.log ('Add new car succeed !')});
    res.redirect('/');
  })
  
  router.get('/edit/:id', async (req, res) => {
    var toycar = await ToycarModel.findById(req.params.id);
    res.render('toycar/edit', { toycar : toycar});
  })
  
  router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var updatedToycar = req.body; 
  
    await ToycarModel.findByIdAndUpdate(id, updatedToycar)
      .then(() => { 
        console.log('Edit toy succeeded!');
        res.redirect('/toycar');
      })
      .catch((err) => { 
        console.log('Edit toy failed!');
        res.redirect('/toycar');
      });
  });
module.exports = router;