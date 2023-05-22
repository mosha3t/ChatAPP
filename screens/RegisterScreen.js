import { View, Text, TextInput,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase";

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const register = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Passwords don't match");
      }
    } catch (e) {
      setError('There was a problem creating your account');
    }
  };
  // const register = () => {
  //   auth.createUserWithEmailAndPassword(email, password)
  //   .then(authUser =>{
  //       authUser.user.update({
  //           displayName:name,
  //           photoURL: imageUrl || "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1680597364~exp=1680597964~hmac=6bc0cbccfdac9584edeaaaa8c3fd74a428484c43c0f0327b166950e9ccf9bf65"
  //       }
  //       )
  //   }).catch(error => alert(error.message))
  // };

  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-slate-900">Sign up</Text>
        <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter email address"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
              <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholderTextColor="#000"
          placeholder="Profile Picture Url"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />

        <View className="flex-row items-center my-8">
          <TouchableOpacity
          className="flex items-center justify-center bg-white border border-slate-200 h-6 w-6 rounded-sm mr-3"
          >
            <View className="bg-green-400 h-4 w-4 rounded-sm" />
          </TouchableOpacity>
          <Text className="text-slate-900">
            I've agreed to the terms and conditions and the privacy policy
          </Text>
        </View>

        <TouchableOpacity  onPress={register} disabled={!email || !password || !confirmPassword}

        className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6 "
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
