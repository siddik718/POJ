import BLOG from "../Models/blogModel.js";

export const allBlog = async (req, res) => {
  try {
    const blogs = await BLOG.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error",
    });
  }
};

export const oneBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BLOG.findById({_id:id});
    if (!blog) {
      return res.status(400).json({
        message: "Blog Not Found",
      });
    }
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Eror",
    });
  }
};

export const getMyBlogs = async (req, res) => {
  const { email } = req.params;
  try {
    const blogs = await BLOG.find({ email }).sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(400).json({
      message: "No Blogs Found",
    });
  }
};

export const register = async (req, res) => {
  const { username, email, title, content } = req.body;
  try {
    const blog = new BLOG({
      title,
      content,
      email,
      username,
    });
    await blog.save();
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Error. Please try again after some time.",
    });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BLOG.findOneAndDelete({ _id: id });
    if(response) {
        return res.status(200).json({
          message: "Blog Deleted Successfully",
        });
    }else {
        return res.status(400).json({
          message: "No Blog Found",
        });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const update = async (req, res) => {
  const { id } = req.body;
  try {
    const updatedBlog = await BLOG.findByIdAndUpdate( id, req.body , { new: true });
    if(updatedBlog) {
        return res.status(200).json(updatedBlog);
    }else {
        return res.status(400).json({ message: 'No Blog Found' });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addComment = async (req,res)=> {
  const {id} = req.params;
  try {
    const blog = await BLOG.findById(id);
    if(!blog) {
      return res.status(400).json({ message: "No Post Found" })
    }
    const newComment = {
      username: req.body.username,
      comment: req.body.comment,
      userID: req.body.id
    }
    blog.comments.push(newComment);
    await blog.save();
    return res.status(201).json(blog);
  }catch(err) {
    return res.status(500).json('Internal Error');
  }
}