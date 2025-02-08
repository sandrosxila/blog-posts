"use client"

import React from 'react';

import parse from 'html-react-parser';

import styles from './post.module.scss';
import { useParams } from 'next/navigation';

function Post() {
    const { postId: urlPostId } = useParams<{postId: string}>();

    const postData = {
        title: 'Test Title',
        image: null,
        content: '<p>hello</p>',
    }

    const { title, image, content } = postData;

    return (
        <div className={ styles.addPostLayout }>
            <div className={ styles.postCard }>
                {
                    image && (
                        <img
                            className={ styles.postImage }
                            src={ `/api/images/${image}` }
                            alt="Loading ..."
                        />
                    )
                }
                <h1>{title}</h1>
                <div>{parse(content)}</div>
            </div>
        </div>
    );
}

export default Post;
