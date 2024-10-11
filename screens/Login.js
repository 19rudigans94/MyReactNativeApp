import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const correctPassword = "1";

        if (email && password === correctPassword) {
            navigation.replace("Posts");
        } else {
            console.log("Неправильные учетные данные");
        }
    };

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.wrapper}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Вход</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Пароль"
                    secureTextEntry={true}
                    placeholderTextColor="#ccc"
                    value={password}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotText}>Забыли пароль?</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "90%",
        maxWidth: 400,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        height: 50,
        width: "100%",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#3b5998",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    forgotPassword: {
        marginTop: 15,
    },
    forgotText: {
        color: "#3b5998",
        fontSize: 14,
    },
});