import React, { useContext, useState } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const Profile = ({ history }) => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleImage = (event) => {
    event.preventDefault();
    if (image) {
      const avatar = new FormData();
      avatar.append('avatar', image, image.name);
      axios
        .post('/api/users/avatar', avatar, { withCredentials: true })
        .then((response) => {
          setCurrentUser({ ...currentUser, avatar: response.data.secure_url });
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: 'DELETE',
          url: '/api/users/me',
          withCredentials: true
        })
          .then(() => {
            sessionStorage.removeItem('user');
            setCurrentUser(null);
            history.push('/login');
          })
          .catch((error) => {
            console.log(error);
          });
        swal('Your account has been deleted!', {
          icon: 'success'
        });
      } else {
        swal('Your account has not been deleted!');
      }
    });
  };

  return (
    <Container className="d-flex justify-content-center flex-column align-items-center fullscreen">
      <h2 className="pb-3">Your Profile</h2>
      <p>
        Name: <span>{currentUser?.name}</span>
      </p>
      <p>
        Email: <span>{currentUser?.email}</span>
      </p>
      <Image
        src={
          preview
            ? preview
            : currentUser?.avatar
            ? currentUser.avatar
            : require('../resources/images/default_avatar.png')
        }
        style={{ height: '200px', width: '200px', overflow: 'hidden' }}
        alt="profilePic"
        roundedCircle
      />
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleImage}
      >
        <input
          className="p-3"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center">
          <Button className="mx-3 " type="submit">
            Save Image
          </Button>

          <Button className="mx-3 " onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Profile;
