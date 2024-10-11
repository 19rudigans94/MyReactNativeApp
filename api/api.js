import axios from 'axios';

// Получить все посты
export const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
};

// Получить один пост по ID
export const fetchPostById = async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
};

// Получить комментарии к посту
export const fetchPostComments = async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return response.data;
}