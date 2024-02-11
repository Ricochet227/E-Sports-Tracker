import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ matchId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    
  }, [matchId]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>{comment.text}</div>
      ))}
    </div>
  );
};

export default CommentList;
