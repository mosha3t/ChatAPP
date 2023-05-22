import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const CustomList = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "asc") 
    );
    return onSnapshot(q, (snapshot) => {
      setChatMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages[chatMessages.length - 1]?.photoURL ||
           "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
        }}
      />
      <ListItem.Content>
        <ListItem.Title className="font-extrabold">{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages[chatMessages.length - 1]?.displayName} :{" "}
          {chatMessages[chatMessages.length - 1]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomList;
