import React, {Component} from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { View } from 'react-native-web';
import {auth, db} from '../firebase/config';

class Profile extends Component{

    constructor () {
        super();
        this.state = {
            user: ''
        }
    }

    /* componentDidMount() {
        db.collection('users').where("owner", "==", auth.currentUser).onSnapshot(
            docs => {
                let user = [];

                docs.forEach( doc => {
                    user.push({
                        user: doc.data()
                    })

                this.setState({
                    user: user
                })
                })
            }
        )
    } */

    logout(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render () {

        return (

            <View>
                
                <Text>
                    Hola 
                </Text>

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>

            </View>

        );
    }


}

export default Profile