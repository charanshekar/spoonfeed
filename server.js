const express=require('express');
const app=express();
const port=process.env.PORT || 3000;
const tag=require('./routes/tagRoute');
const user=require('./routes/User');
const index = require('./routes/indexRoute');
const morgan = require('morgan');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const mongo=require('./config/dbconfig')

//Passport config
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Express Session
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//Global vars for flash
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));  
app.use('/',index);
app.use('/User',user);

app.use('/api/tags/', tag);  
app.use((req,res,next)=>{
    err = new Error("404 Not Found");
    err.status=404;
    next(err);
});

app.listen(port); 