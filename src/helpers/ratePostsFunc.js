const ObjectId = require("mongoose").Types.ObjectId;
const { ratingSchema } = require('../schemas/comment.schema');
const findAverage = require("./helpers");

module.exports = async function ratePostFunc(post, res, req) {
    const rating = await ratingSchema.findOne({
        author: res.locals.userId,
      });

      if (rating) {
        await ratingSchema.findOneAndDelete({
          author: res.locals.userId,
        });
        const newRatingsArray = post.ratingsArray.filter((ratingObj) => {
          return ratingObj.author.toString() != rating.author.toString();
        });
        post.ratingsArray = [...newRatingsArray];
      }
      const ratingData = {
        author: ObjectId(res.locals.userId),
        parent: req.params.id,
        ...req.body,
      };

      const ratingObject = await ratingSchema.create(ratingData);
      post.ratingsArray = [...post.ratingsArray, ratingObject];

      post.rating = findAverage(post.ratingsArray);
}