import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ matchId, onNewComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevents submitting empty comments

    try {
      // Not sure what end point to use currently
      const response = await axios.post(/*'/api/comments',*/ {
        matchId: matchId,
        text: text
      });

      setText(''); // Clear the text after submitting
      if (onNewComment) onNewComment(); // Invoke the callback if provided
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
