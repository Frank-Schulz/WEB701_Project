import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import "./ProfilePage.css";

import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import OrderList from '../../components/OrderList';


const ProfilePage = () => {
  const navigate = useNavigate();

  const [ userInfo, setUserInfo ] = useState(localStorage.userInfo ?
    JSON.parse(localStorage.userInfo).user : '');

  // Redirect if not logged in
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/");
    }
  }, [ navigate ]);

  const [ fullName, setFullName ] = useState(userInfo ? userInfo.fullName : '');
  const [ email, setEmail ] = useState(userInfo ? userInfo.email : '');
  const [ detailsError, setDetailsError ] = useState(null);

  const [ loading, setLoading ] = useState(null);


  const updateUserDetails = async (e) => {
    e.preventDefault();

    setDetailsError(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/users/account/editDetails",
        { userInfo, fullName, email, },
        config
      );

      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(localStorage.userInfo ?
        JSON.parse(localStorage.userInfo).user : '');

      setLoading(false);
    } catch (addressError) {
      setDetailsError(addressError.response.data.message);
      setLoading(false);
    }
  }

  const deleteAccount = async (e, email) => {
    e.preventDefault();
    setDetailsError(null);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post(
        "/users/account/delete",
        { email },
        config
      )
        .then(({ data }) => {
          axios.post('/users/logout')
            .then(() => {
              localStorage.removeItem("userInfo");
              navigate("/");
            });
          alert(`Successfully deleted account belonging to: "${data}"!`);
        });
    }
    catch (accountError) {
      setDetailsError(accountError.response.data.message);
    }
  }

  return (
    <MainScreen title={`${userInfo.isAdmin ? 'Admin' : 'User'} Profile`}>
      <Row className="mb-3">
        <Col>
          {detailsError && <ErrorMessage variant="danger">{detailsError}</ErrorMessage>}
          <legend>User Details</legend>
          <Form onSubmit={updateUserDetails}>
            <Form.Group className="mb-3" controlId="userDetails">
              <Form.Label>Change name</Form.Label>
              <Form.Control
                type="name"
                value={fullName}
                placeholder={userInfo.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Form.Label>Change email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder={userInfo.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>


        </Col>
        <Col>
          <legend>Orders</legend>
          <h6>Unclaimed</h6>
          <OrderList userID={userInfo.email} orderState={0}/>
          <hr />
          <h6>Completed</h6>
          <OrderList userID={userInfo.email} orderState={1}/>
        </Col>
      </Row>
      <Row className="mt-3">
        <div className="justify-content-center" style={{ display: 'flex' }}>
          <div>
            <Button onClick={(e) => { deleteAccount(e, userInfo.email) }} className="btn btn-danger" style={{ width: '10em', margin: 'auto' }}>
              Delete Account
            </Button>
          </div>
        </div>
      </Row>

    </MainScreen>
  )
}

export default ProfilePage;
