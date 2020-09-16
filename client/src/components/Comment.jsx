import React from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
  const dateTime = moment(comment.lastUpdated).fromNow();
  return (
    <div>
      <div className="user font-weight-bold ">
        {comment.name ? comment.name : 'Anonymous'}
        <span style={{ fontSize: '.75rem' }} className="text-muted mx-2 ">
          {dateTime}
        </span>
      </div>
      <p className="px-4">{comment.content}</p>
    </div>
  );
};

export default Comment;
