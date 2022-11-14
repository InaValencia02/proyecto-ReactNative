import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import AppMainWindow from "./src/navigation/AppMainWindow";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} 
          options={{
            headerStyle: {
              backgroundColor: 'rgb(230, 230, 230)',
            },
            headerTitleStyle: {
              fontSize: 15,
            },
            headerShown: false
          }}
        />
        <Stack.Screen name='Register' component={Register}
          options={{
            headerStyle: {
              backgroundColor: 'rgb(230, 230, 230)',
            },
            headerTitleStyle: {
              fontSize: 15,
            },
          }}
        />
        <Stack.Screen name='AppMainWindow' component={AppMainWindow} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
