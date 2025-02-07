import React, { useState } from 'react';

import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import DeleteMessage from './delete-message';
import styles from './post-card.module.scss';
import { deleteImage } from '../api/images';
import { deletePost } from '../api/posts';
import { Post } from '../models';
import { useAppSelector } from '../store';

type Props = {
    title: string;
    content: string;
    postUserId: string;
    postId: string;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    getPosts: () => Promise<Post[]>;
    imageName: string;
};

function PostCard({
    title,
    content,
    postUserId,
    postId,
    setPosts,
    getPosts,
    imageName,
}: Props) {
    const { userId } = useAppSelector((state) => state.auth.userData);

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const switchShowDeleteMessage = () =>
        setShowDeleteMessage(!showDeleteMessage);

    const onDeleteClick = async () => {
        await deletePost(postId);
        if (imageName) {
            await deleteImage(imageName);
        }
        if (userId) {
            const posts = await getPosts();
            setPosts(posts);
        }
    };

    return (
        <div className={ styles.cardLayout }>
            {
                showDeleteMessage && (
                    <DeleteMessage
                        message={ 'Do You Really Want To Delete The Post?' }
                        onDeleteClick={ onDeleteClick }
                        onCloseClick={ switchShowDeleteMessage }
                    />
                )
            }
            {
                imageName && (
                    <img
                        className={ styles.postImage }
                        src={ `/api/images/${imageName}` }
                        alt="Loading ..."
                    />
                )
            }

            <div className={ styles.postBody }>
                <div className={ styles.postCardHeader }>
                    {title}
                    {
                        userId === postUserId && (
                            <div className={ classNames('toolbar', styles.toolBar) }>
                                <FontAwesomeIcon
                                    className={ styles.faTimes }
                                    icon={ faTimes }
                                    onClick={ switchShowDeleteMessage }
                                />
                                <Link className={ styles.editLink } to={ `/edit/${postId}` }>
                                    <FontAwesomeIcon
                                        className={ styles.faPencil }
                                        icon={ faPencilAlt }
                                    />
                                </Link>
                            </div>
                        )
                    }
                </div>
                <div className={ styles.content }>{ReactHtmlParser(content)}</div>
            </div>
            <div className={ styles.buttonGroup }>
                <Link className={ styles.button } to={ `/${userId}/posts/${postId}` }>
                    Read More...
                </Link>
            </div>
        </div>
    );
}

export default PostCard;
