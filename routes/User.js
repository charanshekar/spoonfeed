const express=require('express');
const route=express.Router();
const Joi=require('@hapi/joi');
const User=require('../db/User');
const bcrypt=require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

route.get('/',(req,res)=>{
res.sendFile('User.htm',{root:'public',path:'/'});
});
const schema = Joi.object().keys({
    firstName:Joi.string().regex(/^[a-zA-Z]/i).required(),
    lastName:Joi.string().regex(/^[a-zA-Z]/i),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),
    passwordConfirm:Joi.string().valid(Joi.ref('password')).required().strict().error(errors=>{
        return{
        message:'Password and Confirm Password Should Match'
        };
    })
});
route.post('/register',(req,res)=>{
const { firstName, lastName, email, password } =req.body;
const result = schema.validate(req.body);
if(result.error) res.status(400).send(result.error.details[0].message);
User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            res.status(400).send("User exists already!");
        }
        else{
            const name=`${firstName} ${lastName}`;
            const newUser = new User({
                name,
                email,
                password
            });

            //Hash Password
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    //Hashed Password
                    newUser.password = hash;
                    newUser.save()
                        .then(user =>{
                            req.flash('success_msg','You Are Now Registered And Can Log In');
                            res.redirect('/User');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

route.post('/login',(req,res,next) => {
passport.authenticate('local',{
    successRedirect:'/User/dashboard',
    failureRedirect:'/User',
    failureFlash: true
})(req,res,next);
});

route.get('/logout',(req,res) =>{
req.logout();
console.log("logged out");
res.redirect('/User');
});


route.get('/dashboard',ensureAuthenticated,(req,res) =>{
res.sendFile('dashboard.htm',{root:'public',path:'/'});
});
module.exports=route;