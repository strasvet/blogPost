const express = require("express");

const router = express.Router();

const Post = require("../models/Post");
//http://localhost:8081/api/post(GET)
router.get("/",async(req,res)=>{
    const posts = await Post.find({});
    res.status(200).json(posts);

});


//http://localhost:8081/api/post(POST)
router.post("/",async(req,res)=>{
    const postData = {
        title:req.body.title,
        text:req.body.text
    }
    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
});


//http://localhost:8081/api/post/(DELETE)
router.delete("/:postID",async (req,res)=>{
    await Post.remove({_id:req.params.postID});
    /*await res.status(200).json({*/ //await was here!!! warning!!!
    res.status(200).json({
        message:"post was deleted from mlab"
    })
});

module.exports = router;