var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* GET Posts listing. */
router.get('/add', function(req, res, next) {
        res.render('addcategories',{
            'title': 'Add Categories'
        });
    });

//handle post request of add category page//
router.post('/add', function(req, res, next) {
    //Get form values
    var title = req.body.title;

    //Form Validation
    req.checkBody('title', 'Category Name is required').notEmpty();
    //till here

    //Check Errors
    var errors = req.validationErrors();
    if(errors){
        res.render('addcategories', {"errors": errors});
    }
    else{
        var categories = db.get('categories');
        categories.insert({
            "name": title

        }, function(err, post){
            if(err){
                res.send(err)
            }
            else{
                req.flash('success', 'Category Added');
                res.location('/categories/add');
                res.redirect('/categories/add');
            }
        });
    }
});


//showing posts category type
router.get('/show/:category', function(req, res, next) {
    var posts = db.get('posts');
    posts.find({category: req.params.category},{}, function(err, posts){
        console.log(posts)
       res.render('postbycategory', {
           'title': req.params.category,
           'posts': posts
       });
    });
});
//till here
module.exports = router;
