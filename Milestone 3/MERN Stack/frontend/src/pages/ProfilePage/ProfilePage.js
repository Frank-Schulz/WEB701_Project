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
  const [ orderOwner, setOrderOwner ] = useState(null);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };


  const updateUserDetails = async (e) => {
    e.preventDefault();

    setDetailsError(null);
    try {

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

  const checkOrder = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(
      `/tokens/order/${e.target.value}`,
      config
    );
    setOrderOwner(`Order is owned by ${data}`);

    if (data) {
    } else {
      setOrderOwner(`Enter order id to see owner`);
    }
  }

  const validateOrder = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data } = await axios.patch(
      `/orders/complete/${e.target.value}`,
      config
    )

    setOrderOwner("Order validated!")

    setLoading(false);
  }

  const deleteAccount = async (e, email) => {
    e.preventDefault();
    setDetailsError(null);

    try {
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
    <MainScreen title={`${userInfo.type.charAt(0).toUpperCase() + userInfo.type.slice(1)} Profile`}>
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
        {userInfo.type === "beneficiary" &&
          <Col>
            <legend>Orders</legend>
            <h6>Unclaimed</h6>
            <OrderList userID={userInfo.email} orderState={0} />
            <hr />
            <h6>Completed</h6>
            <OrderList userID={userInfo.email} orderState={1} />
          </Col>
        }
        {userInfo.type === "member" &&
          <Col>
            <legend>Order Validation</legend>
            <Form onSubmit={validateOrder}>
              <Form.Group className="mb-3">
                <Form.Label>Enter order id</Form.Label>
                <Form.Control type="token" onChange={(e) => { checkOrder(e) }} />
                <p>{orderOwner}</p>

              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Validate
                </Button>
              </div>
            </Form>
          </Col>
        }
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
