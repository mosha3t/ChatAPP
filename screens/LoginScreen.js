// import { View, Text, Image, TextInput, Button } from "react-native";
// import React, { useEffect, useState } from "react";
// import { StatusBar } from "expo-status-bar";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const LoginScreen = ({navigation}) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   useEffect(() => {
//     const unSubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         navigation.replace("Home");
//       }
//     });

//     return unSubscribe;
//   }, []);

//   const signIn = () => {
//     signInWithEmailAndPassword(auth, email, password).catch((error) =>
//       alert(error)
//     );
//   };

//   const register = () => {navigation.navigate("Register")};
//   return (
//     <View className="h-screen flex-1 items-center p-2">
//       <StatusBar style="light" />
//       <Image
//         source={{
//           uri: "https://cdn-icons-png.flaticon.com/512/234/234620.png?w=740&t=st=1680520768~exp=1680521368~hmac=670eac00e6c090ffab10c03bdba5a60851b56f669c4dd3113a19ffbfbb01b546",
//         }}
//         className="w-44 h-44"
//       />

//       <View>
//         <TextInput
//           className="border border-gray-950 rounded-xl w-52 h-22 p-3 m-3"
//           placeholder="Email"
//           autoFocus
//           type="email"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           className="border border-gray-950 rounded-xl w-52 h-22 p-3 m-3"
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           type="password"
//           onChangeText={(text) => setPassword(text)}
//         />
//       </View>
//       <View>
//         <Button    title="Login" onPress={signIn} />
//         <Button title="Register" onPress={register} />
//       </View>
//     </View>
//   );
// };
// //

// export default LoginScreen;

import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unSubscribe;
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };

  const register = () => {navigation.navigate("Register")};
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
       <StatusBar style="light" />
       <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/234/234620.png?w=740&t=st=1680520768~exp=1680521368~hmac=670eac00e6c090ffab10c03bdba5a60851b56f669c4dd3113a19ffbfbb01b546",
        }}
        className="w-20 h-20"
      />

      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-slate-900">Login</Text>

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter email address"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholderTextColor="#000"
          placeholder="Enter password"
          value={password}
          secureTextEntry                              
          type="password"
          onChangeText={(text) => setPassword(text)}
        />

        <View className="flex flex-row justify-between items-center my-8">
          <View className="flex-row items-center">
            <TouchableOpacity className="bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center">
              {/* selected state */}
              <View className="bg-green-400 w-4 h-4 rounded-sm" />
            </TouchableOpacity>
            <Text className="text-slate-900">Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-400 font-bold">Reset password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={signIn} className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6">
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={register} className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6 mt-5">
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
