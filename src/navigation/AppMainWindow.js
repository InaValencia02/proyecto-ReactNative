import React, {Component} from React;
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddPosts from "../components/AddPosts";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

class AppMainWindow extends Component{

    constructor(){
        super();
        this.state ={
        }
    }

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name='Profile' component={Profile} option={{tabBarIcon: () => <Ionicons name="person" size={24} color="black" />}} />
                <Tab.Screen name='Add new post' component={AddPosts} option={{tabBarIcon: () => <Ionicons name="md-add-circle-outline" size={24} color="black" /> }}/>
                <Tab.Screen name='Home' component={Home} option={{tabBarIcon: () => <Entypo name="home" size={24} color="black" />}} />
            </Tab.Navigator>
        )
    }
}

export default AppMainWindow