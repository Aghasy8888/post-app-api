module.exports = async function sendChangesToPost( post, comment, commentId, parentCommentId) {
    let commentIndex;
    if (parentCommentId) {
        commentIndex = post.comments.findIndex((parentComment) => {
          return parentComment._id.toString() == comment.parentCommentId.toString();
        });
        const replyIndex = post.comments[commentIndex].replies.findIndex(
          (reply) => {
            return (
                reply._id.toString() == commentId.toString()
            );
          }
        );
        post.comments[commentIndex].replies[replyIndex] = comment;
      } else {
        commentIndex = post.comments.findIndex((comment) => {
          return comment._id.toString() == commentId.toString();
        });
        post.comments[commentIndex] = comment;
      }
}