const router = require("express").Router();
const User  = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
//Update
router.put("/:id" ,async(req,res) =>{

    if(req.body.userId === req.params.id){ 
     if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
     }
    try{
        const updateUser  = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body,
        } , {new : true });
        res.status(200).json(updateUser);
    }
   catch(err){
        res.status(500).json({
            error: "Failed to register user",
            message : err.message
        })
  }

 }
 else{
    res.status(401).json("You can update only your account!");
 }
})


//Delete
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (req.body.userId === req.params.id) {
            await Post.deleteMany({ username: user.username });
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted");
        } else {
            return res.status(401).json("You can delete only your account!");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.delete("/:id" ,async(req,res) =>{
    
//     if(req.body.userId === req.params.id){ 
//         const user = await User.findById(req.params.id);
//         !user && res.status(404).json("User not found");

//     try{
//         await Post.deleteMany({username : user.username});
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json("User has been deleted");
//     }
//    catch(err){
//         res.status(500).json(err);
//   }
//  }
//  else{
//     res.status(401).json("You can update only your account!");
//  }
// })

//Get 

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;