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
    <Container>
      <div className="profile-page">
        <div className="profile">
          <div>
            <div>
              <div>
                <h2>Your Profile</h2>
                <p className="profile-text">
                  Name: <span>{currentUser?.name}</span>
                </p>
                <p className="profile-text">
                  Email: <span>{currentUser?.email}</span>
                </p>
              </div>
            </div>
            <div className="profile-items">
              <div>
                <div className="avatar-prev">
                  <Image
                    src={
                      preview
                        ? preview
                        : currentUser?.avatar
                        ? currentUser.avatar
                        : require('../resources/images/default_avatar.png')
                    }
                    className="h-100 wa"
                    alt="profilePic"
                  />
                </div>
                <div>
                  <form className="profile-btns" onSubmit={handleImage}>
                    <input
                      className="upload-avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <div className="profile-btn-flex">
                      <Button
                        variant="flat"
                        className="profile-btn-save"
                        type="submit"
                      >
                        Save Image
                      </Button>

                      <Button
                        variant="flat"
                        className="profile-btn-delete"
                        onClick={handleDelete}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
