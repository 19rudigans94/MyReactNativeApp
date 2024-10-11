import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import usePostLoader from '../api/PostLoader';

export default function Posts({ navigation }) {
    const { posts, loading, error } = usePostLoader();
    const [hoveredItemId, setHoveredItemId] = useState(null);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading posts: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("OnePost", { id: item.id })}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        style={[styles.item, hoveredItemId === item.id && styles.hoverItem]}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
    list: {
        flex: 1,
        marginTop: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    item: {
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CED4DA',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    hoverItem: {
        backgroundColor: '#E9ECEF',
        opacity: 1.2,
    },
    title: {
        fontSize: 18,
        color: '#343A40',
    }
});