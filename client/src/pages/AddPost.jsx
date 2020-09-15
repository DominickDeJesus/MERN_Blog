import React, { useContext, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddPost = ({ history }) => {
  const { currentReflection } = useContext(AppContext);
  const [isPublic, setIsPublic] = useState(false);
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(currentReflection?.image);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const [patchMode, setPatchMode] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === 'image') {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      setPost({ ...post, image: '' });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        try {
          const resp = await axios.get(`/api/entries/${id}`, {
            withCredentials: true
          });
          setPatchMode(true);
          const { content, title, comments, isPublic } = resp.data;
          setPost({
            content: content,
            title: title,
            comments: comments,
            isPublic: isPublic
          });
          console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPost();
  }, []);

  useEffect(() => {
    setPost({ ...post, isPublic: isPublic });
  }, [isPublic, setPost]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (patchMode) {
        const resp = await axios.patch(`/api/entries/${id}`, post, {
          withCredentials: true
        });
      } else {
        const resp = await axios.post(`/api/entries`, post, {
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
