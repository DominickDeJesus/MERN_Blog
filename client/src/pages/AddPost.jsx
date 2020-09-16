import React, { useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddPost = ({ history }) => {
  const [isPublic, setIsPublic] = useState(false);
  const [post, setPost] = useState({
    isPublic: isPublic,
    title: '',
    content: ''
  });
  const { id } = useParams();
  const [patchMode, setPatchMode] = useState(false);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        try {
          const resp = await axios.get(`/api/entries/${id}`);
          setPatchMode(true);
          const { content, title, comments, isPublic } = resp.data;
          setPost({
            content: content,
            title: title,
            comments: comments,
            isPublic: isPublic
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPost();
  }, [setPost, setPatchMode, id]);

  useEffect(() => {
    setPost({ ...post, isPublic: isPublic });
  }, [isPublic, setPost]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (patchMode) {
        await axios.patch(`/api/entries/${id}`, post, {
          withCredentials: true
        });
      } else {
        await axios.post(`/api/entries`, post, {
          withCredentials: true
        });
      }
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2 className="pt-4 pb-3">{patchMode ? 'Edit' : 'Create'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div className="d-flex">
            <Form.Label className="mr-auto">Title</Form.Label>
            <Form.Check
              onChange={() => setIsPublic(!isPublic)}
              type="switch"
              name="public"
              id="custom-switch"
              label="Public"
              checked={post?.isPublic}
            />
          </div>

          <Form.Control
            onChange={handleChange}
            as="input"
            name="title"
            aria-label="With textarea"
            rows="15"
            value={post?.title}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            onChange={handleChange}
            as="textarea"
            name="content"
            aria-label="With textarea"
            rows="10"
            value={post?.content}
            required
          />
        </Form.Group>
        <Button type="submit" variant="outline-secondary">
          Post
        </Button>
      </Form>
    </Container>
  );
};

export default AddPost;
