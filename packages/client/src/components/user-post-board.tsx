import React from 'react';

import { useQuery } from '@tanstack/react-query';

import PostCard from './post-card';
import ProfileCard from './ProfileCard';
import styles from './user-post-board.module.scss';
import UserActions from './user-actions';
import { getUserPosts } from '../api/users';
import { Post } from '../models';
import { useAppSelector } from '../store';

function UserPostBoard() {
    const [posts, setPosts] = React.useState<Post[]>([]);

    const { userId } = useAppSelector((state) => state.auth.userData);

    useQuery({
        queryKey: ['user_posts'],
        queryFn: () => getUserPosts(userId!),
        onSuccess: (data) => {
            setPosts(data);
        }
    });

    const getPosts = React.useCallback(() => getUserPosts(userId!), [userId]);

    return (
        <div className={ styles.postBoardLayout }>
            <aside className={ styles.leftBar }>
                <ProfileCard />
            </aside>
            <div className={ styles.contentBoard }>
                <h1>Your Posts</h1>
                {
                    userId && (
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
                    )
                }
            </div>
            <aside className={ styles.rightBar }>
                <UserActions />
            </aside>
        </div>
    );
}

export default UserPostBoard;
