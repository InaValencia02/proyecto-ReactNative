import React, {Component} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddPosts from "../screens/AddPosts";
import Search from '../screens/Search';
import { Ionicons, Entypo } from '@expo/vector-icons';

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
                <Tab.Screen name='Home' component={Home} options={{tabBarIcon: () => <Entypo name="home" size={24} color="black" />}} />
                <Tab.Screen name='Add new post' component={AddPosts} options={{tabBarIcon: () => <Ionicons name="md-add-circle-outline" size={24} color="black" /> }}/>
                <Tab.Screen name='Search' component={Search} options={{tabBarIcon: () => <Ionicons name="search-circle" size={24} color="black" />}} />
                <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon: () => <Ionicons name="person" size={24} color="black" />}} />
            </Tab.Navigator>
        )
    }
}

export default AppMainWindow