import React, {useCallback, useLayoutEffect, useState} from 'react';
import {GiftedChat} from "react-native-gifted-chat";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {signOut} from "firebase/auth";
import {auth, database} from "../../config/firebase";
import {LogBox, Text, TouchableOpacity} from "react-native";

export default function Chat({navigation}) {

    LogBox.ignoreLogs(["Setting a timer"])

    const [messages, setMessages] = useState([])

    const onSignOut = () => {
        signOut(auth)
            .catch(error => console.log('SignOut error: ', error))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 10}} onPress={onSignOut}>
                    <Text style={{color: 'red'}}>Logout</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    useLayoutEffect(() => {
        const collectionRef = collection(database, "chats")
        const q = query(collectionRef, orderBy("createdAt", "desc"))

        return onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        })
    })

    const onSendMessage = useCallback((messages = []) => {
        setMessages(prevMessages =>
            GiftedChat.append(prevMessages, messages)
        )
        const {_id, createdAt, text, user} = messages[0]
        addDoc(collection(database, "chats"), {
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSendMessage(messages)}
            showUserAvatar={true}
            user={{
                _id: auth?.currentUser?.email,
                name: "LoL",
            }}
        />
    )
}