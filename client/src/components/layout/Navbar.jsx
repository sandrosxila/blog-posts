import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    background: #6910a8;
    padding: 0 4rem;
`;

const NavDiv = styled.div`
    display: flex;
    height: 100%;
    gap: 0.5rem;
    box-sizing: border-box;
    align-items: center;
`;

const NavDivItem = styled.a`
    display: flex;
    text-decoration-line: none;
    color: white;
    margin: 0 0.5rem;

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
    return (
        <Nav>
            <NavDiv>
                <NavDivItem>
                    Home
                </NavDivItem>
                <NavDivItem>Add Post</NavDivItem>
            </NavDiv>
            <NavDiv>
                <Logo>Blog Posts</Logo>
            </NavDiv>
            <NavDiv>
                <NavButton>Log In</NavButton>
                <NavButton>Sign Up</NavButton>
            </NavDiv>
        </Nav>
    );
}
