"use client";

import React from 'react';

import PostCard from './post-card';
import ProfileCard from './profile-card';
import UserActions from './user-actions';
import styles from './user-post-board.module.scss';
import { getUserPosts } from '../api/users';
import { Post } from '../models';
import { useAppSelector } from '../store';

function UserPostBoard() {
    const [posts, setPosts] = React.useState<Post[]>([
        {
            content: "<p>Hello</p>",
            image: "",
            postId: "1",
            title: "Test"
        }
    ]);

    const { userId } = {userId: "1"};


    const getPosts = React.useCallback(() => getUserPosts(userId!), [userId]);

    return (
        <div className={ styles.postBoardLayout }>
            <aside className={ styles.leftBar }>
                <ProfileCard />
            </aside>
            <div className={ styles.contentBoard }>
                <h1>Your Posts</h1>
                {
                    userId &&
          posts.map(({ title, image, content, postId }) => (
              <PostCard
                  key={ postId }
                  title={ title }
                  imageName={ image }
                  content={ content }
                  postUserId={ userId }
                  postId={ postId }
                  setPosts={ setPosts }
                  getPosts={ getPosts }
              />
          ))
                }
            </div>
            <aside className={ styles.rightBar }>
                <UserActions />
            </aside>
        </div>
    );
}

export default UserPostBoard;
