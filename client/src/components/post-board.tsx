"use client";

import React, { useState } from 'react';

import styles from './post-board.module.scss';
import PostCard from './post-card';
import ProfileCard from './profile-card';
import UserActions from './user-actions';
import { getAllPosts } from '../api/posts';
import { Post } from '../models';

function PostBoard() {
    const [posts, setPosts] = useState<Post[]>([]);

    const { userId } = { userId: "1" };

    return (
        <div className={ styles.postBoardLayout }>
            <aside className={ styles.leftBar }>
                <ProfileCard />
            </aside>
            <aside className={ styles.rightBar }>
                <UserActions />
            </aside>
            <div className={ styles.contentBoard }>
                {
                    userId &&
                    posts.map((post) => {
                        const { title, image, content, postId } = post;
                        return (
                            <PostCard
                                key={ postId }
                                title={ title }
                                imageName={ image }
                                content={ content }
                                postUserId={ userId }
                                postId={ postId }
                                setPosts={ setPosts }
                                getPosts={ getAllPosts }
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PostBoard;
