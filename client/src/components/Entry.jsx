import React, { useState, useContext } from 'react';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import CommentSection from './CommentSection';
import { AppContext } from '../context/AppContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Entry = ({ entry, canEdit }) => {
  const [showComments, setShowComments] = useState(false);
  const { setReloadEntries } = useContext(AppContext);
  const [currentEntry] = useState(entry);
  const history = useHistory();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/entries/${entry._id}`, {
        withCredentials: true
      });
      setReloadEntries(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    history.push(`/addPost/${entry._id}`);
  };

  return (
    <Card bg="" className="my-3">
      <Card.Body>
        <div className="d-flex">
          <Card.Title className="mr-auto" style={{ fontSize: '2rem' }}>
            {currentEntry?.title}
          </Card.Title>
          {canEdit && (
            <DropdownButton variant="" title="">
              <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            </DropdownButton>
          )}
        </div>
        <Card.Subtitle
          className="mb-2 text-muted author"
          onClick={() => {
            history.push(`/dashboard/${entry.owner}`);
          }}
        >
          {currentEntry?.authorName}
        </Card.Subtitle>
        <Card.Text>{entry.content}</Card.Text>
        <Button
          className="mb-3"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          Comments
        </Button>
        {showComments && (
          <CommentSection
            comments={currentEntry?.comments}
            id={currentEntry?._id}
          />
        )}
      </Card.Body>
      <Card.Footer
        style={{ fontSize: '.75rem' }}
        className="text-muted text-right"
      >
        Created on: {entry?.createdAt}
      </Card.Footer>
    </Card>
  );
};

export default Entry;
