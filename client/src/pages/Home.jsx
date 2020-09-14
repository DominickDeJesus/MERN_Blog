import React from 'react';
import Navigation from '../components/Navigation';
import { useState, useEffect } from 'react';
import Entry from '../components/Entry';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [entries, setEntries] = useState([
    {
      _id: 'asldkfja12341sdlkfjaasdsdf',
      title: 'We did this blog',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      public: true,
      owner: 'James jingles',
      comments: [
        {
          name: 'Carls Jr',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          name: 'jane dough',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          name: 'john smith',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
      ]
    }
  ]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await axios.get('/api/entries');
        setEntries(response);
      } catch (error) {
        console.log(error);
      }
    };
    getEntries();
  }, []);

  return (
    <Container>
      {entries?.map((post) => {
        return <Entry key={post._id} entry={post} />;
      })}
    </Container>
  );
};

export default Dashboard;
