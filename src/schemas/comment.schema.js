const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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

const ReplySchema = new Schema(
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
    ratingsArray: [RatingSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const CommentSchema = new Schema(
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
    rating: {
      type: Number,
      default: 0,
    },
    replies: [ReplySchema],
    parentCommentId: {
      type: ObjectId,
      default: null
    },
    parentId: {
      type: ObjectId,
      required: true
    },
    ratingsArray: [RatingSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

CommentSchema.plugin(mongoosePaginate);

module.exports = {
  commentSchema: mongoose.model("Comment", CommentSchema),
  replySchema: mongoose.model("Reply", ReplySchema),
  ratingSchema: mongoose.model("Rating", RatingSchema),
};