const express=require('express');
const route=express.Router();
const posts = require('../db/SchemaPost');
async function getPosts()
{
    return await posts();
}
route.get('/',(req,res) =>{
getPosts()
.then(post => res.send(post))
.catch(err => console.log(err));
});
route.get('/:name',(req,res)=>{
const tag = getPosts()
.then(post=>post.filter(p => p.post.tag === req.params.name))
.catch(err=>console.log(err));
if(!tag) return res.status(404).send('Tag not found!');
tag
.then(tagname => res.send(tagname))
.catch(err => console.log(err));
});
module.exports = route;