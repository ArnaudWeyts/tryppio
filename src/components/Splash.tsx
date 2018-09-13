import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import arrowForward_whiteSvg from '../img/arrow-forward_white.svg';
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

const Button = styled.button`
  color: ${props => props.color};
  font-size: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  width: 12.5em;

  & span {
    &:after {
      position: absolute;
      right: -1em;
      content: '';
      background: url(${arrowForward_whiteSvg}) center no-repeat;
      width: 1.75em;
      height: 1.75em;
      top: -0.1em;
    }
  }
`;

const Splash = () => (
  <Container>
    <Title>Tryppio</Title>
    <div>
      <Link to="/login">
        <Button color="#FFF">
          <span>login</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button color="#FFF">
          <span>sign up</span>
        </Button>
      </Link>
    </div>
  </Container>
);

export default Splash;
