const ObjectId = require("mongoose").Types.ObjectId;
const errorConfig = require("../../config/error.config");
const { replySchema, commentSchema } = require('../schemas/comment.schema');
const findAverage = require("./helpers");
const sendChangesToPost = require("./sendChangesToPost");

module.exports = async function editCommentFunc(post, res, req) {
  let comment;
  const { commentId, parentCommentId, content } = req.body;

  comment = await commentSchema.findOne({
    _id: commentId,
  });
  const isReply = parentCommentId;

  if (isReply) {
    comment = await replySchema.findOne({
      _id: commentId,
    });
  }

  if (!comment) throw errorConfig.commentNotFound;

  
  comment.content = content;

  sendChangesToPost( post, comment, commentId, parentCommentId );
  await comment.save();
};
