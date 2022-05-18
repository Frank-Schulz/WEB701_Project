import { React, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

import AccountType from "../../components/AccountType";

// TODO: explain user types
const memberDescription = `
Hi I am a member
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Pellentesque habitant morbi tristique senectus et netus. Vitae et leo duis ut diam quam nulla porttitor massa. Convallis convallis tellus id interdum velit laoreet. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Eu augue ut lectus arcu. Amet nulla facilisi morbi tempus iaculis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Odio pellentesque diam volutpat commodo sed. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Senectus et netus et malesuada fames ac turpis.
`;
const beneficiaryDescription = `
Hi I am a beneficiary
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Pellentesque habitant morbi tristique senectus et netus. Vitae et leo duis ut diam quam nulla porttitor massa. Convallis convallis tellus id interdum velit laoreet. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Eu augue ut lectus arcu. Amet nulla facilisi morbi tempus iaculis. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Odio pellentesque diam volutpat commodo sed. Cum sociis natoque penatibus et magnis dis parturient montes nascetur. Senectus et netus et malesuada fames ac turpis.
`;

const LandingPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/account");
  //   }
  // }, [ navigate ]);

  return (
    <div className="page">
      <div>
        <section id="home" className="d-flex align-items-center position-relative cover hero">
          <div className="container-fluid container-fluid-max">
            <div className="row vw-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <h1 className="text-white text-center">Welcome to Nelson Food Tavern</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Container>
        <Row>
          <p>This site uses two account modes which are explained below and can be switched between</p>
        </Row>
        <Row>
          <Col>
            <AccountType title="Members" description={memberDescription} buttonText="Donate Now" />
          </Col>
          <Col>
            <AccountType title="Beneficiary" description={beneficiaryDescription} buttonText="Need Help?" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
