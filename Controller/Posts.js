import Posts from "../Model/PostsModel.js";


export const createPosts = async (req, res) => {
    const { title, category, description, picture, username, imgkey } = req.body;


    try {
        const post = new Posts({ title, category, description, username, picture, imgkey });
        post.save();
        return res.status(200).json("Post Saved Successfully");
    } catch (error) {
        return res.status(400).json({ msg: error.message });

    }


}

export const fetchPostswithLimit = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const username = req.query.username;

    const startIndex = (page - 1) * limit;
    try {
        let query = {};
        if (username) {
            query = { username: username };
        }
        const count = await Posts.countDocuments();
        const posts = await Posts.find(query).sort({ createdAt: 'desc' }).skip(startIndex).limit(limit);
        return res.status(200).json({ data: posts, totalCount: count });

    } catch (error) {
        return res.status(400).json({ msg: "fetching Failed", error: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            await post.deleteOne();
            return res.status(200).json({ msg: "Post Deleted" });
        } else {
            return res.status(400).json({ msg: "Post Not Found" });

        }
    } catch (error) {
        return res.status(400).json({ msg: "Post Not Deleted" });

    }

}

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find().sort({ createdAt: 'desc' }).limit(25);
        return res.status(200).json(posts)

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}

export const fetchOnePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            return res.status(200).json(post);
        } else {
            return res.status(400).json({ msg: "Post Not Found" });
        }
    } catch (error) {
        return res.status(400).json({ msg: "Post Not Deleted" });

    }

}