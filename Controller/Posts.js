import Posts from "../Model/PostsModel.js";


export const createPosts=async(req,res)=>{

    
    try {
        const post=await new posts(req.body);
        post.save();

        return res.status(200).json("Post Saved Successfully");
    } catch (error) {
        return res.status(400).json({msg:error});
        
    }


}

export const getPosts=async(req,res)=>{
    try {
        const posts = await Posts.find().sort({ createdAt: 'desc' }).limit(25);
        return res.status(200).json(posts)
        
    } catch (error) {
        return res.status(400).json({msg:error.message});
    }

}