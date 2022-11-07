import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import AppMainWindow from "./src/navigation/AppMainWindow";
import Home from "./src/screens/Home";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='AppMainWindow' component={AppMainWindow} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
