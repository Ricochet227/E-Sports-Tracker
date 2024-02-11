import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ matchId }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
