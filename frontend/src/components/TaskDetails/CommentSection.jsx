import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { commentTask } from '../../actions/tasks';


const CommentSection = ({ task }) => {

    const classes = useStyles();
    const [task_comment, setComment] = useState('');
    const [task_comments, setComments] = useState(task?.task_comments);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${task_comment}`;

        const newComments = await dispatch(commentTask(finalComment, task._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    };

    // TODO komentarze pokazują sie dopiero po odświeżeniu strony - niech pokazują się od razu
    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {task_comments?.map((c,i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (
                <div style={{width:'70%'}}>
                    <Typography gutterBottom variant="h6">Write a comment</Typography>
                    <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={task_comment} onChange={(e) => setComment(e.target.value)} />
                    <Button style={{marginTop:'10px'}} fullWidth disabled={!task_comment} variant="contained" color="primary" onClick={handleClick}>
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;
