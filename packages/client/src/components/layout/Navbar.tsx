import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AuthState, logOut } from '../../slices/authSlice';
import { useAppDispatch } from '../../store';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  background: #6910a8;
  padding: 0 4rem;

  @media only screen and (max-width: 976px) {
    padding: 0 1rem;
  }
`;

const NavDiv = styled.div`
  display: flex;
  height: 100%;
  gap: 0.5rem;
  box-sizing: border-box;
  align-items: center;
`;

const NavDivItem = styled(Link)`
  display: flex;
  text-decoration-line: none;
  color: white;
  margin: 0 0.5rem;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const NavButton = styled.button`
  background: white;
  color: black;
  box-shadow: none;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  padding: 0.5rem;
  height: 2rem;
  font-weight: 600;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: transparent;
    color: white;
    border: 1px solid white;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-family: "Leckerli One", cursive;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default function Navbar() {
    const isLoggedIn = useSelector(
        (state: { auth: AuthState }) => state.auth.isLoggedIn
    );
    const dispatch = useAppDispatch();

    const onLogOutClick = () => {
        dispatch(logOut());
    };

    return (
        <Nav>
            <NavDiv>
                <NavDivItem to={ '/' }>Home</NavDivItem>
                {
                    isLoggedIn && (
                        <>
                            <NavDivItem to={ '/add' }>Add Post</NavDivItem>
                        </>
                    )
                }
            </NavDiv>
            <NavDiv>
                <Logo>Blog Posts</Logo>
            </NavDiv>
            <NavDiv>
                <NavDivItem to={ '/about-us' }>About Us</NavDivItem>
                {isLoggedIn && <NavButton onClick={ onLogOutClick }>Log Out</NavButton>}
            </NavDiv>
        </Nav>
    );
}
