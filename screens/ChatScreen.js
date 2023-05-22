import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Touchable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/base";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  getDoc,
  onSnapshot,
  query,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendText = () => {
    Keyboard.dismiss();
    addDoc(collection(db, "chats", route.params.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput(""); // Clears input field after clicking enter
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View className="flex-row items-center">
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL ||
               "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png",
            }}
          />
          <Text className="text-white ml-4 font-extrabold">
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between w-16 mr-2">
          <TouchableOpacity>
            <Feather name="video" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="phone-call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);
  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats", route.params.id, "messages"),
      orderBy("timestamp", "asc")
    );
    return onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [route]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {/** chat here */}
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View
                    key={id}
                    className="p-4 bg-purple-300 justify-start rounded-3xl mr-4 mb-5 max-w-3/4 relative"
                  >
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text>{data.message}</Text>
                  </View>
                ) : (
                  <View
                    key={id}
                    className="p-4 bg-[#ECECF3] justify-end  rounded-3xl mr-4 mb-5 max-w-3/4 relative"
                  >
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text>{data.message}</Text>
                    <Text>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View className=" flex-row items-center w-full p-4">
              <TextInput
                className="bottom-0 h-10 flex-1 mr-4 border-transparent bg-gray-100 rounded-md  p-2"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendText}
                placeholder="Message"
              />
              <TouchableOpacity onPress={sendText} activeOpacity={0.6}>
                <Ionicons name="send-sharp" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
