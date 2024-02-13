import React, { useEffect, useState } from "react";
import { dateFormat } from "../../utils/dateFormat";

const CommentList = ({ comment }) => {
  const { _id, text, author, createdAt } = comment;

  return (
    <div className="comment-card">
      <p>{text}</p>
      <p>Author: {author}</p>
      <p>Posted: {dateFormat(createdAt)}</p>
    </div>
  );
};

export default CommentList;
