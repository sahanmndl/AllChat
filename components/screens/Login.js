import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {signInWithEmailAndPassword} from 'firebase/auth';
import PasswordInputText from "react-native-hide-show-password-input";
import {auth} from "../../config/firebase";

export default function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (email !== "" && password !== "" && password.length >= 8) {
            signInWithEmailAndPassword(auth, email.trim(), password.trim())
                .then(() => console.log('Login successful'))
                .catch(e => console.log(`Error: ${e}`))
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login to AllChat!</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <PasswordInputText
                style={styles.passwordInput}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                title="Login"
                color="#007AFF"
                onPress={handleLogin}
            />
            <View style={styles.space} />
            <Button
                title="Create a new Account"
                color="#F57C00"
                onPress={() => navigation.navigate("SignUp")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 75,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#444',
        alignSelf: 'center',
        paddingBottom: 24
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 25,
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: '#333',
        borderRadius: 4,
        padding: 8
    },
    passwordInput: {
        marginBottom: 30,
        paddingHorizontal: 4,
        fontSize: 16
    },
    space: {
        width: 20,
        height: 30,
    },
})