import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchPostById, fetchPostComments } from '../api/api';

export default function OnePost({ route }) {
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await fetchPostById(id);
                setPost(postData);
                const commentsData = await fetchPostComments(id);
                setComments(commentsData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleAddComment = () => {
        if (comment.trim()) {
            if (editingCommentId) {
                setComments(comments.map(item =>
                    item.id === editingCommentId ? { ...item, body: comment } : item
                ));
                setEditingCommentId(null);
            } else {
                setComments([...comments, { id: comments.length + 1, body: comment }]);
            }
            setComment("");
        }
    };

    const handleEditComment = (item) => {
        setComment(item.body);
        setEditingCommentId(item.id);
    };

    const handleDeleteComment = (id) => {
        setComments(comments.filter(item => item.id !== id));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Ошибка: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {post ? (
                <>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text>{post.body}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Добавить коммент..."
                        value={comment}
                        onChangeText={setComment}
                    />
                    <Button title={editingCommentId ? "Update Comment" : "Submit"} onPress={handleAddComment} />

                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <Text>{item.body}</Text>
                                <View style={styles.commentActions}>
                                    <TouchableOpacity onPress={() => handleEditComment(item)}>
                                        <Text style={styles.editButton}>Редактировать</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                                        <Text style={styles.deleteButton}>Удалить</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text>Пост не найден.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
    },
    error: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    commentContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentActions: {
        flexDirection: 'row',
    },
    editButton: {
        color: 'blue',
        marginRight: 10,
    },
    deleteButton: {
        color: 'red',
    },
});
