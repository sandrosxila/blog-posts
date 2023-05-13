import React from 'react';

import { useQuery } from '@tanstack/react-query';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';

import styles from './post.module.scss';
import { getPost } from '../api/posts';

function Post() {
    const { postId: urlPostId } = useParams();

    const {
        data: postData = {
            title: '',
            image: null,
            content: '',
        },
    } = useQuery({
        queryFn: () => getPost(urlPostId!),
    });

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
                <div>{ReactHtmlParser(content)}</div>
            </div>
        </div>
    );
}

export default Post;
