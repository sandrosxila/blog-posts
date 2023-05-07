import styled from 'styled-components';

const TextInput = styled.input`
  --box-shadow-color: #0000081d;
  border-radius: 0.8rem;
  height: 2rem;
  width: 16rem;
  border: 1px solid #00000022;
  padding: 0.2rem 0.55rem;
  transition: all ease-in 0.25s;
  font-size: 1rem;
  &:hover {
    box-shadow: 0 0 5px 1px var(--box-shadow-color, #0000081d);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 1px var(--box-shadow-color, #0000081d),
      inset 0 0 2px 1px var(--box-shadow-color, #0000081d);
  }
  &::placeholder {
    font-size: 0.9rem;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

export default TextInput;
