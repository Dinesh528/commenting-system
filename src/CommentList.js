import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (text, parentId = null) => {
    const newComment = {
      id: new Date().getTime().toString(),
      text: text,
      replies: [],
    };

    if (parentId) {
      const updatedComments = addReplyToComment(comments, parentId, newComment);
      setComments(updatedComments);
    } else {
      setComments([...comments, newComment]);
    }
  };


  const handleDeleteComment = (id) => {
    const updatedComments = deleteComment(comments, id);
    setComments(updatedComments);
  };

  const deleteComment = (commentsArr, id) => {
    return commentsArr.filter((comment) => {
      if (comment.id === id) {
        return false;
      }
      if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteComment(comment.replies, id);
        return true;
      }
      return true;
    });
  };

  const handleEditComment = (id, text) => {
    const updatedComments = editComment(comments, id, text);
    setComments(updatedComments);
  };

  const editComment = (commentsArr, id, editedText) => {
    return commentsArr.map((comment) => {
      if (comment.id === id) {
        return { ...comment, text: editedText };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: editComment(comment.replies, id, editedText) };
      }
      return comment;
    });
  };

  const handleReplyToComment = (id, text) => {
    const updatedComments = addReplyToComment(comments, id, text);
    setComments(updatedComments);
  };

  const addReplyToComment = (commentsArr, parentId, replyText) => {
    return commentsArr.map((comment) => {
      if (comment.id === parentId) {
        const newReply = {
          id: new Date().getTime().toString(),
          text: replyText,
          replies: [],
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: addReplyToComment(comment.replies, parentId, replyText) };
      }
      return comment;
    });
  };
  console.log(comments)
  return (
    <div>
      <CommentForm onSubmit={handleAddComment} />
      <div className="comment-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReplyToComment} // Pass the handleReplyToComment function to Comment component
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
