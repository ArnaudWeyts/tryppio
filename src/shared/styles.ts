import styled from 'styled-components';

import arrowForwardSvg from '../img/arrow-forward.svg';

export const LayoutCentered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const BackIconButton = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;

  position: absolute;
  top: 2em;
  left: 1.75em;
  background: url(${arrowForwardSvg}) center no-repeat;
  font-size: 20px;
  width: 1.75em;
  height: 1.75em;
  transform: rotate(-180deg);
`;
