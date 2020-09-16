import React from 'react';
import { useState, useEffect } from 'react';
import Entry from '../components/Entry';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import QueryString from 'query-string';

const Home = ({ location }) => {
  const [entries, setEntries] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const params = QueryString.parse(location.search);

  useEffect(() => {
    if (params.search) {
      const filtered = entries?.filter((entry) => {
        return entry.title.toLowerCase().includes(params.search.toLowerCase());
      });
      setFiltered(filtered);
    } else setFiltered(entries);
  }, [setEntries, setFiltered, entries, params.search]);

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
        <h2 className="py-4">Latest Posts</h2>
        {filtered
          ?.slice(0)
          ?.reverse()
          ?.map((post) => {
            return <Entry key={post._id} entry={post} canEdit={false} />;
          })}
      </Container>
    </>
  );
};

export default Home;
