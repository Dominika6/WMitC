import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { commentTask } from "../../actions/tasks";

const Comments = ({ task }) => {
  const dispatch = useDispatch();
  const [task_comment, setComment] = useState("");
  const [task_comments, setComments] = useState(task?.task_comments);
  const [loggedUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleClick = async () => {
    const finalComment = `${loggedUser?.result?.name}: ${task_comment}`;
    const newComments = await dispatch(commentTask(finalComment, task._id));
    setComments(newComments);
    setComment("");
    window.location.reload();
  };

  return (
    <div>
      <Typography variant="h5">Discussion</Typography>
      <br />
      <div>
        {task_comments?.map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            <strong>{comment.split(": ")[0]}:</strong>
            {comment.split(":")[1]}
          </Typography>
        ))}
      </div>
      <br />
      {loggedUser?.result?.name && (
        <div>
          <TextField
            fullWidth
            minRows={2}
            variant="outlined"
            multiline
            value={task_comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <br />
          <Button variant="success" onClick={handleClick}>
            Add
          </Button>
          <br />
        </div>
      )}
    </div>
  );
};

export default Comments;
