const ObjectId = require("mongoose").Types.ObjectId;
const errorConfig = require("../../config/error.config");
const { ratingSchema, replySchema, commentSchema } = require('../schemas/comment.schema');
const findAverage = require("./helpers");
const sendChangesToPost = require("./sendChangesToPost");

module.exports = async function rateCom(post, res, req) {
  let comment;
  const { commentId, parentCommentId } = req.body;

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

  const rating = await ratingSchema.findOne({
    author: res.locals.userId,
  });

  if (rating) {
    await ratingSchema.findOneAndDelete({
      author: res.locals.userId,
    });
    const newRatingsArray = comment.ratingsArray.filter((ratingObj) => {
      return ratingObj.author.toString() != rating.author.toString();
    });
    comment.ratingsArray = [...newRatingsArray];
  }

  const ratingData = {
    author: ObjectId(res.locals.userId),
    parent: commentId,
    ...req.body,
  };

  const ratingObject = await ratingSchema.create(ratingData);

  comment.ratingsArray = [...comment.ratingsArray, ratingObject];
  comment.rating = findAverage(comment.ratingsArray);
  sendChangesToPost( post, comment, commentId, parentCommentId );
  await comment.save();
};
