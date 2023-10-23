const ObjectId = require("mongoose").Types.ObjectId;
const { replySchema, commentSchema } = require("../schemas/comment.schema");

module.exports = async function addCommentFunc(post, res, req) {
  let parentCommentIndex;
  let comment;
  const commentData = {
    author: ObjectId(res.locals.userId),
    ...req.body,
  };

  const { parentCommentId } = req.body;
  if (parentCommentId) {
    comment = await replySchema.create(commentData);
  } else {
    comment = await commentSchema.create(commentData);
  }

  if (parentCommentId) {
    const parentComment = await commentSchema.findOne({
      _id: parentCommentId,
    });

    parentComment.replies = [...parentComment.replies, comment];
    await parentComment.save();
    parentCommentIndex = post.comments.findIndex((comment) => {
      return comment._id.toString() == parentCommentId.toString();
    });

    post.comments[parentCommentIndex] = parentComment;
  } else {
    post.comments = [...post.comments, comment];
  }
};
