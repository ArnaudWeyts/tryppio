import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

import cityJpg from '../img/city.jpg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${cityJpg}) center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10em;
`;

const Title = styled.h1`
  flex-grow: 1;
  color: #fff;
  font-size: 40px;
`;

const Splash = () => (
  <Container>
    <Title>Tryppio</Title>
    <div>
      <Link to="/login">
        <Button color="#FFF">login</Button>
      </Link>
      <Link to="/signup">
        <Button color="#FFF">sign up</Button>
      </Link>
    </div>
  </Container>
);

export default Splash;
