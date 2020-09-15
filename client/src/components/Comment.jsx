import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div>
      <div className="user">{comment.name ? comment.name : 'Anonymous'}</div>
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
