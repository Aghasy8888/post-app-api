const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorSurname: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    replies: {
      type: Array,
      default: [],
    },
    parentCommentId: {
      type: ObjectId,
      default: null
    },
    parentId: {
      type: ObjectId,
      required: true
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
});

const RatingSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  }
);

const PostSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorSurname: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingsArray: [RatingSchema],
    comments: [CommentSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
