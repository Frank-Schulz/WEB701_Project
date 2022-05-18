import { React, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
// import { BsCart, BsCartFill } from "react-icons/bs";
// import { FaChevronRight } from "react-icons/fa";

const AccountType = ({ title, description, buttonText }) => {
  // const [ inCart, setInCart ] = useState(false);

  const accountAction = async (accountType) => {
    alert("Not yet implemented"); //TODO: implement action
  }

  return (
    <>
      <Card.Body>
        <Card.Title className="text-center mb-3">{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <div style={{"padding": "auto"}}>
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
