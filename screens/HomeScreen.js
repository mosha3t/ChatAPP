import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import CustomList from "../components/CustomList";
import { Avatar } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
const HomeScreen = ({ navigation }) => {
  const [chats,setChats]= useState([])
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  useEffect(() => {
    return onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [db]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "MoChat",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black", //color of icons in header
      headerTitleAlign: "center",
      headerLeft: () => (
        <View style={{ marginLeft: 5 }}>
          <TouchableOpacity onPress={signOut}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row justify-between space-x-2">
          <TouchableOpacity activeOpacity={0.6}><AntDesign name="camera" size={24} color="black" /></TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("AddChat")}><Entypo name="new-message" size={24} color="black" /></TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
      {chats.map(({ id, data: { chatName } }) => (
          <CustomList
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
