import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Button} from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import PasswordInputText from "react-native-hide-show-password-input";
import {auth} from "../../config/firebase";

export default function SignUp({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignup = () => {
        if (email !== '' && password !== '' && password.length >= 8 && name !== "") {
            createUserWithEmailAndPassword(auth, email.trim(), password.trim())
                .then(() => console.log('Signup success'))
                .catch(err => console.log(`Login err: ${err}`));
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Account</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Name"
                textContentType="text"
                value={name}
                onChangeText={text => setName(text)}
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
                title="SignUp"
                color="#007AFF"
                onPress={handleSignup}
            />
            <View style={styles.space} />
            <Button
                title="Login"
                color="#F57C00"
                onPress={() => navigation.navigate("Login")}
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