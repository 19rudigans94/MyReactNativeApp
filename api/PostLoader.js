import { useState, useEffect } from 'react';
import { fetchPosts } from './api';

export default function usePostLoader() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPost = async () => {
        setLoading(true);
        try {
            const postsData = await fetchPosts();
            setPosts(postsData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return { posts, loading, error };
}