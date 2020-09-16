import React, { useState, useEffect, useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Entry from '../components/Entry';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const Dashboard = ({ history }) => {
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
        <div className="d-flex align-items-center">
          <h2 className="py-4 mr-auto">
            {entries && entries[0]?.authorName + "'s Posts"}
          </h2>
          {!guest && (
            <Button
              className="h-25"
              variant="secondary"
              onClick={() => history.push('/addpost')}
            >
              Create a Post
            </Button>
          )}
        </div>
        {entries
          ?.slice(0)
          ?.reverse()
          ?.map((post) => {
            return <Entry key={post._id} entry={post} canEdit={!guest} />;
          })}
      </Container>
    </>
  );
};
export default Dashboard;
