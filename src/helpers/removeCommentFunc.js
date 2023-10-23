const errorConfig = require("../../config/error.config");
const {
  replySchema,
  commentSchema,
} = require("../schemas/comment.schema");

module.exports = async function removeCommentFunc(post, req) {
  let parentCommentIndex;
  let foundComment;
  foundComment = await commentSchema.findOne({
    _id: req.body.commentId,
  });

  if (!foundComment) {
    foundComment = await replySchema.findOne({
      _id: req.body.commentId,
    });
    if (!foundComment) throw errorConfig.commentNotFound;
  }
  const { parentCommentId } = req.body;
  if (parentCommentId) {
    const parentComment = await commentSchema.findOne({
      _id: parentCommentId,
    });

    const newReplyList = parentComment.replies.filter((reply) => {
      return reply._id.toString() != req.body.commentId.toString();
    });
    parentComment.replies = [...newReplyList];
    await parentComment.save();
    parentCommentIndex = post.comments.findIndex((comment) => {
      return comment._id.toString() == parentCommentId.toString();
    });

    post.comments[parentCommentIndex] = parentComment;
    await post.save();
  } else {
    const newCommentList = post.comments.filter((comment) => {
      return comment._id.toString() != req.body.commentId.toString();
    });
    post.comments = [...newCommentList];
    await post.save();

    await replySchema.deleteMany({
      parentCommentId: foundComment._id,
    });
  }

  if (parentCommentId) {
    await replySchema.findOneAndDelete({
      _id: req.body.commentId,
    });
  } else {
    await commentSchema.findOneAndDelete({
      _id: req.body.commentId,
    });
  }
};
