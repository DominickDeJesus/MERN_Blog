import React, { useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import CommentSection from './CommentSection';
import { AppContext } from '../context/AppContext';

const Entry = ({ entry }) => {
  const [showComments, setShowComments] = useState(false);
  const { currentUser } = useContext(AppContext);
  return (
    <Card bg="">
      <Card.Body>
        <Card.Title>{entry.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{entry.owner}</Card.Subtitle>
        <Card.Text>{entry.content}</Card.Text>
        <Button
          className="mb-3"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          Comments
        </Button>
        {showComments && <CommentSection comments={entry.comments} />}
      </Card.Body>
    </Card>
  );
};

export default Entry;
