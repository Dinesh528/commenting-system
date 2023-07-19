import React, { useState } from 'react';

const Comment = ({ comment, onReply, onDelete, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const time = new Date(parseInt(comment.id, 10)).toLocaleString();

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(comment.id, replyText);
    setIsReplying(false);
    setReplyText('');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditSave = () => {
    onEdit(comment.id, editedText);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment">
      <div className="comment-content">
        <p>{comment.text}</p>
        <p className="comment-time">Posted on: {time}</p>
      </div>
      <div className="comment-buttons">
        <button onClick={handleReply} className="reply-btn">
          Reply
        </button>
        <button onClick={handleEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="comment-reply-form">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            required
          />
          <button type="submit">Reply</button>
        </form>
      )}
      {editMode && (
        <div className="edit-comment-form">
          <textarea
            rows="3"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEditSave}>Save</button>
        </div>
      )}
      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default Comment;
