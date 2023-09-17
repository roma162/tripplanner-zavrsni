import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath, location, date } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        userLocation: user.location,
        location,
        date,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: {}
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };

  

/* READ */

export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json({ post });
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json({ post });
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
};

/* UPDATE */

export const likePosts = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
                    post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        
        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true}
        )
        res.status(200).json({ updatePost });
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
};


export const postComment = async (req, res) => {
    try{
        const { id } = req.params;
        const { comment } = req.body;
        const post = await Post.findById(id);
        

            post.comments.set( comment);
        
        
        const updatePost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true}
        )
        res.status(200).json({ updatePost });
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
};

export const postDelete = async (req, res) => {
    try {
        const {id} = req.params;
        await Post.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
