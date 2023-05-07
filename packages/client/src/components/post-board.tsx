import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import styles from './post-board.module.scss';
import PostCard from './post-card';
import ProfileCard from './profile-card';
import UserActions from './user-actions';
import { getAllPosts } from '../api/posts';
import { Post } from '../models';
import { useAppSelector } from '../store';

function PostBoard() {
    const [posts, setPosts] = useState<Post[]>([]);

    const { userId } = useAppSelector((state) => state.auth.userData);

    useQuery({
        queryKey: ['all_posts'],
        queryFn: () => getAllPosts(),
        onSuccess: (data) => {
            setPosts(data);
        },
    });

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
