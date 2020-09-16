import React, { useContext } from 'react';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';
import moment from 'moment';

const CommentSection = ({ comments, id }) => {
  const { currentUser } = useContext(AppContext);
  const [commentPost, setCommentPost] = useState({});
  const [currentComments, setCurrentComments] = useState(comments);

  const handleChange = (event) => {
    setCommentPost({
      ...commentPost,
      name: currentUser?.name ? currentUser.name : 'Anonymous',
      content: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    form.reset();
    try {
      const response = await axios.post(`/api/public/entry/${id}/comment/`, {
        ...commentPost,
        lastUpdated: moment()
      });
      setCurrentComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {currentComments?.map((comment) => {
        return <Comment key={comment?._id} comment={comment} />;
      })}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            onChange={handleChange}
            as="textarea"
            name="content"
            aria-label="With textarea"
          />
          <Button type="submit" variant="outline-secondary">
            Post
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default CommentSection;
