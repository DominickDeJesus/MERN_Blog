import React from 'react';
import { useState, useEffect } from 'react';
import Entry from '../components/Entry';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await axios.get('/api/public/entries');
        setEntries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEntries();
  }, []);

  return (
    <>
      <Container>
        {entries?.map((post) => {
          return <Entry key={post._id} entry={post} canEdit={false} />;
        })}
      </Container>
    </>
  );
};

export default Dashboard;
