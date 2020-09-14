import React, { useContext } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ comments }) => {
  const { currentUser } = useContext(AppContext);
  const [comment, setComment] = useState({});

  const handleChange = (event) => {
    setComment({ comment: event.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/CHANHETHIS', comment);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
