const mongoose=require('mongoose');





const PostsSchema = new mongoose.Schema({
title:String,
source:String,
tag:String,
img:String,
date:{type:Date,default:Date.now()},
promoted:{type:Boolean,default:false}
});

const Postmodel = mongoose.model('Posts',PostsSchema,'Posts');

async function returnPosts(){
    try{
    const populateMembers = await Postmodel.find();
    const posts = [];
    populateMembers.forEach((post)=>{
        posts.push({post,show:true});
    });
    return posts;
    }
    catch(err)
    {
        console.log(err);
    }
}


module.exports = returnPosts;
