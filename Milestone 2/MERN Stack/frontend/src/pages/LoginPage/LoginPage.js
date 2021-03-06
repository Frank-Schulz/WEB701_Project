import axios from 'axios'
import { React, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import "./LoginPage.css"


const LoginPage = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo).user : null;

  if (userInfo) {
    navigate("/account");
  }

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError(false);

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      setLoading(true);

      const { data } = await axios.post(
        "/users/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      navigate("/account");
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false);
    }
  }

  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading size={50} />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginPage;
