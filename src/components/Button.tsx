import * as React from 'react';
import styled from 'styled-components';

import arrowForwardSvg from '../img/arrow-forward.svg';
import arrowForward_whiteSvg from '../img/arrow-forward_white.svg';

export const Container = styled.button`
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
      right: -0.375em;
      content: '';
      background: url(${props =>
          props.color === '#FFF' ? arrowForward_whiteSvg : arrowForwardSvg})
        center no-repeat;
      width: 1.75em;
      height: 1.75em;
      top: -0.1em;
    }
  }
`;

interface IButtonProps extends React.HTMLProps<any> {
  color: string;
  children: any;
}

const Button = ({ color, children, ...other }: IButtonProps) => {
  return (
    <Container color={color} {...other}>
      <span>{children}</span>
    </Container>
  );
};

export default Button;
