import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Entry from '../components/Entry';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [entries, setEntries] = useState(null);
  const { reloadEntries, setReloadEntries, currentUser } = useContext(
    AppContext
  );
  const [guest, setGuest] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) setGuest(true);
  }, [setGuest, userId]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        if (guest) {
          const response = await axios.get(`/api/public/entries/${userId}`);
          setEntries(response.data);
        } else if (currentUser) {
          const response = await axios.get('/api/entries', {
            withCredentials: true
          });
          setEntries(response.data);
          setReloadEntries(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEntries();
  }, [reloadEntries, guest, currentUser, setEntries, setReloadEntries, userId]);

  return (
    <>
      <Container>
        {entries?.map((post) => {
          return <Entry key={post._id} entry={post} canEdit={!guest} />;
        })}
      </Container>
    </>
  );
};
export default Dashboard;
