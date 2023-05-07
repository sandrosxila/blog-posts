import styled from 'styled-components';

const Button = styled.button`
  background: white;
  color: black;
  box-shadow: none;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem;
  height: 2rem;
  font-weight: 600;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: black;
    color: white;
    border: 1px solid white;
    cursor: pointer;
  }
`;

export default Button;
