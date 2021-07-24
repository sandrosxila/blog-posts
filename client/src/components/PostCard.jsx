import React from 'react'
import styled from 'styled-components';
import Card from './styled-component/Card';

const CardLayout = styled(Card)`
    width: 32rem;
    height: auto;
`;

const PostImage = styled.img`
    object-fit: fill;
    width: 100%;
    height:50%;
`;

const PostBody = styled.div`
    margin: 0 1.5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const Button = styled.button`
    background: #4361ee;
    color: white;
    border: 1px solid #364fc0;
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin: 1.2rem 1.5rem;
    box-shadow: none;
    padding: 0.5rem;
    height: 2rem;
    font-weight: 600;
    font-size: 0.8rem;
    transition: all ease-in-out 0.3s;

    &:hover {
        background: #364fc0;
        cursor: pointer;
        box-shadow: 0 0 8px 2px #4362ee44 ;
    }
`;

function PostCardLayout() {
    return (
        <CardLayout>
            <PostImage src="https://via.placeholder.com/500x200" alt="Did Not Load!!!" />
            <PostBody>
                <h2>Post Title</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt esse reiciendis, eos aperiam inventore consequatur veritatis quas iste nesciunt nemo debitis quis amet odio? Modi officia expedita voluptatem vero qui.
                </p>
            </PostBody>
            <ButtonGroup>
                <Button>
                    Learn More
                </Button>
            </ButtonGroup>
        </CardLayout>
    )
}

export default PostCardLayout;
