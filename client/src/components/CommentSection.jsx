import React, { useContext } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';

const CommentSection = ({ comments }) => {
  const { currentUser } = useContext(AppContext);
  const [commentPost, setCommentPost] = useState({});

  const handleChange = (event) => {
    setCommentPost({ comment: event.target.value });
  };
  const handleSubmit = async () => {
    try {
      setCommentPost({
        ...commentPost,
        name: currentUser ? currentUser : 'Anonymous'
      });
      const response = await axios.post('/api/CHANHETHIS', commentPost);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
      <InputGroup>
        <FormControl
          onChange={handleChange}
          as="textarea"
          name="content"
          aria-label="With textarea"
        />
        <Button onClick={handleSubmit} variant="outline-secondary">
          Post
        </Button>
      </InputGroup>
    </div>
  );
};

export default CommentSection;
