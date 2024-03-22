const Comment = require("../Model/CommentModel");

// Create Comment
const createComment = async (req, res) => {
  try {
    // Extract data from the request
    const { recipeId } = req.params;
    const { text } = req.body;

    // Create a new comment instance
    const newComment = new Comment({
      recipeId, // Associate the comment with the recipe ID
      text,
      // You can include additional fields if needed (e.g., user ID)
    });

    // Save the new comment to the database
    await newComment.save();

    // Respond with success message or the newly created comment
    res.status(201).json({ success: true, message: 'Comment created successfully' });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Failed to create comment', error });
  }
};

const getCommentsByRecipeId = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipeId });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get comments', error });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    
    // If comment is deleted, decrement the comment count in the corresponding recipe document
    if (comment) {
      await Recipe.findByIdAndUpdate(comment.recipeId, { $inc: { commentCount: -1 } });
    }

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete comment', error });
  }
};

module.exports = { createComment, deleteComment, getCommentsByRecipeId };
