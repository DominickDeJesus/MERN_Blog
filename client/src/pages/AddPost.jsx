import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { Image, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const AddPost = ({ history }) => {
  const { currentReflection, currentGoal, setCurrentGoal } = useContext(
    AppContext
  );
  const [isPublic, setIsPublic] = useState(false);
  const [reflection, setReflection] = useState(currentReflection);
  const [image, setImage] = useState(currentReflection?.image);
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    if (event.target.name === 'image') {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      setReflection({ ...reflection, image: '' });
    } else {
      setReflection({ ...reflection, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = () => {};
  const handleSave = (event) => {
    const reflectionPost = new FormData();
    preview && reflectionPost.append('image', image, image.name);
    Object.keys(reflection).forEach((key) => {
      if (reflection[key] !== currentReflection[key])
        reflectionPost.append(key, reflection[key]);
    });
    axios
      .patch(
        `/api/goal/${currentGoal._id}/reflection/${currentReflection._id}`,
        reflectionPost,
        {
          withCredentials: true
        }
      )
      .then((response) => {
        setCurrentGoal(response.data);
      })
      .catch((error) => console.log(error));
    history.push('/milestone');
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
              id="custom-switch"
              label="Public"
            />
          </div>

          <Form.Control
            onChange={handleChange}
            as="input"
            name="title"
            aria-label="With textarea"
            rows="10"
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
