import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} >
       <div >
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        required
        style={{
            padding:"20px",
            margin:"10px"
    }}
      />
 
      <button 
      type="submit"
      style={{
        padding:"20px",
        color:"white",
        backgroundColor:"#2196f3",
       
    }}
      >Add Comment</button>
      </div> 
    </form>
  );
};

export default CommentForm;
