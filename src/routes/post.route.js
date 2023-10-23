const express = require("express");
const validator = require("../middlewares/validator.middleware");
const auth = require("../middlewares/auth.middleware");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

/**
 * Аll routes start with '/post'
 **/

// create post
postRouter.post("/", auth, validator("post-create"), postController.create);

// delete post
postRouter.delete("/:id", auth, postController.delete);

// get batch posts
postRouter.get("/", auth, validator("category"), postController.getBatch);

// update post
postRouter.put("/:id", auth, validator("post-update"), postController.update);

//add comment to the post
postRouter.put(
  "/addComment/:id",
  auth,
  validator("add-comment"),
  postController.addComment
);

//remove comment
postRouter.put(
  "/removeComment/:id",
  auth,
  validator("remove-comment"),
  postController.removeComment
);

//rate post
postRouter.put(
  "/ratePost/:id",
  auth,
  validator("rate-post"),
  postController.ratePost
);

//rate comment
postRouter.put(
  "/rateComment/:id",
  auth,
  validator("rate-comment"),
  postController.rateComment
);

//edit comment
postRouter.put(
  "/editComment/:id",
  auth,
  validator("edit-comment"),
  postController.editComment
);

module.exports = postRouter;
