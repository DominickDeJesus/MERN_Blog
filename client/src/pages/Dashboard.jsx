import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Entry from '../components/Entry';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const [entries, setEntries] = useState(null);
  const { reloadEntries, setReloadEntries } = useContext(AppContext);
  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await axios.get('/api/entries', {
          withCredentials: true
        });
        setEntries(response.data);
        setReloadEntries(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEntries();
  }, [reloadEntries]);

  return (
    <>
      <Container>
        {entries?.map((post) => {
          return <Entry key={post._id} entry={post} />;
        })}
      </Container>
    </>
  );
};
export default Dashboard;
