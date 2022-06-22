import { React, useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountType = ({ title, description, buttonText }) => {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.userInfo).user;

  const accountAction = async (userType) => {
    if (!user) { navigate("/login"); return }

    if (user.type === userType) {
      alert(`Already a ${userType}`);
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post("users/account/updateType", { email: user.email, userType }, config);
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(data));

    user = JSON.parse(localStorage.userInfo).user;

    switch (user.type) {
      case "member":
        navigate("/products/");
        break;
      case "beneficiary":
        navigate("/products");
        break;
      default:
        alert("Failed to change type");
        break;
    }
  }

  return (
    <>
      <Card.Body>
        <Card.Title className="text-center mb-3">{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <div style={{ "padding": "auto" }}>
          <Button
            onClick={() => accountAction(title.toLowerCase())}
            style={{
              "backgroundColor": "orange",
              "backgroundRepeat": "no-repeat",
              "border": "none",
              "overflow": "hidden",
              "outline": "none",
              "padding": "10px",
              "margin": "0 calc(50% - 52.5px)",
              "width": "105px"
            }} >
            {buttonText}
          </Button>
        </div>
      </Card.Body>
    </>
  )
}

export default AccountType;
