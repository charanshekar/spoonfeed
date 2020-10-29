const express = require('express');
const router = express.Router();
const posts = require('../db/SchemaPost');
async function getPosts()
{
    return await posts();
}
router.get('/',(req,res)=>{
res.sendFile("index.htm",{root:'public',path:'/'});
});

module.exports = router;