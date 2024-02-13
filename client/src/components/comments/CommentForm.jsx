import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = () => {
  const [formState, setFormState] = useState("");
  const [emptyText, setEmptyText] = useState(false);
  const [addComment, { error, data }] = useMutation(ADD_COMMENT);
  const { matchid } = useParams();
  //checks for errors running the mutation
  if (error) {
    console.error("Error adding comment", error);
    return <p>Error adding comment</p>;
  }
  //sets the formState on change
  const handleChange = (e) => {
    const { value } = e.target;
    setFormState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevents submitting empty comments
    if (!formState.trim()) {
      setEmptyText(true);
    } else {
      setEmptyText(false);
      try {
        //adds a comment
        const { data } = await addComment({
          variables: {
            text: formState,
            matchId: matchid,
          },
        });
        setFormState(""); // Clear the text after submitting
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={formState} onChange={handleChange} />
      <button type="submit">Submit Comment</button>
      {emptyText ? <p>Cannot submit and empty comment.</p> : ""}
    </form>
  );
};

export default CommentForm;
